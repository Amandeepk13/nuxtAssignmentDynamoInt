import { dynamoDB } from "./dbconnection";
import { ScanCommand,GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";


const applicationTable = process.env.APPLICATIONS_TABLE;
const adminTable = process.env.ADMINS_TABLE;

export const dbOperations = {

  async getApp() {

    try {

      const data = await dynamoDB.send( new ScanCommand({
        TableName: applicationTable
      }) );

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
          name
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
          Item: appData
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
        new PutCommand({
          TableName: applicationTable,
          Item: application
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
          TableName: adminTable,
          Key: {
            email
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
