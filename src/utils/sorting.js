export const sortByDay = (a, b) => {
  return new Date(a.dateFrom) - new Date(b.dateFrom);
};
