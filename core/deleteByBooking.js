import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  if (event.pathParameters.id) {
    try {
      const scanResponse = await dynamoDbLib.call('scan', {
        TableName: process.env.tableName,
        FilterExpression: 'bookingId = :bookingId',
        ExpressionAttributeValues: {
          ':bookingId': event.pathParameters.id
        }
      });
      if (scanResponse.Items.length > 0) {
        const record = scanResponse.Items[0];
        await dynamoDbLib.call('delete', {
          TableName: process.env.tableName,
          Key: {
            listingId: record.listingId,
            availabilityId: record.availabilityId
          }
        });
        return success({ status: true });
      } else {
        console.warn(`Any availability found for the booking ${event.pathParameters.id}`);
        return success({ status: true });
      }
    } catch (err) {
      console.error(err);
      return failure({ status: false, error: err });
    }
  } else {
    return failure({ status: false, error: 'The booking ID is required.' });
  }
};
