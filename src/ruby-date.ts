
export default class RubyDate{

  private date: Date

  constructor(year: number, month: number, day: number){
    const date = new Date(year, month - 1, day, 0, 0, 0, 0)
    // Year is auto converted from 0 ~ 99 to 1900 ~ 1999
    if(date.getFullYear() != year){
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
