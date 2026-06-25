/**
 * Database Operations Layer
 * 
 * Centralized data access Layer
 * 
 */

/**
 * imports
 */
import { dynamoDB } from "./dynamo-client";
import { QueryCommand ,GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";

/**
 * DynamoDB Repository Table
 */
const applicationTable = process.env.MERGE_TOKEN_REPOSITORY_TABLE;

/**
 * Database Operations
 */
export const dbOperations = {

  /**
   * Fetch all repositories
   */
  async getAllApplications() {

    try {

      const data = await dynamoDB.send( 
        /**
         * Query all items
         */
        new QueryCommand({
          TableName: applicationTable,

          KeyConditionExpression: "PK = :pk",
          ExpressionAttributeValues: {
            ":pk" : "repo"
          }
        }) 
      );

    return data.Items;
    } catch (err){
      console.error("Error whle fetching:", err)
      throw err
    }

  },

  /**
   * Retrieve repository by name
   */
  async getApplicationByName(name) {

    const data = await dynamoDB.send(
      /**
       * Get repository based on key
       */
      new GetCommand({
        TableName: applicationTable,
        Key: {
          PK : "repo",
          SK : `repo#${name}`
        }
      })
    );

    return data.Item;
  },

  /**
   * Creates a repository item 
   */
  async createApplication(appData) {

    try{
      await dynamoDB.send(
        new PutCommand({
          TableName: applicationTable,
          Item: {
            PK : "repo",
            SK : `repo#${appData.name}`,
            ...appData
          }
        })
      );
    } catch(err){
       console.error("Error while creating: ", err)
       throw err
    }
  },

  /**
   * Update Repository State
   */
  async updateApplicationData(application, requestingUserEmail) {

    try{

      /**
       * Base Update Expression 
       * - shared by both lock/unlock operations
       */
      const updateParams = {
        TableName: applicationTable,
        Key : {
          PK : "repo",
          SK : `repo#${application.name}`
        },
        UpdateExpression: `SET merged= :merged, mergedAt= :mergedAt, mergedBy= :mergedBy, mergedByEmail = :mergedByEmail, #status= :status`,

        ExpressionAttributeNames : {
          "#status" : "status"
        },

        ReturnValues : "ALL_NEW"
      }

      /**
       * Token Acquisition Flow
       * 
       * - only succeeds if repository 
       *   is currently unlocked
       * - prevent race conditions where 
       *   multiple users attempt to acquire
       *   the same token simultaneously
       * 
       */
      if( application.merged){
         
        updateParams.ConditionExpression = "merged = :false"; 
      
        updateParams.ExpressionAttributeValues = {
          ":merged" : application.merged,
          ":mergedBy" : application.mergedBy,
          ":mergedByEmail": application.mergedByEmail,
          ":mergedAt" : application.mergedAt,
          ":status" : application.status,
          ":false" : false // nobody yet taken
        }
      } else {
        /**
         * Token Release Flow
         * 
         * - Only the user who currently owns
         *   the token can release it
         * - Prevents accidental release by 
         *   other users.
         * 
         */
        
        updateParams.ConditionExpression = "mergedByEmail = :currentUserEmail";
        updateParams.ExpressionAttributeValues = {
          ":merged": application.merged,
          ":mergedBy" : application.mergedBy,
          ":mergedByEmail": application.mergedByEmail, 
          ":mergedAt" : application.mergedAt,
          ":status" : application.status,
          ":currentUserEmail" : requestingUserEmail 
        }
      }

      const data = await dynamoDB.send(
        new UpdateCommand(updateParams)
      );
      return data.Attributes;

    } catch(err){
      console.error("Error while saving reposiotry: ", err)
      throw err
    }
  },

  /**
   * Check Admin User
   */
  async listAdminUsers(email) {

    try {
      const data = await dynamoDB.send(
        new GetCommand({
          TableName: applicationTable,
          Key: {
            PK : "user#admin",
            SK : email
          }
        })
      );

      return data.Item;
    } catch(err){
      console.error("Error while finding admin: ", err)
      throw err
    }
  }
};
