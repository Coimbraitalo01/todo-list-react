import { useState, useEffect } from 'react'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    // Carrega do localStorage de forma segura
    try {
      const saved = localStorage.getItem('tasks')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [newTask, setNewTask] = useState('')

  // Persistência automática
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }])
      setNewTask('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="container">
      <h1>Minha To-Do List</h1>
      
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa..."
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="task-list">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            {task.text}
          </div>
        ))}
      </div>
    </div>
  )
}