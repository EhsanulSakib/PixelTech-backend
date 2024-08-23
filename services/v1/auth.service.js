const User = require("../../models/v1/user.model")
const sendPasswordResetEmail = require("../../utils/emails/sendEmailUpdateMail.util")
const sendConfirmationEmail = require("../../utils/emails/emailConfirm.util")
const token = require("../../utils/token.util")

exports.accountRegistration = async (req, res, next) => {
  try{
    const filter = {}

    if(req.body.email){
      filter.email = req.body.email
    }

    if(req.body.socialId){
      filter.socialId = req.body.socialId
    }

    if(filter){
      const isExist = await User.findOne(filter)
      
      if(isExist && isExist.socialId){
        return res.status(400).json({
          acknowledged: false,
          message: "Account already exist",
          description: "User with this socialId already exist."
        })
      }
      
      else if(isExist && !isExist.socialId){
        return res.status(400).json({
          acknowledged: false,
          message: "Account already exist",
          description: "User with this email already exist."
        })
      }

      console.log(req.body)
      
      if(req.body.socialId){
          try{
            const user = {
              name: req.body.name,
              email: req.body.email||"",
              socialId: req.body.socialId,
              avatar: req.body.image,
              role: "user"
            }
          }
        }

      }
    } catch(error){
    next(error)
    console.log(error)
    }
}