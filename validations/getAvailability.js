import _ from 'lodash';

const availability = async items => {

  let bookingDates = Array();
  let exceptionDates = Array();

  items.map((item) => {
    item.bookingId ? bookingDates.push(item.blockedDates) : exceptionDates.push(item.blockedDates)
  })

  

  return ({ bookingDates: _.flattenDeep(bookingDates), exceptionDates: _.flattenDeep(exceptionDates) });

}

export default availability;