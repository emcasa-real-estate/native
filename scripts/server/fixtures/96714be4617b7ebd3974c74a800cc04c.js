var path = require("path");

/**
 * POST /graphql_api
 *
 * host: localhost:4000
 * accept: * / *
 * content-type: application/json
 * user-agent: EmCasa/1 CFNetwork/893.14 Darwin/16.7.0
 * connection: keep-alive
 * cookie: _re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o
 * accept-language: en-us
 * authorization: Token eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJSZSIsImV4cCI6MTUzMzMzMzg5MCwiaWF0IjoxNTMwNzQxODkwLCJpc3MiOiJSZSIsImp0aSI6Ijc2MGMwZmYwLTFkODUtNDFjOC1hMGFjLTQxZGQ3YTNhZjMzZSIsIm5iZiI6MTUzMDc0MTg4OSwic3ViIjoiMjE1IiwidHlwIjoiYWNjZXNzIn0.Af7SrjB_59VWU9B6KqOo4g5yL0F-ohhSu9qIVjge0qLjIp2JM9ME4G58Pbsb2lL6B1SaNSZ1PbmRc4tB-KjEPAbhAE9L4z6-dVtGD98GaRaAg0JDNRfnKaLn2ksbP-At2Yu9MBsVJ7MwoDtciECsDuW9M7EG3KmeOWekth9evN6gQzLW
 * content-length: 151
 * accept-encoding: gzip, deflate
 */

module.exports = function (req, res) {
  res.statusCode = 200;

  res.setHeader("server", "Cowboy");
  res.setHeader("date", "Wed, 04 Jul 2018 22:09:07 GMT");
  res.setHeader("content-length", "67");
  res.setHeader("set-cookie", ["_re_key=SFMyNTY.g3QAAAABbQAAABJfdGltYmVyX3Nlc3Npb25faWRtAAAAIGFjNzE4ZTRjYzFhZGExODI5MWIzYjA1NjU3N2IwMWY3.5Ao8hz5vG8DELGkyGx5FenaDqVGXhxa20nHd8W1PT2o; path=/; HttpOnly"]);
  res.setHeader("cache-control", "max-age=0, private, must-revalidate");
  res.setHeader("x-request-id", "6pfgeigp9erum1k3jvuvt6f1qc0gl6lt");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-expose-headers", "");
  res.setHeader("access-control-allow-credentials", "true");
  res.setHeader("content-type", "application/json; charset=utf-8");

  res.setHeader("x-yakbak-tape", path.basename(__filename, ".js"));

  res.write(new Buffer("eyJkYXRhIjp7ImZhdm9yaXRlZExpc3RpbmdzIjpbeyJpZCI6Ijg3IiwiX190eXBlbmFtZSI6Ikxpc3RpbmcifV19fQ==", "base64"));
  res.end();

  return __filename;
};
