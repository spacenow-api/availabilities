import { success, failure } from '../libs/response-lib'
import { mapReservations } from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    const availabilities = await Availabilities.findAll({
      where: { availabilityId: event.pathParameters.id }
    })
    return success({
      count: availabilities.length,
      bookings: availabilities.map(mapReservations)
    })
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
