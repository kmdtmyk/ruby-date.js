[![Publish](https://github.com/kmdtmyk/ruby-date.js/workflows/Publish/badge.svg)](https://github.com/kmdtmyk/ruby-date.js/actions)
[![Test](https://github.com/kmdtmyk/ruby-date.js/workflows/Test/badge.svg)](https://github.com/kmdtmyk/ruby-date.js/actions)

# RubyDate

Date class that can be used same as Ruby's Date.

## Installation

```
npm install @kmdtmyk/ruby-date
```

## Usage

```javascript
import RubyDate from '@kmdtmyk/ruby-date'

const date = new RubyDate(2021, 3, 15) // => 2021-03-15

date.day() // => 15

date.month() // => 3

date.year() // => 2021

date.beginningOfMonth() // => 2021-03-01
date.endOfMonth() // => 2021-03-31

date.beginningOfYear() // => 2021-01-01
date.endOfYear() // => 2021-12-31

date.nextDay() // => 2021-03-16
date.nextDay(3) // => 2021-03-18

date.nextMonth() // => 2021-04-15
date.nextMonth(3) // => 2021-06-15

date.nextYear() // => 2022-03-15
date.nextYear(3) // => 2024-03-15

date.strftime('%Y/%m/%d') // => "2021/03/15"
/*
  [Support format]
  %m - zero-padded month (01..12)
  %d - zero-padded day (01..31)
  %Y - Year with century (can be negative, 4 digits at least)
  %y - year % 100 (00..99)
*/

RubyDate.parse('2021/03/15') // => 2021-03-15
RubyDate.today()
```

## License

MIT
