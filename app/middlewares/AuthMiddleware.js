import { TokenDecode } from "../utility/tokenUtility.js";

export default (req, res, next) => {
  try {
    //Receive Token
    let token = req.headers['token'];
    if (!token) {
      token = req.cookies['token'];
    }

    let decoded = TokenDecode(token);

    if (decoded === null) {
      res.status(401).send({ status: "fail", message: "Unauthorized" });
    }
    else {
      // NIDNumber, user_id pick from decoded token
      let NIDNumber = decoded.NIDNumber;
      let user_id = decoded.user_id;

      // NIDNumber ,user_id add with request header
      req.headers.NIDNumber = NIDNumber;
      req.headers.user_id = user_id;

      next()

    }
  }
  catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }

}