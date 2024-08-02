const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.ITEMS_TABLE || 'Items';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World!' }),
  };
};

module.exports.createItem = async (event) => {
  const { id, data } = JSON.parse(event.body);

  const params = {
    TableName: TABLE_NAME,
    Item: { id, data },
  };

  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ id, data }),
  };
};

module.exports.getItem = async (event) => {
  const { id } = event.pathParameters;

  const params = {
    TableName: TABLE_NAME,
    Key: { id },
  };

  const result = await dynamoDb.get(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};

