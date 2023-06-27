const { returnStaticResource } = require("../api/StaticResource");
const { getCookie } = require("../repositories/index");

function accessController(req, res) {
  console.log("controller");
  if (req.url === "/" && req.method === "GET") {
    returnStaticResource(req, res, false);
    return;
  } else if (
    (req.url.startsWith("/Main") ||
      req.url.startsWith("/House") ||
      req.url.startsWith("/Garden") ||
      req.url.startsWith("/Tropical") ||
      req.url.startsWith("/Medicinal") ||
      req.url.startsWith("/About") ||
      req.url.startsWith("/Help") ||
      req.url.startsWith("/Recommendation") ||
      req.url.startsWith("/Profile")) &&
    req.method === "GET"
  ) {
    if (
      getCookie(req) === null ||
      getCookie(req) === undefined ||
      getCookie(req) === ""
    ) {
      returnStaticResource(req, res, false);
      return;
    } else {
      returnStaticResource(req, res, true);
      return;
    }
  } else if (!req.url.startsWith("/api") && req.method === "GET") {
    returnStaticResource(req, res, true);
    return;
  }
}

// function accessController(req, res) {
//   if (req.url === "/" && req.method === "GET") {
//     returnStaticResource(req, res, false);
//     return;
//   } else if (
//     (req.url.startsWith("/Main") ||
//       req.url.startsWith("/House") ||
//       req.url.startsWith("/Garden") ||
//       req.url.startsWith("/Tropical") ||
//       req.url.startsWith("/Medicinal") ||
//       req.url.startsWith("/About") ||
//       req.url.startsWith("/Help") ||
//       req.url.startsWith("/Recommendation") ||
//       req.url.startsWith("/Profile")) &&
//     req.method === "GET"
//   ) {
//     if (
//       getCookie(req) === null ||
//       getCookie(req) === undefined ||
//       getCookie(req) === ""
//     ) {
//       returnStaticResource(req, res, false);
//       return;
//     } else {
//       returnStaticResource(req, res, true);
//       return;
//     }
//   } else if (!req.url.startsWith("/api") && req.method === "GET") {
//     returnStaticResource(req, res, true);
//     return;
//   }
// }
module.exports = { accessController: accessController };
