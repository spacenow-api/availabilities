// import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import getAvailability from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    // const res = await dynamoDbLib.call('scan', {
    //   TableName: process.env.tableName,
    //   FilterExpression: '#lId = :listingId',
    //   ExpressionAttributeNames: {
    //     '#lId': 'listingId'
    //   },
    //   ExpressionAttributeValues: {
    //     ':listingId': event.pathParameters.id
    //   }
    // })
    // const availability = await getAvailability(res.Items)
    // return success({ availability })
    const result = await Availabilities.findAll({
      where: { listingId: event.pathParameters.id }
    })
    const availability = await getAvailability(result)
    return success({ availability })
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
