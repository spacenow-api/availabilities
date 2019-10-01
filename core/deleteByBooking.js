import { success, failure } from '../libs/response-lib'
import { Availabilities } from './../models'

export const main = async (event) => {
  if (event.pathParameters.id) {
    console.info(`Delete Availabilities by Booking ${event.pathParameters.id}`)
    try {
      await Availabilities.destroy({
        where: { bookingId: event.pathParameters.id }
      })
      return success({ status: true })
    } catch (err) {
      console.error(err)
      return failure({ status: false, error: err })
    }
  } else {
    return failure({ status: false, error: 'The booking ID is required.' })
  }
}
