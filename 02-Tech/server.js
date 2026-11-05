const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Task Data Model (In-Memory Database)
let tasks = [
  { id: 1, title: 'Complete Web Dev Project', priority: 'High', category: 'Web Dev', isCompleted: false },
  { id: 2, title: 'Revise CS Notes', priority: 'Medium', category: 'Exams', isCompleted: true }
];

// REST API Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    priority: req.body.priority || 'Medium',
    category: req.body.category || 'General',
    isCompleted: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
