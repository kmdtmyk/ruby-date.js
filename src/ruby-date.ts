
export default class RubyDate{

  private date: Date

  constructor(year: number, month: number, day: number){
    this.date = new Date(year, month - 1, day)
  }

  toDate(): Date{
    return new Date(this.date)
  }

}
