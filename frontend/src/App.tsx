
import { Route, Routes } from 'react-router-dom'
import EventList from './pages/eventList/EventList'
import RegisterPage from './pages/register/RegisterPage'
import ParticipantPage from './pages/participants/ParticipantPage'

function App() {

  return (
     <Routes>
      <Route path='/' element={<EventList />} />
      <Route path='/register/:eventId' element={<RegisterPage />} />
      <Route path='/participants/:eventId' element={<ParticipantPage />} />
    </Routes>
  )
}

export default App
