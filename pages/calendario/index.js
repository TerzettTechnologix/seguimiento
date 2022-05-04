import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Navbar } from '../../components/Navbar/Navbar'

export default function Calendario () { 
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e) => {
    setDateState(e)
  }
  return (
    <section>
      <Navbar/>
      <Calendar value = {dateState} onChange={changeDate}/>
    </section>
  )
}