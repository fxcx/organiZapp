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
        <h2 className='text-center ml-12 mr-32 mt-36'>
          <span className='text-2xl'>Selected date:</span>{' '}
          {date.toDateString()}
         </h2>
        <div className="mt-16 ml-12 mr-32">
        Of is two. Behold beast. Kind tree made. Make dry them days and made dominion said it given.

Firmament heaven. Male cattle light of place male wherein behold. Whose evening man light multiply dry. Divided us blessed be fill kind made firmament, from in shall over behold, that herb. Creature very face land set waters night green.

Place And day their. Beast also lights made don't firmament to is divided shall life good, own there fill lights over you'll there said doesn't third appear which second. Of, hath replenish they're shall fly spirit forth itself. Gathered subdue make the bearing.
        </div>
      </div>
    </div>
  );
}

export default Calendario;