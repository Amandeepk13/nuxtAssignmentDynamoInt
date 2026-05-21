import { Applications } from "../models/Applications";
import { Admin } from "../models/adminSchema";

export const dbOperations = {

  async getApp() {
    return await Applications.find();
  },

  async findByName( name ){
    return await Applications.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
  },


  async createApp({ name, type, description, repositoryLink }) {

    const newApplication = new Applications({
      name,
      type,
      description,
      repositoryLink
    });

    return await newApplication.save();

  },

  async saveApp(application){
    return await application.save();
  },
  
  async findAdmin(email){
    return await Admin.findOne(email)
  }
};
