import uuid from 'uuid'

import { success, failure } from '../libs/response-lib'
import { mapReservations } from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  const data = JSON.parse(event.Records[0].body)
  console.log('Queue Received: ', data)
  try {
    const newAvailabilityId = uuid.v1()
    await Availabilities.create({
      availabilityId: newAvailabilityId,
      listingId: data.listingId.toString(),
      bookingId: data.bookingId,
      blockedDates: data.blockedDates.join(',')
    })
    const availabilityCreated = await Availabilities.findOne({
      where: { availabilityId: newAvailabilityId }
    })
    console.log('Availability Created: ', availabilityCreated)
    return success(mapReservations(availabilityCreated))
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
