const availability = async items => {

  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.concat(item.blockedDates) : exceptionDates.concat(item.blockedDates)
  })

  return ({ bookingDates, exceptionDates });

}

export default availability;