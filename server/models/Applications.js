import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "Available" },
  type: { type: String, default: "Applications" },
  merged: { type: Boolean, default: false },
  mergedBy: { type: String, default: null},
  mergedAt: { type: Date, default: null},
  description: { type: String, default: 'No description provided'},
  repositoryLink: { type: String }

})

export const Applications = mongoose.model("Applications", applicationSchema)
