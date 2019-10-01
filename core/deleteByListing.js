import { success, failure } from '../libs/response-lib'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    await Availabilities.destroy({
      where: { listingId: event.pathParameters.id.toString() }
    })
    return success({ status: true })
  } catch (err) {
    console.error(err)
    return failure({ status: false })
  }
}
