import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    FilterExpression: '#aId = :availabilityId',
    ExpressionAttributeNames: {
      '#aId': 'availabilityId'
    },
    ExpressionAttributeValues: {
      ':availabilityId': event.pathParameters.id
    }
  };
  try {
    const result = await dynamoDbLib.call('scan', params);
    return success({ count: result.Items.length, bookings: result.Items });
  } catch (err) {
    console.error(err);
    return failure({ status: false, error: err });
  }
};
