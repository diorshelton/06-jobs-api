const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: {
    type:String,
    required:[true, "Please provide a title"],
    maxLength: 50
  },
  message: {
    type: String,
    required:[true, "Please add a message"],
    maxLength:50,
  },
  createdBy: {
    type:mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, "Please provide a user"]
  },
  visible:{
    type: Boolean,
    default: true,
  }
}, {timestamps:true})

module.exports = mongoose.model('Post', PostSchema)