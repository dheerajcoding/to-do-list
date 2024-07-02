import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() === '') return;
    setTasks([...tasks, { text: inputValue, completed: false }]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown={handleKeyDown}
          placeholder="Add a task..." 
        />
        <button className="add-button" onClick={addTask}>Add</button>
      </div>
      <h2>Pending Tasks</h2>
      <ul>
        {pendingTasks.map((task, index) => (
          <li key={index}>
            <span>{task.text}</span>
            <button className="complete-button" onClick={() => toggleCompletion(index)}>Mark as Completed</button>
            <button className="remove-button" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index} className="completed">
            <span>{task.text}</span>
            <button className="complete-button" onClick={() => toggleCompletion(index)}>Mark as Pending</button>
            <button className="remove-button" onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
