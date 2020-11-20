import React, { useEffect, useState, useMemo } from 'react';
import debounce from 'debounce';

import { getTimezoneNames } from '../services/timezone';

import styles from './SearchBar.module.scss';

export default function SearchBar({ addTimezone }) {
  const [timezoneName, setTimezoneName] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    getTimezoneNames().then((response) => {
      setAutocompleteResults(response.data);
      setShowOptions(true);
    });
  }, []);

  const searchTimezones = useMemo(
    () =>
      debounce((value) => {
        getTimezoneNames(value).then((response) => {
          setAutocompleteResults(response.data);
          setShowOptions(true);
        });
      }, 1000),
    []
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type='text'
        className={styles.input}
        value={timezoneName}
        onChange={(e) => {
          setTimezoneName(e.target.value);
          searchTimezones(e.target.value);
        }}
      />
      {showOptions && (
        <div className={styles.optionContainer}>
          {autocompleteResults.map((result) => (
            <button
              className={styles.option}
              key={result}
              onClick={() => {
                setShowOptions(false);
                addTimezone(result);
              }}
            >
              {result}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
