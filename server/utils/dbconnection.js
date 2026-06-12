/**
 * DynamoDB Connection
 * 
 * creates a reusable DynamoDB Document client
 * 
 */

/**
 * imports
 */
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * Base DynamoDB Client
 */
const client = new DynamoDBClient({
   region: process.env.AWS_REGION,
   credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

/**
 * Document Client Wrapper
 * - automatically marshals objects
 */
export const dynamoDB = DynamoDBDocumentClient.from(client);