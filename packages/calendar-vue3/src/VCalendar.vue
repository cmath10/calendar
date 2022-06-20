<template>
  <div class="v-calendar">
    <div class="v-calendar__row">
      <div
          v-for="(weekday, i) in weekdays"
          :key="'weekday-' + i"
          class="v-calendar__weekday"
      >
        <slot name="weekday" :weekday="weekday">
          {{ weekday.name }}
        </slot>
      </div>
    </div>

    <div
        v-for="(week, i) in days"
        :key="'week-' + (i + 1)"
        :class="{
          'v-calendar__row': true,
          'v-calendar__row_justify-end': i === 0,
        }"
    >
      <template v-for="day in week">
        <div
            v-if="!onlySameMonth || day.inSameMonth(date)"
            :key="'day-' + day"
            class="v-calendar__day"
        >
          <slot name="day" :day="day">
            {{ day.dayInMonth }}
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import type { PropType } from 'vue'
import type { Composer } from 'vue-i18n'

import { Calendar } from '@cmath10/calendar-core'

import i18n from '@/i18n'

const props = defineProps({
  date: {
    type: [Date, Calendar.Day],
    default: () => new Calendar.Day(),
  },

  firstDayOfWeek: {
    type: null as unknown as PropType<undefined|number>,
    validator: (value: unknown) => value === undefined || (
        Number.isInteger(value) &&
        (value as number) >= 0 &&
        (value as number) < 7
    ),
    default: undefined,
  },

  onlySameMonth: {
    type: Boolean,
    default: false
  },
})

const alternate = <T>(v: T|undefined, d: T): T => v !== undefined ? v : d
const t: Composer['t'] = alternate(inject('t', undefined) as Composer['t']|undefined, ((key: string): string|undefined => {
  return i18n[key]
}) as unknown as Composer['t'])

const date = computed(() => new Calendar.Day(props.date))

const firstDayOfWeek = computed(() => alternate(
  props.firstDayOfWeek,
  Number(t('calendar.firstDayOfWeek')),
))

const days = computed(() => Calendar.daysOfMonth(
    date.value,
    firstDayOfWeek.value
))

const weekdays = computed(() => {
  const weekdays = [
    t('calendar.weekdays.sunday'),
    t('calendar.weekdays.monday'),
    t('calendar.weekdays.tuesday'),
    t('calendar.weekdays.wednesday'),
    t('calendar.weekdays.thursday'),
    t('calendar.weekdays.friday'),
    t('calendar.weekdays.saturday'),
  ].map((name, index) => ({
    index,
    name,
  }))

  return [
    ...weekdays.slice(firstDayOfWeek.value),
    ...weekdays.slice(0, firstDayOfWeek.value)
  ]
})
</script>

<style lang="scss">
.v-calendar {
  display: flex;
  flex-wrap: wrap;

  &__row {
    display: flex;
    width: 100%;

    &_justify-end {
      justify-content: flex-end;
    }
  }
}
</style>
