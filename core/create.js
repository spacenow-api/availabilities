import uuid from 'uuid'
import { Op } from 'sequelize'

import { success, failure } from '../libs/response-lib'
import { mapReservations } from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  const data = JSON.parse(event.body)
  console.info('Creating Availability: ', data)
  try {
    await Availabilities.destroy({
      where: { listingId: data.listingId, bookingId: { [Op.is]: null } }
    })
    const newAvailabilityId = uuid.v1()
    await Availabilities.create({
      availabilityId: newAvailabilityId,
      listingId: data.listingId,
      blockedDates: data.blockedDates.join(',')
    })
    const availabilityCreated = await Availabilities.findOne({
      where: { availabilityId: newAvailabilityId }
    })
    console.info('Availability Created: ', availabilityCreated)
    return success(mapReservations(availabilityCreated))
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
