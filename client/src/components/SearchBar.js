import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'debounce';
import { getTimezoneNames } from '../services/timezone';

export default function SearchBar({ addTimezone }) {
  const [timezoneName, setTimezoneName] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  useEffect(() => {
    getTimezoneNames().then((response) => {
      setAutocompleteResults(response.data);
    });
  }, []);

  const searchTimezones = useMemo(
    () =>
      debounce((value) => {
        getTimezoneNames(value).then((response) => {
          setAutocompleteResults(response.data);
        });
      }, 1000),
    []
  );

  return (
    <div>
      <input
        type='text'
        value={timezoneName}
        onChange={(e) => {
          setTimezoneName(e.target.value);
          searchTimezones(e.target.value);
        }}
      />
      {autocompleteResults.map((result) => (
        <button key={result} onClick={() => addTimezone(result)}>
          {result}
        </button>
      ))}
    </div>
  );
}
