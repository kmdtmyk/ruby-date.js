import RubyDate from './ruby-date'

declare global{
  namespace jest{
    interface Matchers<R>{
      toBeDate(year: number, month: number, day:number): R
    }
  }
}

expect.extend({
  toBeDate(received, year, month, day){
    let date = received
    if(date instanceof RubyDate){
      date = date.toDate()
    }
    const pass = (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    )
    return {
      pass,
      message(){
        const expected = `${
          `${year}`.padStart(4, '0')
        }-${
          `${month}`.padStart(2, '0')
        }-${
          `${day}`.padStart(2, '0')
        }`
        if(pass){
          return `${received} and ${expected} are same date`
        }else{
          return `${received} and ${expected} are not same date`
        }
      }
    }
  }
})

describe('constructor', () => {

  test('no argument', () => {
    expect(new RubyDate()).toBeDate(-4712, 1, 1)
  })

  test('year', () => {
    expect(new RubyDate(1)).toBeDate(1, 1, 1)
    expect(new RubyDate(99)).toBeDate(99, 1, 1)
    expect(new RubyDate(100)).toBeDate(100, 1, 1)
    expect(new RubyDate(1900)).toBeDate(1900, 1, 1)
    expect(new RubyDate(2000)).toBeDate(2000, 1, 1)
    expect(new RubyDate(2100)).toBeDate(2100, 1, 1)
  })

  test('year and month', () => {
    expect(new RubyDate(2018, 0)).toBeDate(2017, 12, 1)
    expect(new RubyDate(2018, 1)).toBeDate(2018, 1, 1)
    expect(new RubyDate(2018, 5)).toBeDate(2018, 5, 1)
    expect(new RubyDate(2018, 12)).toBeDate(2018, 12, 1)
    expect(new RubyDate(2018, 13)).toBeDate(2019, 1, 1)

    expect(new RubyDate(1, 5)).toBeDate(1, 5, 1)
    expect(new RubyDate(50, 0)).toBeDate(49, 12, 1)
    expect(new RubyDate(50, 13)).toBeDate(51, 1, 1)
    expect(new RubyDate(99, 5)).toBeDate(99, 5, 1)
    expect(new RubyDate(100, 5)).toBeDate(100, 5, 1)
  })

  test('year, month and day', () => {
    expect(new RubyDate(2018, 5, 0)).toBeDate(2018, 4, 30)
    expect(new RubyDate(2018, 5, 1)).toBeDate(2018, 5, 1)
    expect(new RubyDate(2018, 5, 31)).toBeDate(2018, 5, 31)
    expect(new RubyDate(2018, 5, 32)).toBeDate(2018, 6, 1)

    expect(new RubyDate(2018, 0, 15)).toBeDate(2017, 12, 15)
    expect(new RubyDate(2018, 1, 15)).toBeDate(2018, 1, 15)
    expect(new RubyDate(2018, 5, 15)).toBeDate(2018, 5, 15)
    expect(new RubyDate(2018, 12, 15)).toBeDate(2018, 12, 15)
    expect(new RubyDate(2018, 13, 15)).toBeDate(2019, 1, 15)

    expect(new RubyDate(1, 5, 15)).toBeDate(1, 5, 15)
    expect(new RubyDate(99, 5, 15)).toBeDate(99, 5, 15)
    expect(new RubyDate(100, 5, 15)).toBeDate(100, 5, 15)
  })

  test('invalid date', () => {
    // @ts-expect-error
    expect(() => new RubyDate('foo')).toThrow()
  })

})

