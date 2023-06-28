const { get } = require("http");
const { getUsers, isAnAdmin } = require("../repositories/user");
const { c } = require("tar");

async function showUsers(req, res) {
  try {
    const isAdmin = await isAnAdmin(req);
    console.log("isAdmin", isAdmin);

    if (isAdmin === 1) {
      const users = await getUsers(req);
      console.log("users", users);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } else {
      res.writeHead(403, { "Content-Type": "text/plain" });
      res.end("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
}

module.exports = {
  showUsers: showUsers,
};
