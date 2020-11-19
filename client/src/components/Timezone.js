import React, { useEffect, useState } from 'react';
import { getTimezone } from '../services/timezone';
import moment from 'moment';

export default function Timezone({ timezoneName }) {
  const [timezone, setTimezone] = useState({});

  useEffect(() => {
    getTimezone(timezoneName).then((response) => {
      setTimezone(response.data);
    });
  }, []);
  return (
    <div>
      <p>{timezone.timezone}</p>
      <p>{moment(timezone.datetime).format('MM/DD/YYYY')}</p>
      <p>{moment(timezone.datetime).format('HH:mm')}</p>
    </div>
  );
}
