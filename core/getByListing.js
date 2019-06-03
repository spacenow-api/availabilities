import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  const params = {
    TableName: process.env.tableName,
    FilterExpression: "#lId = :listingId",
    ExpressionAttributeNames:{
        "#lId": "listingId"
    },
    ExpressionAttributeValues: {
      ":listingId": event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call("scan", params);
    let bookingDates = Array();
    let exceptionDates = Array();
    result.Items.map((availability) => {
      availability.bookingId ? bookingDates.push(availability.blockedDates) : exceptionDates.push(availability.blockedDates)
    })
    return success({count:result.Items.length, bookingDates, exceptionDates})
  } catch (e) {
    return failure({ status: false })
  }

}