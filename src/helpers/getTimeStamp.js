const getTimeStamp = () => {
  const dateNow = new Date();

  const dateString = `${dateNow
    .toISOString()
    .slice(0, 10)
    .split("-")
    .join("")}`;

  return dateString;
};

export default getTimeStamp;
