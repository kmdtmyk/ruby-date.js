import RubyDate from './ruby-date'

test('toDate', () => {
  const date = new RubyDate(2021, 5, 20)
  expect(date.toDate()).toBeInstanceOf(Date)
})
