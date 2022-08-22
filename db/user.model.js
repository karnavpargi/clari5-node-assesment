const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    name: { type: String },
    fName: { type: String },
    lName: { type: String },
    email_verified: { type: Boolean, default: false },
    issuer: { type: String },
    aud: { type: String },
    nbf: { type: String },
    azp: { type: String },
    picture: { type: String },
  },
  { timestamps: true }
);

module.exports = model("user", UserSchema);

/*
iss: "https://accounts.google.com"
nbf: 1661003833
aud: "996832992803-0tpk766dov1c13a89s8fn4m46q3h5ctr.apps.googleusercontent.com"
sub: "111294342099481662194"
email: "karnavkumar@gmail.com"
email_verified: true
azp: "996832992803-0tpk766dov1c13a89s8fn4m46q3h5ctr.apps.googleusercontent.com"
name: "K Pargi"
picture: "https://lh3.googleusercontent.com/a-/AFdZucrqCXVfd6S9TRF2qqLKGMdOkn863mgZNrE7DWTbnj0=s96-c"
given_name: "K"
family_name: "Pargi"
iat: 1661004133
exp: 1661007733
jti: "844f095df8f87fb078cbb9f4d2d94742fe86174c"
*/
