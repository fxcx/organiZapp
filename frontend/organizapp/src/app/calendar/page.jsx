"use client"

import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
 
function Calendario() {
  const [date, setDate] = useState(new Date());
 
  return (
    <div className="grid grid-rows-1 grid-cols-2 h-screen bg-gray-700 text-white">
      <div className='mx-auto mt-16 h-auto'>
        <div className="app">
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center mr-32 mt-36'>
          <span className='text-2xl'>Selected date:</span>{' '}
          {date.toDateString()}
         </h2>
        <div className="mt-16 mr-32">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ex dignissimos nobis? Maiores dignissimos eius esse accusantium soluta eaque assumenda asperiores quisquam corporis velit, quas, iusto odit, aperiam hic repellendus!
        </div>
      </div>
    </div>
  );
}

export default Calendario;