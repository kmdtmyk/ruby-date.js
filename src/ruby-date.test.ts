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

test('year', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.year()).toEqual(2021)
})
