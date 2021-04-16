import RubyDate from './ruby-date'

test('day', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.day()).toEqual(20)
})

test('month', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.month()).toEqual(5)
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
