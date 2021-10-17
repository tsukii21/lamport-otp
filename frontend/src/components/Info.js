export default function Info({ nonce, sessionKey, recievedNonce, rNonce }) {
  return (
    <div className="bg-white rounded border p-5 ml-5 w-96">
      <p className="text-center p-2 font-bold">Info</p>
      Nonce sent: {nonce} <br />
      Recieved Nonce: {recievedNonce} <br />
      Session Key: {sessionKey} <br />
      Bob's Nonce: {rNonce}
    </div>
  );
}
