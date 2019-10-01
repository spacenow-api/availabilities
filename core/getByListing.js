import { success, failure } from '../libs/response-lib'
import { mapResult, mapReservations } from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    const result = await Availabilities.findAll({
      where: { listingId: event.pathParameters.id }
    })
    result.map(mapReservations)
    const availability = mapResult(result)
    return success({ availability })
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
