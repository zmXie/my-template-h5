/**
 * 页面loading 统一组件
 * 会自动处理堆叠关系
 */
import { Toast } from 'vant';

let loadingInstance = null;
const loadingConfig = {
  message: '请求中...',
  type: 'loading',
  duration: 0,
  forbidClick: true,
  position: 'middle'
}
let loadingList = [];
/*关闭加载*/
const closeLoading = (timeStr) => {
  for (let i = 0; i < loadingList.length; i++) {
    if (timeStr === loadingList[i]) {
      loadingList.splice(i, 1);
    }
  }
  if (loadingList.length === 0) {
    if (loadingInstance) {
      loadingInstance.clear();
      loadingInstance = null;
    }
  }
}
/*打开加载*/
const openLoading = () => {
  let timeStr = new Date().getTime();
  loadingList.push(timeStr);
  if (!loadingInstance) {
    loadingInstance = Toast(loadingConfig);
  }
  return timeStr;
}

export {openLoading, closeLoading}
