import moment from 'moment';

// date format

export const dateFormat = (date) => {
  return moment(date).format('ll');
};
