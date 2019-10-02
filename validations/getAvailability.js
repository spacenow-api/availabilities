const mapResult = (availabilities) => {
  const bookingDates = Array()
  const exceptionDates = Array()
  availabilities.map((a) => {
    a.bookingId
      ? a.blockedDates.forEach((o) => bookingDates.push(o))
      : a.blockedDates.forEach((o) => exceptionDates.push(o))
  })
  return { bookingDates, exceptionDates }
}

const mapReservations = (availability) => {
  const reservationsString = availability.blockedDates
  availability.blockedDates = []
  if (reservationsString) {
    availability.blockedDates = reservationsString.split(',')
  }
  return availability
}

export { mapResult, mapReservations }
