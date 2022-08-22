/*
1. The applicaton should return JWT  with following fileds in the claim;
  aud - tenant name (like XYZ-UAT, XYZ, XYZ-PROD),
  nbf - the token cannot be used before this date,
  exp - expiry in months,
  sub - comma separated list of whitelisted ip address,
  and finally iss - the issuer email id.
  Provide an UI to accept these fields and the UI should call backend API which with all return the JWT token.
  Take care of improper inputs and all errors.

2. Provide an api name /authorize which allow only GET method and the query parameter should be tenant name.
  it should return the tenant properties which has been used in #1 above to create the token.
  again take care of invalid inuts and invalid tenant

 // Optionally for req#1 login using google sso and the same email id should be used  for claim "iss"

*/
