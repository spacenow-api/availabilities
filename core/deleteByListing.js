import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {

  console.log("LISTING ID", event.pathParameters.id)

  const params = {
    TableName: process.env.tableName,
    Key: {
      listingId: event.pathParameters.id.toString()
    }
  }

  try {
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
  
}