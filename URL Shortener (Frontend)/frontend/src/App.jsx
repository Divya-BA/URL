import { BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom'
import './App.css'
import Shortener from './components/Shortener'
import Dashboard from './components/Dashboard'
import Urls from './components/Urls'


function App() {
  

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              
              <Link to="/shortener">Home</Link>
            </li>
            <li>
              
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              
              <Link to="/urls">URLs</Link>
            </li>
            
          </ul>
        </nav>
        <Routes>
          <Route path="/shortener" exact Component={Shortener}></Route>
          <Route path="/dashboard" exact Component={Dashboard}></Route>
          <Route path="/urls" exact Component={Urls}></Route>
          
        
        </Routes>
      </div>
    </Router>
  )
}

export default App
