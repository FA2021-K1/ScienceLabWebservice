export const sortByBouy = (jsonData) => {
  let dataByBouy = {};
  if (jsonData) {
    jsonData.forEach((element) => {
      dataByBouy[element.boyId]
        ? dataByBouy[element.boyId].push({
            date: element.date,
            value: element.value,
            location: element.location,
          })
        : (dataByBouy[element.boyId] = [
            {
              date: element.date,
              value: element.value,
              location: element.location,
            },
          ]);
    });
    for (const key in dataByBouy) {
      dataByBouy[key] = sortByDate(dataByBouy[key]);
    }
  } else {
    dataByBouy = null;
  }

  return dataByBouy;
};

export const sortByDate = (jsonData) => {
  const sortedData = jsonData.sort(
    (a, b) => (new Date(a.date)).getTime() < (new Date(b.date)).getTime()
  );
  return sortedData;
};
