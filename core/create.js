import uuid from "uuid"

import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  const data = JSON.parse(event.body)

  let params = {
    TableName: process.env.tableName,
    KeyConditionExpression: "#lId = :listId AND attribute_not_exists(#bId)",
    ExpressionAttributeNames:{
        "#lId": "listingId",
        '#bId' : 'bookingId',
    },
    ExpressionAttributeValues: {
        ":listId": data.listingId,
    }
  }

  const { Items: bookingObj } = await dynamoDbLib.call("query", params);

  console.log("BOOKING OBJECT", bookingObj)

  bookingObj.map((booking) => {
    params = {
      TableName: process.env.tableName,
      Key: {
        availabilityId: booking.availabilityId,
      }
    }
    try {
      await dynamoDbLib.call("delete", params);
    } catch (e) {
      console.log(e)
    }
  })

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