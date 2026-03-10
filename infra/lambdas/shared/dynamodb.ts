import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

const TABLE_NAME = process.env.TABLE_NAME!;

export async function putItem(item: Record<string, unknown>): Promise<void> {
  await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: item }));
}

export async function getItem(pk: string, sk: string): Promise<Record<string, unknown> | null> {
  const result = await docClient.send(
    new GetCommand({ TableName: TABLE_NAME, Key: { PK: pk, SK: sk } }),
  );
  return (result.Item as Record<string, unknown>) ?? null;
}

export async function queryItems(
  pk: string,
  skPrefix?: string,
): Promise<Record<string, unknown>[]> {
  const params: Record<string, unknown> = {
    TableName: TABLE_NAME,
    KeyConditionExpression: skPrefix
      ? 'PK = :pk AND begins_with(SK, :sk)'
      : 'PK = :pk',
    ExpressionAttributeValues: skPrefix
      ? { ':pk': pk, ':sk': skPrefix }
      : { ':pk': pk },
  };

  const result = await docClient.send(new QueryCommand(params as any));
  return (result.Items as Record<string, unknown>[]) ?? [];
}

const GSI1_INDEX_NAME = process.env.GSI1_INDEX_NAME ?? 'GSI1';

export async function queryGSI1(
  gsi1pk: string,
  gsi1skPrefix?: string,
): Promise<Record<string, unknown>[]> {
  const params: Record<string, unknown> = {
    TableName: TABLE_NAME,
    IndexName: GSI1_INDEX_NAME,
    KeyConditionExpression: gsi1skPrefix
      ? 'GSI1PK = :pk AND begins_with(GSI1SK, :sk)'
      : 'GSI1PK = :pk',
    ExpressionAttributeValues: gsi1skPrefix
      ? { ':pk': gsi1pk, ':sk': gsi1skPrefix }
      : { ':pk': gsi1pk },
  };

  const result = await docClient.send(new QueryCommand(params as any));
  return (result.Items as Record<string, unknown>[]) ?? [];
}

export async function updateItem(
  pk: string,
  sk: string,
  updates: Record<string, unknown>,
): Promise<void> {
  const keys = Object.keys(updates);
  const updateExpression = 'SET ' + keys.map((k, i) => `#k${i} = :v${i}`).join(', ');
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, unknown> = {};

  keys.forEach((k, i) => {
    expressionAttributeNames[`#k${i}`] = k;
    expressionAttributeValues[`:v${i}`] = updates[k];
  });

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { PK: pk, SK: sk },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    }),
  );
}

export { docClient, TABLE_NAME };
