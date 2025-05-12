import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../redux/tasksSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'in-progress':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger';
      case 'medium':
        return 'bg-warning';
      default:
        return 'bg-info';
    }
  };

  if (status === 'loading') {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tasks</h2>
        <Link to="/add-task" className="btn btn-primary">
          Add New Task
        </Link>
      </div>
      
      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Create a new task to get started!</div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <div className="mb-2">
                    <span className={`badge ${getStatusBadgeClass(task.status)} me-2`}>
                      {task.status}
                    </span>
                    <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
                      {task.priority} priority
                    </span>
                  </div>
                  <p className="card-text">
                    <small className="text-muted">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                  </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                  <div className="btn-group w-100">
                    <Link to={`/edit-task/${task._id}`} className="btn btn-outline-primary">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList; 