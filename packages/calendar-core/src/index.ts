export namespace Calendar {
  export type DateInitiator = [Date]|[number, number, number|undefined]

  const dateWithoutTime = (date = new Date()): Date => new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )

  const createDate = (...options: DateInitiator): Date => {
    const [date] = options || []
    const [year, month, dayInMonth = 1] = options || []

    return date instanceof Date
      ? dateWithoutTime(date)
      : typeof year === 'number'
        ? new Date(year, month - 1, dayInMonth)
        : dateWithoutTime()
  }

  export class Day {
    private readonly _date: Date

    constructor (...options: [Day]|DateInitiator) {
      const [date] = options || []

      this._date = date instanceof Day
        ? createDate(date.date)
        : createDate(...options as DateInitiator)
    }

    get date (): Date {
      return new Date(this._date)
    }

    get dayInMonth () {
      return this._date.getDate()
    }

    get dayInWeek (): number {
      return this._date.getDay()
    }

    get month (): number {
      return this._date.getMonth() + 1
    }

    get year (): number {
      return this._date.getFullYear()
    }

    get timestamp (): number {
      return this._date.getTime()
    }

    isAfter (day) {
      return day instanceof Day && day.timestamp < this.timestamp
    }

    isBefore (day) {
      return day instanceof Day && day.timestamp > this.timestamp
    }

    inSameDay (day: Day) {
      return day.dayInMonth === this.dayInMonth && this.inSameMonth(day)
    }

    inSameMonth (day: Day) {
      return day.month === this.month && day.year === this.year
    }

    toString () {
      return this._date.toString()
    }
  }

  export type DayOrNull = Day|null
  export type DayRange = [DayOrNull, DayOrNull]

  export function daysOfWeek (
    date: Day,
    firstDayOfWeek: number
  ): Day[] {
    const days = []
    const offset = date.dayInWeek === 0 && firstDayOfWeek > 0 ? 7 : 0

    for (let i = 0; i < 7; i++) {
      days.push(new Day(
        date.year,
        date.month,
        date.dayInMonth - date.dayInWeek + i + firstDayOfWeek - offset
      ))
    }

    return days
  }

  export function daysOfMonth (
    date: Day,
    firstDayOfWeek: number
  ): Day[][] {
    const days = []

    for (let i = 0; i < 6; i++) {
      days.push(daysOfWeek(new Day(
        date.year,
        date.month,
        1 + i * 7
      ), firstDayOfWeek))
    }

    return days
  }

  export function decade (year: number): number[] {
    const first = year - (year % 10) - 1

    return Array.from({ length: 12 }, (_, i) => i + first)
  }

  export function max (a, b): DayOrNull {
    return a instanceof Day
      ? b instanceof Day
        ? a.isAfter(b)
          ? a
          : b
        : a
      : b instanceof Day
        ? b
        : null
  }

  export function min (a, b): DayOrNull {
    return a instanceof Day
      ? b instanceof Day
        ? a.isBefore(b)
          ? a
          : b
        : a
      : b instanceof Day
        ? b
        : null
  }

  export function minmax (day: unknown, [min, max]: DayRange): DayOrNull {
    return day ? Calendar.max(Calendar.min(day, max), min) : null
  }
}
