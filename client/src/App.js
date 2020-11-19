import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from './components/SearchBar';
import Timezone from './components/Timezone';

function App() {
  const [selectedTimezones, setSelectedTimezones] = useState([]);
  return (
    <div className={styles.appContainer}>
      <SearchBar
        addTimezone={(timezone) =>
          setSelectedTimezones([...selectedTimezones, timezone])
        }
      />
      <div className={styles.timezonesList}>
        {selectedTimezones.map((timezone) => (
          <Timezone key={timezone} timezoneName={timezone} />
        ))}
      </div>
    </div>
  );
}

export default App;
