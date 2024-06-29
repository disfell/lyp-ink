export const formatTime = (stringTime) => {
  // 创建Date对象
  const date = new Date(stringTime);

  // 获取年、月、日、星期的值
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()返回的月份是从0开始的
  const day = date.getDate();
  const weekday = date.getDay();

  // 星期的中文表示
  const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

  // 格式化月和日，确保是两位数字
  const monthStr = month < 10 ? `0${month}` : month.toString();
  const dayStr = day < 10 ? `0${day}` : day.toString();

  // 组装日期字符串
  const formattedDate = `${year}年${monthStr}月${dayStr}日 ${weekdays[weekday]}`;

  return formattedDate;
}