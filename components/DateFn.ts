import moment from 'moment';
/**
 * 获取星期几
 * @param dateTime
 */
export function getDay(dateTime) {
  let weekNum = moment(dateTime).days();
  const weekMatch = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  };
  return `星期${weekMatch[weekNum]}`;
}
/**
 * 计算时间间隔
 * @param dateStart
 * @param dateEnd
 */
export function getTimeDiff(dateStart, dateEnd) {
  let startDate = new Date(dateStart).getTime();
  let endDate = new Date(dateEnd).getTime();
  let date = Math.ceil((startDate - endDate) / 1000);
  let day = Math.floor(date / (60 * 60 * 24));
  let hours = Math.floor((date % (60 * 60 * 24)) / (60 * 60));
  let minutes = Math.floor((date % (60 * 60)) / 60);
  let seconds = date % 60;
  return { day: day, hours: hours, minutes: minutes, seconds: seconds };
}
