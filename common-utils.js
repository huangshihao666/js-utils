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
/* 
*  数组洗牌  随机打乱
*  @arr 需要打乱的数组
*  描述：原地洗牌算法，可以达到真正的乱序，原理是拿当前元素跟之后的所有元素中随机的一个交换位置；
*/
export function shuffle(arr) {
  for(let i=0; i < arr.length; i++) {
    let randomIndex = i + Math.floor(Math.random() * (arr.length - i));
    [ arr[i], arr[randomIndex] ] = [ arr[randomIndex], arr[i] ];
  }
  return arr;
}
/* 
*  处理 async/await 异常情况
*  @asyncFunc 异步函数
*  描述：示例：let [err, res] = errorCaptured( asyncFunc );
*/
export function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc();
    return [null, res];
  } catch (e) {
    return [e, null];
  }
}
/* 
*  数组或对象的深拷贝
*  @obj 目标对象
*  描述：
*/
export function deepCopy(obj) {
  let retObj = (obj.constructor === Array) ? [] : {};
  for(let i in obj) {
    if(typeof obj[i] === 'object') {
      retObj[i] = deepCopy(obj[i]);
    } else {
      retObj[i] = obj[i];
    }
  }
  return retObj;
}