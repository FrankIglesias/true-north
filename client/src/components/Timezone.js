import React, { useEffect, useState } from 'react';
import { getTimezone } from '../services/timezone';
import { useInterval } from '../hooks/useInterval';
import moment from 'moment';
import styles from './Timezone.module.scss';

export default function Timezone({ timezoneName, removeCurrent }) {
  const [timezone, setTimezone] = useState(null);

  useInterval(() => {
    getTimezone(timezoneName).then((response) => {
      setTimezone(response.data);
    });
  }, 5000);

  useEffect(() => {
    getTimezone(timezoneName).then((response) => {
      setTimezone(response.data);
    });
  }, []);

  if (!timezone) {
    return null;
  }

  return (
    <div className={styles.timezoneContainer}>
      <button className={styles.removeCurrent} onClick={removeCurrent}>
        x
      </button>
      <p className={styles.timezoneValues}>{timezoneName}</p>
      <p className={styles.timezoneValues}>
        {moment(timezone.datetime)
          .utcOffset(timezone.utc_offset)
          .format('MM/DD/YYYY')}
      </p>
      <p className={styles.timezoneValues}>
        {moment(timezone.datetime)
          .utcOffset(timezone.utc_offset)
          .format('HH:mm:ss')}
      </p>
    </div>
  );
}