describe('operator', () => {

  // test.skip('==', () => {
  //   expect(new RubyDate(2021, 3, 15) == new RubyDate(2021, 3, 14)).toBe(false)
  //   expect(new RubyDate(2021, 3, 15) == new RubyDate(2021, 3, 15)).toBe(true)
  //   expect(new RubyDate(2021, 3, 15) == new RubyDate(2021, 3, 16)).toBe(false)
  // })

  // test.skip('!=', () => {
  //   expect(new RubyDate(2021, 3, 15) != new RubyDate(2021, 3, 14)).toBe(true)
  //   expect(new RubyDate(2021, 3, 15) != new RubyDate(2021, 3, 15)).toBe(false)
  //   expect(new RubyDate(2021, 3, 15) != new RubyDate(2021, 3, 16)).toBe(true)
  // })

  test('<', () => {
    expect(new RubyDate(2021, 3, 15) < new RubyDate(2021, 3, 14)).toEqual(false)
    expect(new RubyDate(2021, 3, 15) < new RubyDate(2021, 3, 15)).toEqual(false)
    expect(new RubyDate(2021, 3, 15) < new RubyDate(2021, 3, 16)).toEqual(true)
  })

  test('<=', () => {
    expect(new RubyDate(2021, 3, 15) <= new RubyDate(2021, 3, 14)).toEqual(false)
    expect(new RubyDate(2021, 3, 15) <= new RubyDate(2021, 3, 15)).toEqual(true)
    expect(new RubyDate(2021, 3, 15) <= new RubyDate(2021, 3, 16)).toEqual(true)
  })

  test('>', () => {
    expect(new RubyDate(2021, 3, 15) > new RubyDate(2021, 3, 14)).toEqual(true)
    expect(new RubyDate(2021, 3, 15) > new RubyDate(2021, 3, 15)).toEqual(false)
    expect(new RubyDate(2021, 3, 15) > new RubyDate(2021, 3, 16)).toEqual(false)
  })

  test('>=', () => {
    expect(new RubyDate(2021, 3, 15) >= new RubyDate(2021, 3, 14)).toEqual(true)
    expect(new RubyDate(2021, 3, 15) >= new RubyDate(2021, 3, 15)).toEqual(true)
    expect(new RubyDate(2021, 3, 15) >= new RubyDate(2021, 3, 16)).toEqual(false)
  })

})

describe('parse', () => {

  test('year month day', () => {
    expect(RubyDate.parse('2021-01-05')).toBeDate(2021, 1, 5)
    expect(RubyDate.parse('2021/01/05')).toBeDate(2021, 1, 5)
    expect(RubyDate.parse('2021.01.05')).toBeDate(2021, 1, 5)

    expect(RubyDate.parse('2021-1-5')).toBeDate(2021, 1, 5)
    expect(RubyDate.parse('2021/1/5')).toBeDate(2021, 1, 5)
    expect(RubyDate.parse('2021.1.5')).toBeDate(2021, 1, 5)
  })

  test('invalid date', () => {
    expect(() => RubyDate.parse('foo')).toThrow()
    // @ts-expect-error
    expect(() => RubyDate.parse(123)).toThrow()
    // @ts-expect-error
    expect(() => RubyDate.parse({})).toThrow()
    // @ts-expect-error
    expect(() => RubyDate.parse([])).toThrow()
    expect(() => RubyDate.parse(null)).toThrow()
    expect(() => RubyDate.parse(undefined)).toThrow()
  })

})

test('today', () => {
  const now = new Date()
  expect(RubyDate.today()).toBeDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
})

test('beginningOfMonth', () => {
  expect(new RubyDate(2017, 5, 1).beginningOfMonth()).toBeDate(2017, 5, 1)
  expect(new RubyDate(2017, 5, 15).beginningOfMonth()).toBeDate(2017, 5, 1)
  expect(new RubyDate(2017, 5, 31).beginningOfMonth()).toBeDate(2017, 5, 1)
})

test('beginningOfYear', () => {
  expect(new RubyDate(2017, 1, 1).beginningOfYear()).toBeDate(2017, 1, 1)
  expect(new RubyDate(2017, 5, 15).beginningOfYear()).toBeDate(2017, 1, 1)
  expect(new RubyDate(2017, 12, 31).beginningOfYear()).toBeDate(2017, 1, 1)
})

