import React, { useEffect, useState } from 'react';
import { getTimezone } from '../services/timezone';
import moment from 'moment';
import styles from './Timezone.module.css';

export default function Timezone({ timezoneName }) {
  const [timezone, setTimezone] = useState({});

  const updateTime = () =>
    setTimeout(() => {
      getTimezone(timezoneName).then((response) => {
        setTimezone(response.data);
        updateTime();
      });
    }, 5000);

  useEffect(() => {
    updateTime();
    getTimezone(timezoneName).then((response) => {
      setTimezone(response.data);
    });
  }, []);

  return (
    <div className={styles.timezoneContainer}>
      <p>{timezone.timezone}</p>
      <p>{moment(timezone.datetime).format('MM/DD/YYYY')}</p>
      <p>{moment(timezone.datetime).format('HH:mm:ss')}</p>
    </div>
  );
}
