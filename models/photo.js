const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  photoID: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
  },
  postedBy:{
    type: String,
    required: true,
  },
  postedTime:{
    type: Date
  },
  comments : [
    {
        commentText : {
            type: String,
            required: true
        },
        commentBy : {
            type: String,
            required: true,
        },
        commentDate : {
            type: String,
            required: true,
        }

    }
  ]
});

module.exports = mongoose.model("photo", photoSchema);