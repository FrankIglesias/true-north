import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Timezone from './components/Timezone';

function App() {
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  return (
    <div className='App'>
      <SearchBar
        addTimezone={(timezone) =>
          setSelectedTimezones([...selectedTimezones, timezone])
        }
      />
      {selectedTimezones.map((timezone) => (
        <Timezone key={timezone} timezoneName={timezone} />
      ))}
    </div>
  );
}

export default App;