test('day', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.day()).toEqual(20)
})


test('endOfMonth', () => {
  expect(new RubyDate(2016, 8, 1).endOfMonth()).toBeDate(2016, 8, 31)
  expect(new RubyDate(2016, 8, 15).endOfMonth()).toBeDate(2016, 8, 31)
  expect(new RubyDate(2016, 8, 31).endOfMonth()).toBeDate(2016, 8, 31)

  expect(new RubyDate(2016, 2, 25).endOfMonth()).toBeDate(2016, 2, 29)
  expect(new RubyDate(2017, 2, 25).endOfMonth()).toBeDate(2017, 2, 28)
})

test('endOfYear', () => {
  expect(new RubyDate(2017, 1, 1).endOfYear()).toBeDate(2017, 12, 31)
  expect(new RubyDate(2017, 5, 15).endOfYear()).toBeDate(2017, 12, 31)
  expect(new RubyDate(2017, 12, 1).endOfYear()).toBeDate(2017, 12, 31)
  expect(new RubyDate(2018, 1, 31).endOfYear()).toBeDate(2018, 12, 31)
})

test('month', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.month()).toEqual(5)
})

test('nextDay', () => {
  const date = new RubyDate(2017, 5, 15)
  expect(date.nextDay()).toBeDate(2017, 5, 16)
  expect(date.nextDay(-15)).toBeDate(2017, 4, 30)
  expect(date.nextDay(-1)).toBeDate(2017, 5, 14)
  expect(date.nextDay(0)).toBeDate(2017, 5, 15)
  expect(date.nextDay(1)).toBeDate(2017, 5, 16)
  expect(date.nextDay(17)).toBeDate(2017, 6, 1)
})

test('nextMonth', () => {
  let date = new RubyDate(2016, 8, 1)
  expect(date.nextMonth()).toBeDate(2016, 9, 1)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 1)
  expect(date.nextMonth(4)).toBeDate(2016, 12, 1)
  expect(date.nextMonth(5)).toBeDate(2017, 1, 1)

  date = new RubyDate(2016, 8, 15)
  expect(date.nextMonth(-1)).toBeDate(2016, 7, 15)
  expect(date.nextMonth(0)).toBeDate(2016, 8, 15)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 15)

  date = new RubyDate(2016, 8, 31)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 30)
  expect(date.nextMonth(6)).toBeDate(2017, 2, 28)
  expect(date.nextMonth(-2)).toBeDate(2016, 6, 30)
})

test('nextYear', () => {
  let date = new RubyDate(2016, 5, 15)
  expect(date.nextYear()).toBeDate(2017, 5, 15)
  expect(date.nextYear(-1)).toBeDate(2015, 5, 15)
  expect(date.nextYear(0)).toBeDate(2016, 5, 15)
  expect(date.nextYear(1)).toBeDate(2017, 5, 15)

  date = new RubyDate(2016, 2, 29)
  expect(date.nextYear(-1)).toBeDate(2015, 2, 28)
  expect(date.nextYear(1)).toBeDate(2017, 2, 28)
  expect(date.nextYear(4)).toBeDate(2020, 2, 29)
})

test('toDate', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.toDate()).toBeInstanceOf(Date)
})

test('toString', () => {
  expect(new RubyDate(1, 2, 3).toString()).toEqual('0001-02-03')
  expect(new RubyDate(10, 2, 3).toString()).toEqual('0010-02-03')
  expect(new RubyDate(100, 2, 3).toString()).toEqual('0100-02-03')
  expect(new RubyDate(1000, 2, 3).toString()).toEqual('1000-02-03')
  expect(new RubyDate(10000, 2, 3).toString()).toEqual('10000-02-03')
  expect(new RubyDate(2021, 11, 22).toString()).toEqual('2021-11-22')
})

test('year', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.year()).toEqual(2021)
})
