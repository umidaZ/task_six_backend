import { connect, model, mongoose } from "mongoose";

const { Schema } = mongoose;
import moment from "moment/moment.js";

mongoose.set("strictQuery", false);

connect("mongodb://127.0.0.1:27017/email");
const genId = () => {
  return uuidv4();
};
export const Users = new Schema({
  name: String,
  received: {
    type: Array,
  },
  sent: {
    type: Array,
  },
  date: { type: Date, default: Date.now },
});

export const Messages = new Schema({
  customId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  sender: {
    type: String,
    require: true,
  },
  reciever: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
    default: false,
  },
  date: {
    type: String,
    require: true,
    default: moment().format("LLL"),
  },
});

export const Message = mongoose.model("Message", Messages);

export const User = mongoose.model("User", Users);
