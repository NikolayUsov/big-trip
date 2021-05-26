import dayjs from 'dayjs';

export const SortType = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFERS: 'Offers',
};

export const UpdateType = {
  INIT: 'init',
  MAJOR: 'Major',
};
export const UserAction = {
  UPDATE_POIN: 'update',
};

export const Filter = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const futureFilter = (point) => {
  const isFuture = dayjs().diff(point.dateFrom) < 0;
  return isFuture;
};

const pastFilter = (point) => {
  const isPast = dayjs().diff(point.dateFrom) > 0;
  return isPast;
};
export const FilterFunction = {
  [Filter.EVERYTHING]: (points) =>{return points;},
  [Filter.FUTURE]: (points) =>{return points.filter(futureFilter);},
  [Filter.PAST]: (points) =>{return points.filter(pastFilter);},
};
