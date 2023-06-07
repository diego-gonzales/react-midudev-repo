const DATE_UNITS: Record<string, number> = {
  year: 31536000, // seconds in a year
  month: 2592000, // seconds in a month
  week: 604800, // seconds in a week
  day: 86400, // seconds in a day
  hour: 3600, // seconds in an hour
  minute: 60, // seconds in a minute
  second: 1, // seconds in a second
};

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export const getRelativeTime = (epochTime: number) => {
  // epochTime means the time in seconds, and it is multiplied by 1000 to get the time in milliseconds
  const startTime = new Date(epochTime * 1000).getTime();
  const nowTime = new Date().getTime();

  // elapsedTime is the difference between the two times, it is divided by 1000 to get the time in seconds
  const elapsedTime = (startTime - nowTime) / 1000;

  for (const unitKey in DATE_UNITS) {
    if (Math.abs(elapsedTime) > DATE_UNITS[unitKey] || unitKey === 'second') {
      return rtf.format(
        Math.round(elapsedTime / DATE_UNITS[unitKey]),
        unitKey as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return '';
};

// Esta es una factory function, es decir, una función que retorna otra función (patrón de diseño)
/*const createTimeAgo = (language: string) => (epochTime: number) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const startTime = new Date(epochTime * 1000).getTime();
  const nowTime = new Date().getTime();

  // elapsedTime is the difference between the two times, it is divided by 1000 to get the time in seconds
  const elapsedTime = (startTime - nowTime) / 1000;

  for (const unitKey in DATE_UNITS) {
    if (Math.abs(elapsedTime) > DATE_UNITS[unitKey] || unitKey === 'second') {
      return rtf.format(
        Math.round(elapsedTime / DATE_UNITS[unitKey]),
        unitKey as Intl.RelativeTimeFormatUnit
      );
    }
  }

  return '';
}*/

// const timeAgo = createTimeAgo('en');
// timeAgo(123456789);
