export const parseInput = (input) => {
  const lines = input.trim().split('\n');
  const data = [];

  lines.forEach(line => {
    const match = line.match(/\[(.*?), (.*?)\] .*?: (.*?)\/(.*?)$/);
    if (match) {
      const [, time, date, systolic, diastolic] = match;
      const [hour, minute] = time.split(':').map(Number);
      const [day, month, year] = date.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day, hour, minute);

      data.push({
        date: parsedDate,
        systolic: parseInt(systolic, 10),
        diastolic: parseInt(diastolic, 10)
      });
    }
  });

  return data;
};
