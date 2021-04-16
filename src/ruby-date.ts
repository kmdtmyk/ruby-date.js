
export default class RubyDate{

  private date: Date

  constructor(year: number, month: number = 1, day: number = 1){
    const date = new Date(year, month - 1, day, 0, 0, 0, 0)
    // Year is auto converted from 0 ~ 99 to 1900 ~ 1999
    const converted = 1800 < date.getFullYear() - year
    if(converted){
      date.setFullYear(year)
    }
    this.date = date
  }

  day(): number{
    return this.date.getDate()
  }

  month(): number{
    return this.date.getMonth() + 1
  }

  nextDay(n = 1): RubyDate{
    return new RubyDate(this.year(), this.month(), this.day() + n)
  }

  nextMonth(n = 1): RubyDate{
    const year = this.year()
    const month = this.month()
    const day = this.day()
    const d1 = new RubyDate(year, month + n, day)
    const d2 = new RubyDate(year, month + n + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  nextYear(n = 1): RubyDate{
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

  toString(){
    const year = `${this.year()}`.padStart(4, '0')
    const month = `${this.month()}`.padStart(2, '0')
    const day = `${this.day()}`.padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  year(): number{
    return this.date.getFullYear()
  }

}
