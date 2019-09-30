import uuid from 'uuid'

// import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import { Availabilities } from './../models'

export const main = async (event) => {
  const data = JSON.parse(event.Records[0].body)
  console.log('Queue Received: ', data)
  // const params = {
  //   TableName: process.env.tableName,
  //   Item: {
  //     availabilityId: uuid.v1(),
  //     listingId: data.listingId.toString(),
  //     bookingId: data.bookingId,
  //     blockedDates: data.blockedDates,
  //     updatedAt: Date.now(),
  //     createdAt: Date.now()
  //   }
  // }
  try {
    // await dynamoDbLib.call('put', params)
    // return success(params.Item)
    const newAvailabilityId = uuid.v1()
    await Availabilities.create({
      availabilityId: newAvailabilityId,
      listingId: data.listingId.toString(),
      bookingId: data.bookingId,
      blockedDates: data.blockedDates.join(',')
    })
    const availabilityCreated = Availabilities.findOne({
      where: { availabilityId: newAvailabilityId }
    })
    console.log('Availability Created: ', availabilityCreated)
    return success(availabilityCreated)
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
