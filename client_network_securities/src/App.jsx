import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import MainRoute from './routes/routes'

function App() {

  return (
      <Router>
        <MainRoute/>
      </Router>
  )
}

export default App
