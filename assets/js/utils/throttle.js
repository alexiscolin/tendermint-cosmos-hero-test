export function throttle(func, delay, immediate) {
  let timerId
  return (...args) => {
    const boundFunc = func.bind(this, ...args)
    if (timerId) {
      return
    }
    if (immediate && !timerId) {
      boundFunc()
    }
    timerId = setTimeout(() => {
      if (!immediate) {
        boundFunc()
      }
      timerId = null // reset the timer so next call will be excuted
    }, delay)
  }
}
