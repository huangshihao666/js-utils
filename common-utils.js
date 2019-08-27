/* 
*  防抖函数
*  @func  需要防抖的函数
*  @time  延时多少时间执行
*  @option
*   @leading 第一次是否立即执行
*   @context 上下文执行对象
*  描述：通过闭包暴露出cancel方法，可以在外部关闭定时器
*/
export const debounce = (func, time = 300, options = {
  leading: true,
  context: null
}) => {
  let timer;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, time);
      func.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, time)
    }
  }
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }
  return _debounce;
}