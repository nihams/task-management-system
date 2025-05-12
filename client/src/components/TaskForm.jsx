import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, updateTask } from '../redux/tasksSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Submitting form data:', formData);
      
      // Validate required fields
      if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate) {
        throw new Error('Please fill in all required fields');
      }

      if (id) {
        const result = await dispatch(updateTask({ id, task: formData })).unwrap();
        console.log('Update result:', result);
      } else {
        const result = await dispatch(addTask(formData)).unwrap();
        console.log('Create result:', result);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
      setError(error.message || 'Failed to save task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit Task' : 'Add New Task'}</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title *</label>
          <input
            type="text"
            className={`form-control ${error && !formData.title.trim() ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            className={`form-control ${error && !formData.description.trim() ? 'is-invalid' : ''}`}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="dueDate" className="form-label">Due Date *</label>
            <input
              type="date"
              className={`form-control ${error && !formData.dueDate ? 'is-invalid' : ''}`}
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {id ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              id ? 'Update Task' : 'Create Task'
            )}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;