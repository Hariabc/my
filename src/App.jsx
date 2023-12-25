import './App.css'
import {Navbar} from "./components/Navbar"
import EventCalendar from './Calender/Calender';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <EventCalendar/>
    </div>
  )
}

export default App;
