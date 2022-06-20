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
            v-if="!onlySameMonth || day.inSameMonth(normalized.date)"
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

<script lang="ts">
import Vue from 'vue'
import { Calendar } from '@cmath10/calendar-core'

export default Vue.extend({
  name: 'VCalendar',

  props: {
    date: {
      type: [Date, Calendar.Day],
      default: () => new Calendar.Day(),
    },

    firstDayOfWeek: {
      validator: value => value === undefined || (Number.isInteger(value) && value >= 0 && value < 7),
      default: undefined,
    },

    onlySameMonth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    weekdays (): { index: number, name: string }[] {
      const names = typeof this.$t === 'function'
          ? [
            this.$t('calendar.weekdays.sunday'),
            this.$t('calendar.weekdays.monday'),
            this.$t('calendar.weekdays.tuesday'),
            this.$t('calendar.weekdays.wednesday'),
            this.$t('calendar.weekdays.thursday'),
            this.$t('calendar.weekdays.friday'),
            this.$t('calendar.weekdays.saturday'),
          ]
          : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

      const weekdays = names.map((name, index) => ({
        index,
        name: name as string,
      }))

      return [
        ...weekdays.slice(this.normalized.firstDayOfWeek),
        ...weekdays.slice(0, this.normalized.firstDayOfWeek)
      ]
    },

    days (): Calendar.Day[][] {
      return Calendar.daysOfMonth(
          this.normalized.date,
          this.normalized.firstDayOfWeek
      )
    },

    normalized (): { date: Calendar.Day, firstDayOfWeek: number } {
      return {
        date: new Calendar.Day(this.date as Date | Calendar.Day),
        firstDayOfWeek: this.firstDayOfWeek !== undefined
          ? this.firstDayOfWeek
          : typeof this.$t === 'function'
            ? Number(this.$t('calendar.firstDayOfWeek'))
            : 0
      }
    },
  },
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
