
export default class RubyDate{

  private date: Date

  constructor(year: number, month: number, day: number){
    this.date = new Date(year, month - 1, day)
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

  year(): number{
    return this.date.getFullYear()
  }

}
