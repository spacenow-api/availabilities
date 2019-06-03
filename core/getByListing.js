import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"
import getAvailability from '../validations/getAvailability'

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
    const res = await dynamoDbLib.call("scan", params);
    const availability = await getAvailability(res.Items);
    return success({availability})
  } catch (e) {
    console.log("error ", e)
    return failure({ status: false })
  }

}