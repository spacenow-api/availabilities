const availability = async items => {

  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.concat(...bookingDates, item.blockedDates) : exceptionDates.concat(...exceptionDates, item.blockedDates)
  })

  return ({ bookingDates, exceptionDates });

}

export default availability;