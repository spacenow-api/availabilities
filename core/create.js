import uuid from 'uuid'
import { Op } from 'sequelize'

// import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import { mapReservations } from '../validations/getAvailability'
import { Availabilities } from './../models'

export const main = async (event) => {
  const data = JSON.parse(event.body)
  console.log('Creating Availability: ', data)
  // let params = {
  //   TableName: process.env.tableName,
  //   KeyConditionExpression: '#lId = :listId',
  //   ExpressionAttributeNames: {
  //     '#lId': 'listingId'
  //   },
  //   ExpressionAttributeValues: {
  //     ':listId': data.listingId
  //   },
  //   ConditionExpression: 'attribute_not_exists(bookingId)'
  // };
  // const { Items: bookingObj } = await dynamoDbLib.call('query', params);
  // bookingObj.map(async booking => {
  //   params = {
  //     TableName: process.env.tableName,
  //     Key: {
  //       listingId: booking.listingId,
  //       availabilityId: booking.availabilityId
  //     }
  //   };
  //   try {
  //     await dynamoDbLib.call('delete', params);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });
  // params = {
  //   TableName: process.env.tableName,
  //   Item: {
  //     availabilityId: uuid.v1(),
  //     listingId: data.listingId,
  //     blockedDates: data.blockedDates,
  //     updatedAt: Date.now(),
  //     createdAt: Date.now()
  //   }
  // };
  // try {
  //   await dynamoDbLib.call('put', params);
  //   return success(params.Item);
  // } catch (err) {
  //   console.error(err);
  //   return failure({ status: false, error: err });
  // }
  try {
    await Availabilities.destroy({ where: { listingId: data.listingId, bookingId: { [Op.is]: null } } })
    const newAvailabilityId = uuid.v1()
    await Availabilities.create({
      availabilityId: newAvailabilityId,
      listingId: data.listingId,
      blockedDates: data.blockedDates.join(',')
    })
    const availabilityCreated = await Availabilities.findOne({
      where: { availabilityId: newAvailabilityId }
    })
    console.log('Availability Created: ', availabilityCreated)
    return success(mapReservations(availabilityCreated))
  } catch (err) {
    console.error(err)
    return failure({ status: false, error: err })
  }
}
