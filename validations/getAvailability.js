const availability = async items => {

  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.push(item.blockedDates) : exceptionDates.push(item.blockedDates)
  })

  return ({ bookingDates, exceptionDates });

}

export default availability;