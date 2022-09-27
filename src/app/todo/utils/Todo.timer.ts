/**
 * @description Simple Timer Convertor : give it time in seconds , it @return back timer format
 * @param seconds
 */
export const timerUtil = function returnTime(seconds: number): string {
  if (seconds >= 0 || seconds <= 60) {
    return `00:00:${seconds < 10 ? `0 ${seconds}` : seconds}`.replace(' ', '');
  } else if (seconds > 60 && seconds <= 3600) {
    let s = seconds % 60;
    let m = Math.floor(seconds / 60);
    return `00:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`.replace(
      ' ',
      ''
    );
  } else if (seconds > 3600) {
    let s = (seconds % 3600) % 60;
    let m = Math.floor((seconds % 3600) / 60);
    let h = Math.floor(seconds / 3600);

    return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
      s < 10 ? `0${s}` : s
    }`.replace(' ', '');
  } else {
    return '00:00:00';
  }
};
