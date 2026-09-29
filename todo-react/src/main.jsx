import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const DATA = [
  { id: "todo-0", name: "Eat", completed: true, fontossag: 0},
  { id: "todo-1", name: "Sleep", completed: false, fontossag: 0},
  { id: "todo-2", name: "Repeat", completed: false, fontossag : 0}
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA} />
  </StrictMode>,
)
