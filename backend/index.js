const express = require("express");
const cors = require("cors");
const Cryptr = require("cryptr");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;

const KEY = "jkdsvhkldhvdlkvh";
let session_key = null;
let nonce = null;

const generateNonce = () => {
  const generatedNonce = Math.floor(Math.random() * 1000000 + 1);
  console.log("nonce", generatedNonce);
  nonce = generatedNonce;
  return generatedNonce;
};

const contact1 = (req, res) => {
  const public_cryptr = new Cryptr(KEY);
  const decrypted_req = JSON.parse(public_cryptr.decrypt(req.body.r_copy));
  console.log(decrypted_req);
  session_key = decrypted_req.session_key;
  const session_cryptr = new Cryptr(decrypted_req.session_key);
  const enc_res = session_cryptr.encrypt(generateNonce());
  res.status(200).send(enc_res);
};

const contact2 = (req, res) => {
  const session_cryptr = new Cryptr(session_key);
  const req_nonce = parseInt(session_cryptr.decrypt(req.body.nonce));
  console.log("recieved nonce", req_nonce);
  if (req_nonce === nonce - 1) res.status(200).send("Authorised!");
  else res.status(401).send("Not Authorised!");
};

app.post("/contact1", contact1);
app.post("/contact2", contact2);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
