const express = require("express");
const cors = require("cors");
const app = express();
const Cryptr = require("cryptr");
const randomstring = require("randomstring");
app.use(cors());
app.use(express.json());
const port = 5000;

//KDC database
let users = [
  {
    username: "Alice",
    key: "sjkbckasjdbvldj",
  },
  {
    username: "Bob",
    key: "jkdsvhkldhvdlkvh",
  },
];

//function to send session key
const sendSessionKey = (req, res) => {
  console.log(req.body);
  const { username, r_username, nonce } = req.body;
  const A = users.find((user) => user.username === username);
  const B = users.find((user) => user.username === r_username);
  if (A && B) {
    const session_key = randomstring.generate();
    console.log("session_key", session_key);
    const B_copy = { username: username, session_key: session_key };
    const cryptrB = new Cryptr(B.key);
    const enc_B_copy = cryptrB.encrypt(JSON.stringify(B_copy));
    const response = {
      nonce: nonce,
      r_username: r_username,
      session_key: session_key,
      r_copy: enc_B_copy,
    };
    const cryptrA = new Cryptr(A.key);
    const enc_res = cryptrA.encrypt(JSON.stringify(response));
    res.status(200).send(enc_res);
  } else res.status(401).json({ error: "invalid usernames" });
};

app.post("/session-key", sendSessionKey);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
