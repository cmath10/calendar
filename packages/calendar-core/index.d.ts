export declare namespace Calendar {
  export class Day {
    constructor ();
    constructor (day: Day);
    constructor (date: Date);
    constructor (date: Date|Day);
    constructor (year: number, month: number, dayInMonth?: number);

    get date (): Date;
    get dayInMonth (): number;
    get dayInWeek (): number;
    get month (): number;
    get year (): number;
    get timestamp (): number;

    isAfter (day: unknown): boolean;
    isBefore (day: unknown): boolean;
    inSameDay (day: Day): boolean;
    inSameMonth (day: Day): boolean;
    toString (): string;
  }

  export type DayOrNull = Day|null
  export type DayRange = [DayOrNull, DayOrNull]

  export function daysOfWeek (date: Day, firstDayOfWeek: number): Day[];
  export function daysOfMonth (date: Day, firstDayOfWeek: number): Day[][];

  export function decade (year: number): number[];

  export function max (a, b): DayOrNull;
  export function min (a, b): DayOrNull;

  export function minmax (day: unknown, [min, max]: DayRange): DayOrNull;
}
