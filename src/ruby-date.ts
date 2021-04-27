
const zeroPadding = (n: number, digit: number): string => {
  if(0 <= n){
    return n.toString().padStart(digit, '0')
  }else{
    return '-' + Math.abs(n).toString().padStart(digit, '0')
  }
}

export default class RubyDate{

  private _d: Date

  constructor(year: number = -4712, month: number = 1, day: number = 1){
    const date = new Date(2000, 0, 1, 0, 0, 0, 0)
    date.setFullYear(year)
    date.setMonth(month - 1)
    date.setDate(day)
    if(isNaN(date.getTime())){
      throw new TypeError('Invalid Date')
    }
    this._d = date
  }

  static parse(str: string): RubyDate | null{
    if(typeof str !== 'string'){
      return null
    }
    // avoid UTC minus N hours timezone problem
    if(str.match(/^\d{4}-\d{2}-\d{2}$/)){
      str = str.replace(/-/g, '/')
    }
    const time = Date.parse(str)
    if(isNaN(time)){
      return null
    }
    const date = new Date(time)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return new RubyDate(year, month, day)
  }

  static today(): RubyDate{
    const now = new Date(Date.now())
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    return new RubyDate(year, month, day)
  }

  beginningOfMonth(): RubyDate{
    return new RubyDate(this.year(), this.month(), 1)
  }

  beginningOfYear(): RubyDate{
    return new RubyDate(this.year(), 1, 1)
  }

  day(): number{
    return this._d.getDate()
  }

  endOfMonth(): RubyDate{
    return new RubyDate(this.year(), this.month() + 1, 0)
  }

  endOfYear(): RubyDate{
    return new RubyDate(this.year(), 12, 31)
  }

  month(): number{
    return this._d.getMonth() + 1
  }

  nextDay(n: number = 1): RubyDate{
    return new RubyDate(this.year(), this.month(), this.day() + n)
  }

  nextMonth(n: number = 1): RubyDate{
    const year = this.year()
    const month = this.month()
    const day = this.day()
    const d1 = new RubyDate(year, month + n, day)
    const d2 = new RubyDate(year, month + n + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  nextYear(n: number = 1): RubyDate{
    const year = this.year()
    const month = this.month()
    const day = this.day()
    const d1 = new RubyDate(year + n, month, day)
    const d2 = new RubyDate(year + n, month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  strftime(format: string): string{
    return format.replace(/%-?[dmYy%]/g, (substring: string): string => {
      if(substring.endsWith('-Y')){
        return this.year().toString()
      }
      if(substring.endsWith('Y')){
        return zeroPadding(this.year(), 4)
      }
      if(substring.endsWith('-y')){
        return (this.year() % 100).toString()
      }
      if(substring.endsWith('y')){
        return zeroPadding(this.year() % 100, 2)
      }
      if(substring.endsWith('-m')){
        return this.month().toString()
      }
      if(substring.endsWith('m')){
        return zeroPadding(this.month(), 2)
      }
      if(substring.endsWith('-d')){
        return this.day().toString()
      }
      if(substring.endsWith('d')){
        return zeroPadding(this.day(), 2)
      }
      if(substring.endsWith('%')){
        return '%'
      }
      return substring
    })
  }

  toDate(): Date{
    return new Date(this._d)
  }

  toString(): string{
    return `${zeroPadding(this.year(), 4)}-${zeroPadding(this.month(), 2)}-${zeroPadding(this.day(), 2)}`
  }

  year(): number{
    return this._d.getFullYear()
  }

}
