import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const data = JSON.parse(event.body);
  if (data.bookingId) {
    try {
      await dynamoDbLib.call('delete', {
        TableName: process.env.tableName,
        Key: {
          bookingId: data.bookingId
        }
      });
      return success({ status: true });
    } catch (err) {
      console.error(err);
      return failure({ status: false, error: err });
    }
  } else {
    return failure({ status: false, error: 'The booking ID is required.' });
  }
};
