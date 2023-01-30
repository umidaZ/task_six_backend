import express from "express";
import bodyParser from "body-parser";
import { User, Message } from "./db/db.js";

const app = express();
const port = 8080;

mongoose.connect(
  "mongodb+srv://Umida02:Ism73770213@cluster0.o7lhf.mongodb.net/?retryWrites=true&w=majority/task_six"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/all_users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  const users = await User.find({
    name: req.body.name,
  });
  try {
    if (users.length > 0) {
      res.json("user already exists");
    } else {
      let newUser = new User({
        name: req.body.name,
      });
      newUser.save((e) => console.log(e));
      const user = await User.find();
      res.json("user created");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/sender", async (req, res) => {
  try {
    const user = await User.find({
      name: req.body.name,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get_users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/get_user", async (req, res) => {
  try {
    const user = await User.find(req.body.userName);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/get_sender", async (req, res) => {
  try {
    res.json({ sender });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/receiver", async (req, res) => {
  try {
    const receiver = User.find({ name: req.body.recipient });
    User.findOneAndUpdate(
      { name: req.body.recipient },
      { $push: { received: req.body.email } },
      () => {
        console.log("message sended to recipient");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.patch("/sender", async function (req, res) {
  try {
    const sender = User.find({ name: req.body.sender });
    User.findOneAndUpdate(
      { name: req.body.sender },
      { $push: { sent: req.body.email } },
      () => {
        console.log("message saved to sender");
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.post("/new_message", async function (req, res) {
  try {
    let newMessage = new Message(req.body.email);
    newMessage.save((e) => console.log(e));
    res.json(req.body);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("working on port: " + port);
});

app.get("/", (req, res) => {
  res.send("welcomee to My page");
});
