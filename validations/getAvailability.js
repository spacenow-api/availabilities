import _ from 'lodash'

const mapResult = async (items) => {
  let bookingDates = Array()
  let exceptionDates = Array()
  items.map((item) => {
    item.bookingId
      ? bookingDates.push(item.blockedDates)
      : exceptionDates.push(item.blockedDates)
  })
  return {
    bookingDates: _.flattenDeep(bookingDates),
    exceptionDates: _.flattenDeep(exceptionDates)
  }
}

const mapReservations = (obj) => {
  const reservationsString = obj.blockedDates
  if (reservationsString) {
    obj.blockedDates = reservationsString.split(',')
  }
  return obj
}

export { mapResult, mapReservations }
