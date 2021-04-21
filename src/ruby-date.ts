
export default class RubyDate{

  private date: Date

  constructor(year: number = -4712, month: number = 1, day: number = 1){
    const date = new Date(2000, 0, 1, 0, 0, 0, 0)
    date.setFullYear(year)
    date.setMonth(month - 1)
    date.setDate(day)
    this.date = date
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
    return this.date.getDate()
  }

  endOfMonth(): RubyDate{
    return new RubyDate(this.year(), this.month() + 1, 0)
  }

  endOfYear(): RubyDate{
    return new RubyDate(this.year(), 12, 31)
  }

  month(): number{
    return this.date.getMonth() + 1
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

  toDate(): Date{
    return new Date(this.date)
  }

  toString(): string{
    const year = `${this.year()}`.padStart(4, '0')
    const month = `${this.month()}`.padStart(2, '0')
    const day = `${this.day()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  year(): number{
    return this.date.getFullYear()
  }

}
