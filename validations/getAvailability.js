const availability = async items => {

  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.push(item.blockedDates) : exceptionDates.push(item.blockedDates)
  })

  

  return ({ bookingDates: [].concat.apply([], bookingDates), exceptionDates: [].concat.apply([], exceptionDates) });

}

export default availability;