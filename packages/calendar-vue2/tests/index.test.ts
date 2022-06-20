import VueI18N from 'vue-i18n'
import { createLocalVue, mount } from '@vue/test-utils'
import { Calendar } from '@cmath10/calendar-core'

import { VCalendar } from '@/index'

const localVue = createLocalVue()

localVue.use(VueI18N)

const i18n = new VueI18N({
  locale: 'en-GB',
  messages: {
    'en-GB': {
      calendar: {
        firstDayOfWeek: '0',
        weekdays: {
          sunday: 'Su',
          monday: 'Mo',
          tuesday: 'Tu',
          wednesday: 'We',
          thursday: 'Th',
          friday: 'Fr',
          saturday: 'Sa',
        },
      },
    },
    'ru-RU': {
      calendar: {
        firstDayOfWeek: '1',
        weekdays: {
          sunday: 'Вс',
          monday: 'Пн',
          tuesday: 'Вт',
          wednesday: 'Ср',
          thursday: 'Чт',
          friday: 'Пт',
          saturday: 'Сб',
        },
      },
    },
  },
  silentFallbackWarn: true,
})

describe('VCalendar', () => {
  test('slots', () => {
    const wrapper = mount({
      components: { VCalendar },

      data: () => ({
        date: new Calendar.Day(2000, 1, 1),
      }),

      template: `
        <VCalendar :date="date" only-same-month>
          <template #weekday="{ weekday }">
            <div data-weekday>{{ weekday.name }}</div>
          </template>

          <template #day="{ day }">
            <div data-backdrop />
            <div data-button>
              {{ day.dayInMonth }}
            </div>
          </template>
        </VCalendar>
      `
    })

    const weekdays = wrapper.findAll('[data-weekday]')

    expect(weekdays.length).toEqual(7)

    expect(weekdays.at(0).text()).toContain('Su')
    expect(weekdays.at(1).text()).toContain('Mo')
    expect(weekdays.at(2).text()).toContain('Tu')
    expect(weekdays.at(3).text()).toContain('We')
    expect(weekdays.at(4).text()).toContain('Th')
    expect(weekdays.at(5).text()).toContain('Fr')
    expect(weekdays.at(6).text()).toContain('Sa')

    const backdrops = wrapper.findAll('[data-backdrop]')
    const buttons = wrapper.findAll('[data-button]')

    expect(backdrops.length).toEqual(31)
    expect(buttons.length).toEqual(31)
  })

  test('i18n', async () => {
    const wrapper = mount({
      i18n,

      components: { VCalendar },

      provide () {
        return {
          // @ts-ignore
          t: this.$i18n.t
        }
      },

      data: () => ({
        date: new Calendar.Day(2000, 1, 1),
      }),

      template: `<VCalendar :date="date" only-same-month />`,
    }, { localVue })

    const weekdaysEn = wrapper.findAll('.v-calendar__weekday')

    expect(weekdaysEn.at(0).text()).toContain('Su')
    expect(weekdaysEn.at(1).text()).toContain('Mo')
    expect(weekdaysEn.at(2).text()).toContain('Tu')
    expect(weekdaysEn.at(3).text()).toContain('We')
    expect(weekdaysEn.at(4).text()).toContain('Th')
    expect(weekdaysEn.at(5).text()).toContain('Fr')
    expect(weekdaysEn.at(6).text()).toContain('Sa')

    i18n.locale = 'ru-RU'

    await wrapper.vm.$nextTick()

    const weekdaysRu = wrapper.findAll('.v-calendar__weekday')

    expect(weekdaysRu.at(0).text()).toContain('Пн')
    expect(weekdaysRu.at(1).text()).toContain('Вт')
    expect(weekdaysRu.at(2).text()).toContain('Ср')
    expect(weekdaysRu.at(3).text()).toContain('Чт')
    expect(weekdaysRu.at(4).text()).toContain('Пт')
    expect(weekdaysRu.at(5).text()).toContain('Сб')
    expect(weekdaysRu.at(6).text()).toContain('Вс')
  })
})
