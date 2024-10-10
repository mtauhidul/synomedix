// This function is working for formatting the dates
export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  if (minutes < 10) {
    return `${year}/${month}/${day} ${hours}:0${minutes}`;
  }

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
