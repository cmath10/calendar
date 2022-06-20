import { Calendar } from '@/index'
import { expect } from '@jest/globals'

const pad = (num: number) => num.toString().padStart(2, '0')

describe('Calendar', () => {
  test.each([
    [[2000, 1, 1]],
    [[2000, 2, 1]],
    [[2000, 3, 1]],
    [[2000, 4, 1]],
    [[2000, 5, 1]],
    [[2000, 6, 1]],
    [[2000, 7, 1]],
    [[2000, 8, 1]],
    [[2000, 9, 1]],
    [[2000, 10, 1]],
    [[2000, 11, 1]],
    [[2000, 12, 1]],
  ])('daysOfMonth %s', ([year, month, day]) => {
    expect(
      Calendar.daysOfMonth(new Calendar.Day(...[year, month, day]), 1).map(
        week => week.map(
          day => `${day.year}-${pad(day.month)}-${pad(day.dayInMonth)}`
        )
      )
    ).toMatchSnapshot()
  })

  test.each([
    [[2000, 1, 2], [2000, 1, 1]],
    [[2002, 1, 2], [2001, 1, 1]],
    [[2000, 3, 1], [2000, 2, 1]],
    [[2020, 1, 1], [2003, 1, 1]],
    [[2000, 11, 1], [2000, 1, 1]],
    [[2030, 1, 1], [2010, 1, 30]],
  ])('%s isAfter %s', (
    a: [number, number, number],
    b: [number, number, number]
  ) => {
    expect(
      new Calendar.Day(...a).isAfter(new Calendar.Day(...b))
    ).toBeTruthy()
  })

  test.each([
    [[2000, 1, 1], [2000, 1, 2]],
    [[2001, 1, 1], [2002, 1, 2]],
    [[2000, 2, 1], [2000, 3, 1]],
    [[2003, 1, 1], [2020, 1, 1]],
    [[2000, 1, 1], [2000, 11, 1]],
    [[2010, 1, 30], [2030, 1, 1]],
  ])('%s isBefore %s', (
    a: [number, number, number],
    b: [number, number, number],
  ) => {
    expect(
      new Calendar.Day(...a).isBefore(new Calendar.Day(...b))
    ).toBeTruthy()
  })

  test.each([
    [[2012, 1, 1], [2012, 1, 1], true],
    [[2001, 1, 1], [2001, 1, 1], true],
    [[2000, 2, 1], [2000, 2, 1], true],
    [[2003, 1, 1], [2003, 1, 1], true],
    [[2000, 11, 1], [2000, 11, 1], true],
    [[2030, 1, 1], [2030, 1, 1], true],
    [[2012, 1, 1], [2000, 1, 2], false],
    [[2001, 1, 1], [2002, 1, 2], false],
    [[2000, 2, 1], [2099, 3, 1], false],
    [[2003, 1, 1], [2020, 1, 1], false],
    [[2023, 1, 1], [2000, 11, 1], false],
    [[2010, 1, 30], [2030, 1, 1], false],
  ])('%s inSameDay %s = %s', (
    a: [number, number, number],
    b: [number, number, number],
    expectation: boolean
  ) => {
    expect(
      new Calendar.Day(...a).inSameDay(new Calendar.Day(...b))
    ).toBe(expectation)
  })

  test.each([
    [[2000, 1, 1], [2000, 1, 30], true],
    [[2012, 2, 23], [2012, 2, 3], true],
    [[2000, 2, 1], [2000, 1, 30], false],
    [[2000, 2, 23], [2012, 2, 3], false],
  ])('%s inSameMonth %s = %s', (
    a: [number, number, number],
    b: [number, number, number],
    expectation: boolean
  ) => {
    expect(
      new Calendar.Day(...a).inSameMonth(new Calendar.Day(...b))
    ).toBe(expectation)
  })

  test.each([
    [[2000, 1, 1], [2000, 1, 30], [2000, 1, 30]],
    [[2022, 1, 1], [2000, 1, 30], [2022, 1, 1]],
  ])('max(%s, %s)=%s', (
    a: [number, number, number],
    b: [number, number, number],
    expectation: [number, number, number]
  ) => {
    expect(
      Calendar.max(
        new Calendar.Day(...a),
        new Calendar.Day(...b)
      ).inSameDay(new Calendar.Day(...expectation))
    ).toBeTruthy()

    expect(
      Calendar.max(
        new Calendar.Day(...b),
        new Calendar.Day(...a)
      ).inSameDay(new Calendar.Day(...expectation))
    ).toBeTruthy()
  })

  test.each([
    [[2000, 1, 1], [2000, 1, 30], [2000, 1, 1]],
    [[2022, 1, 1], [2000, 1, 30], [2000, 1, 30]],
  ])('min(%s, %s)=%s', (
    a: [number, number, number],
    b: [number, number, number],
    expectation: [number, number, number]
  ) => {
    expect(
      Calendar.min(
        new Calendar.Day(...a),
        new Calendar.Day(...b)
      ).inSameDay(new Calendar.Day(...expectation))
    ).toBeTruthy()

    expect(
      Calendar.min(
        new Calendar.Day(...b),
        new Calendar.Day(...a)
      ).inSameDay(new Calendar.Day(...expectation))
    ).toBeTruthy()
  })
})
