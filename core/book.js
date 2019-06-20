import uuid from 'uuid';

import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const data = JSON.parse(event.Records[0].body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      availabilityId: uuid.v1(),
      listingId: data.listingId.toString(),
      bookingId: data.bookingId,
      blockedDates: data.blockedDates,
      updatedAt: Date.now(),
      createdAt: Date.now()
    }
  };
  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    console.error(err);
    return failure({ status: false, error: err });
  }
};
