import UsersModel from "../model/UsersModel.js";
import { TokenEncode } from "../utility/tokenUtility.js";


export const registrationUser = async (req, res) => {
  try {
    let reqBody = req.body;
    await UsersModel.create(reqBody)
    return res.json({ status: "success", "Message": "User registered successfully" })
  } catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }
}

export const loginUser = async (req, res) => {

  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne(reqBody);
    if (data === null) {
      //Cookies Option
      let cookieOption = { expires: new Date(Date.now() - 24 * 60 * 60 * 1000), httpOnly: false };

      //Set Cookies with Response
      res.cookie('token', "", cookieOption);
      return res.json({ status: "fail", "Message": "User not found" })

    }
    else {
      let token = TokenEncode(data['NIDNumber'], data['_id']);

      //Cookies Option
      let cookieOption = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: false };

      //Set Cookies with Response
      res.cookie('token', token, cookieOption);
      return res.json({ status: "success", Token: token, "Message": "User Login successfully" })
    }


    //await UsersModel.create(reqBody)

  } catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }

}

export const getOneProfile = async (req, res) => {

  try {
    let user_id = req.headers['user_id'];
    let data = await UsersModel.findOne({ "_id": user_id })
    return res.json({ status: "success", "Message": "User ProfileDetails successfully", data: data })
  }
  catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }

}

export const getAllProfiles = async (req, res) => {

  try {
    let user_id = req.headers['user_id'];
    let data = await UsersModel.find();
    return res.json({ status: "success", "Message": "All User ProfileDetails successfully", data: data })
  }
  catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }

}

export const updateProfile = async (req, res) => {

  try {
    let reqBody = req.body;
    let user_id = req.headers['user_id'];
    await UsersModel.updateOne({ "_id": user_id }, reqBody);

    return res.json({ status: "success", "Message": "User Update successfully" })
  }
  catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }



}

export const deleteUser = async (req, res) => {

  try {
    let user_id = req.headers['user_id'];
    await UsersModel.deleteOne({ "_id": user_id })
    //Cookies Option
    let cookieOption = { expires: new Date(Date.now() - 24 * 60 * 60 * 1000), httpOnly: false };

    //Set Cookies with Response
    res.cookie('token', "", cookieOption);
    return res.json({ status: "success", "Message": "User delete successfully" })
  }
  catch (err) {
    return res.json({ status: "fail", "Message": err.toString() })
  }

}





