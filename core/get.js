// import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    // const result = await dynamoDbLib.call('scan', {
    //   TableName: process.env.tableName,
    //   FilterExpression: '#aId = :availabilityId',
    //   ExpressionAttributeNames: {
    //     '#aId': 'availabilityId'
    //   },
    //   ExpressionAttributeValues: {
    //     ':availabilityId': event.pathParameters.id
    //   }
    // })
    // return success({ count: result.Items.length, bookings: result.Items })
    const availabilities = await Availabilities.findAll({
      where: { availabilityId: event.pathParameters.id }
    })
    return success({ count: availabilities.length, bookings: availabilities })
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
