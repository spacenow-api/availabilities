// import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import { Availabilities } from './../models'

export const main = async (event) => {
  try {
    // await dynamoDbLib.call('delete', {
    //   TableName: process.env.tableName,
    //   Key: {
    //     listingId: event.pathParameters.id.toString()
    //   }
    // })
    // return success({ status: true })
    await Availabilities.destroy({ where: { listingId: event.pathParameters.id.toString() } })
    return success({ status: true })
  } catch (err) {
    console.error(err)
    return failure({ status: false })
  }
}
