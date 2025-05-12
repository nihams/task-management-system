import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
              <a className="navbar-brand" href="/">Task Management System</a>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App; 