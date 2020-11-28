export namespace CSSNumber {
  export function parse(value: any, defaultValue: number = 0): number {
    const localValue = parseFloat(value)
    if (Number.isNaN(localValue)) return defaultValue
    return value
  }
  export function relation(value: any, relativeSize: number, defaultValue: number = 0): number {
    if (typeof value === 'number') {
      return value
    }
    if (typeof value === 'string') {
      const localValue = (<string>value).trim().toLowerCase()
      if (localValue.indexOf('%') > 0)
        return (parse(localValue.replace('%', ''), defaultValue) / 100) * relativeSize
      if (localValue.indexOf('px') > 0 || localValue.indexOf('pt') > 0)
        return parse(localValue.replace('px', ''), defaultValue)
      if (localValue.indexOf('vw') > 0)
        return (parse(localValue.replace('vw', ''), defaultValue) / 100) * window.innerWidth
      if (localValue.indexOf('vh') > 0)
        return (parse(localValue.replace('vh', ''), defaultValue) / 100) * window.innerHeight
      if (localValue.indexOf('vm') > 0)
        return (
          (parse(localValue.replace('vm', ''), defaultValue) / 100) *
          Math.min(window.innerWidth, window.innerHeight)
        )
      if (localValue.indexOf('em') > 0) return parse(localValue.replace('em', ''), defaultValue)
      if (localValue === 'top' || localValue === 'left') return 0
      if (localValue === 'center' || localValue === 'middle') return relativeSize * 0.5
      if (localValue === 'bottom' || localValue === 'right') return relativeSize
      return defaultValue
    }
    return defaultValue
  }
}
