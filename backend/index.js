const express = require("express");
const cors = require("cors");
const md5 = require("md5");
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const N = 10; //number of initial rounds
let users = []; //array of registered users

//function for hashing pasword N times
const getInitialHash = (password) => {
  let res = password;
  for (var i = 0; i < N; i++) res = md5(res);
  return res;
};

//function of registering new user
//stores username, N and password hashed N times in array
const registerUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    username: username,
    round: N,
    hash: getInitialHash(password),
  };
  users.push(newUser);
  console.log(users);
  res.send("User created!");
};

//function for step 1 for authenticating user
//finds user in array from given username
// and returns that user's round - 1 to client
const loginUserStep1 = (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user) res.status(200).json({ rounds: user.round - 1 });
  else res.status(401).json({ error: "Invalid username" });
};

//function for step 2 for authenticating user
//finds user in array from given username
// and hashes given password 1 time and compares with user's hash
// if matched, authenticates client, decrements round by 1, and sets hash
// to given password
const loginUserStep2 = (req, res) => {
  const { username, password } = req.body;
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex !== -1) {
    if (md5(password) === users[userIndex].hash) {
      users[userIndex].round -= 1;
      users[userIndex].hash = password;
      console.log(users);
      res.status(200).json({ msg: "Authenticated!" });
    } else res.status(401).json({ error: "Invalid password" });
  } else res.status(401).json({ error: "Invalid username" });
};

//routing
app.post("/register", registerUser);
app.post("/login1", loginUserStep1);
app.post("/login2", loginUserStep2);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
