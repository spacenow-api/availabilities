import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      listingId: parseInt(event.pathParameters.id)
    }
  };
  try {
    await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (err) {
    console.error(err);
    return failure({ status: false });
  }
};
