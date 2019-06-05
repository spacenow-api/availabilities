import uuid from "uuid"

import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  const data = JSON.parse(event.body)

  let params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "#lId = :listId",
    ExpressionAttributeNames:{
        "#lId": "listingId"
    },
    ExpressionAttributeValues: {
        ":listId": data.listingId
    }
  }

  const { Items: bookingObj } = await dynamoDbLib.call("query", params);

  console.log("BOOKING OBJECT", bookingObj[0])

  params = {
    TableName: process.env.tableName,
    Key: {
      availabilityId: bookingObj.availabilityId,
    },
    ConditionExpression: attribute_not_exists(bookingObj.bookingId)
  }

  try {
    await dynamoDbLib.call("delete", params);
  } catch (e) {
    console.log(e)
  }

  params = {
    TableName: process.env.tableName,
    Item: {
      availabilityId: uuid.v1(),
      listingId: data.listingId,
      blockedDates: data.blockedDates,
      updatedAt: Date.now(),
      createdAt: Date.now()
    }
  }

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
  
}