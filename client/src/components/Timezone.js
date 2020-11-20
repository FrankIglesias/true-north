import React, { useEffect, useState } from 'react';
import { getTimezone } from '../services/timezone';
import moment from 'moment';
import styles from './Timezone.module.scss';

export default function Timezone({ timezoneName, removeCurrent }) {
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
      <button className={styles.removeCurrent} onClick={removeCurrent}>x</button>
      <p className={styles.timezoneValues}>{timezoneName}</p>
      <p className={styles.timezoneValues}>{moment(timezone.datetime).format('MM/DD/YYYY')}</p>
      <p className={styles.timezoneValues}>{moment(timezone.datetime).format('HH:mm:ss')}</p>
    </div>
  );
}
