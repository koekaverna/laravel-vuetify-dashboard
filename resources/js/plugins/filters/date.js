import Vue from 'vue'
import { format, isToday, isYesterday } from 'date-fns'

Vue.filter('date', value => {
  const date = new Date(value)

  let d
  if (isToday(date)) {
    d = 'Today'
  } else if (isYesterday(date)) {
    d = 'Yesterday'
  } else {
    d = format(date, 'DD MMM YY')
  }

  return d +
    ',<br>' +
    format(date, 'HH:mm')
})
