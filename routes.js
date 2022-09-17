function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Assignment</title></head>");
    res.write(
      "<body><form action='/create-user' method='POST'><input type='text' name='username' /><button type='submit'>Create User</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Assignment Users</title></head>");
    res.write("<body><ul><li>User 1</li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      return res.end();
    });
  }
  res.write("<html>");
  res.write("<head><title>Page 404</title></head>");
  res.write("<body><h1>Page not Found!</h1></body>");
  res.write("</html>");
  res.end();
}

module.exports = requestHandler;
