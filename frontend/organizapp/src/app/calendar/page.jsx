"use client"

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
 
function Calendario() {
  const [date, setDate] = useState(new Date());
 
  return (
    <div className="app">
      <h1 className="text-center">React Calendar with Range</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
        <p className='text-center'>
          <span className='bold'>Selected date:</span>{' '}
          {date.toDateString()}
        </p>
    </div>
  );
}

export default Calendario;