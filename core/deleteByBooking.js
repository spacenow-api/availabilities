import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const data = JSON.parse(event.body);
  if (data.bookingId) {
    try {
      const scanResponse = await dynamoDbLib.call('scan', {
        TableName: process.env.tableName,
        FilterExpression: 'bookingId = :bookingId',
        ExpressionAttributeValues: {
          ':bookingId': data.bookingId
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
        console.warn(`Any availability found for the booking ${data.bookingId}`);
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
