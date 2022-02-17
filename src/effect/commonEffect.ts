function throttle(fn: Function, delay: number) {
  let timer = 0
  return function (this: unknown, ...args: any) {
    const now = Date.now()
    if (now - timer > delay) {
      timer = now
      fn.apply(this, args)
    }
  }
}

export default throttle
