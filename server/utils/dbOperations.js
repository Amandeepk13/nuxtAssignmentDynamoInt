import { dynamoDB } from "./dbconnection";
import { QueryCommand ,GetCommand, PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";


const applicationTable = process.env.MERGE_TOKEN_REPOSITORY_TABLE;

export const dbOperations = {

  async getApp() {

    try {

      const data = await dynamoDB.send( 
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
      console.log("Error whle fetching:", err)
      throw err
    }

  },

  async findByName(name) {

    const data = await dynamoDB.send(
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

  async createApp(appData) {

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
       console.log("Error while creating: ", err)
       throw err
    }
  },

  async saveApp(application) {

    try{
      await dynamoDB.send(
        new UpdateCommand({
          TableName: applicationTable,

          Key: {
            PK : "repo",
            SK : `repo#${application.name}`
          },

          UpdateExpression : ` SET merged= :merged, mergedAt= :mergedAt, mergedBy= :mergedBy, #status= :status `,

          ExpressionAttributeNames:{
            "#status" : "status"
          },
          
          ExpressionAttributeValues: {
            ":merged" : application.merged,
            ":mergedBy" : application.mergedBy,
            ":mergedAt" : application.mergedAt,
            ":status" : application.status,
          },

          ReturnValues: "ALL_NEW"
        })
      );
    } catch(err){
      console.log("Error while saving reposiotry: ", err)
      throw err
    }
  },

  async findAdmin(email) {

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
      console.log("Error while finding admin: ", err)
      throw err
    }
  }
};
