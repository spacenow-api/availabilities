import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  console.log("EVENT ===>>> ", event)
  const listingId = JSON.parse(event.listingId)


  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "listingId = :listingId",
    ExpressionAttributeValues: {
      ":listingId": listingId
    }
  }

  try {
    const result = await dynamoDbLib.call("query", params);
    return success(result.Items)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }

}