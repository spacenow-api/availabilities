const availability = async items => {

  let availableDates = Object;
  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.push(item.blockedDates) : exceptionDates.push(item.blockedDates)
  })

  return availableDates(bookingDates, exceptionDates)

}

export default availability;