// 工具函数 --- 进行时间提醒
const getTimeService = () => {
  let message = ''
  // 获取当前小时数
  const hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 12) {
    message = '上午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
export default getTimeService
