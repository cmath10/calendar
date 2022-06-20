import { createI18n } from 'vue-i18n'
import { mount } from '@vue/test-utils'
import { Calendar } from '@cmath10/calendar-core'

import { VCalendar } from '@/index'

const i18n = createI18n({
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

    expect(weekdays[0].text()).toContain('Su')
    expect(weekdays[1].text()).toContain('Mo')
    expect(weekdays[2].text()).toContain('Tu')
    expect(weekdays[3].text()).toContain('We')
    expect(weekdays[4].text()).toContain('Th')
    expect(weekdays[5].text()).toContain('Fr')
    expect(weekdays[6].text()).toContain('Sa')

    const backdrops = wrapper.findAll('[data-backdrop]')
    const buttons = wrapper.findAll('[data-button]')

    expect(backdrops.length).toEqual(31)
    expect(buttons.length).toEqual(31)
  })

  test('i18n', async () => {
    const wrapper = mount({
      components: { VCalendar },

      provide () {
        return {
          t: i18n.global.t
        }
      },

      data: () => ({
        date: new Calendar.Day(2000, 1, 1),
      }),

      template: `<VCalendar :date="date" only-same-month />`,

      global: {
        plugins: [i18n]
      }
    })

    const weekdaysEn = wrapper.findAll('.v-calendar__weekday')

    expect(weekdaysEn[0].text()).toContain('Su')
    expect(weekdaysEn[1].text()).toContain('Mo')
    expect(weekdaysEn[2].text()).toContain('Tu')
    expect(weekdaysEn[3].text()).toContain('We')
    expect(weekdaysEn[4].text()).toContain('Th')
    expect(weekdaysEn[5].text()).toContain('Fr')
    expect(weekdaysEn[6].text()).toContain('Sa')

    i18n.global.locale = 'ru-RU'

    await wrapper.vm.$nextTick()

    const weekdaysRu = wrapper.findAll('.v-calendar__weekday')

    expect(weekdaysRu[0].text()).toContain('Пн')
    expect(weekdaysRu[1].text()).toContain('Вт')
    expect(weekdaysRu[2].text()).toContain('Ср')
    expect(weekdaysRu[3].text()).toContain('Чт')
    expect(weekdaysRu[4].text()).toContain('Пт')
    expect(weekdaysRu[5].text()).toContain('Сб')
    expect(weekdaysRu[6].text()).toContain('Вс')
  })
})
