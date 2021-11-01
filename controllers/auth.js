const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const signup = async (req,res)=>{

    const user  = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name, role:user.role, email:user.email, userId:user._id}, token})
}


const login = async (req,res)=>{
    const {email,password} = req.body

    
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

    const user = await User.findOne({email})

   if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

   const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

    const token = user.createJWT()

  res.json({user:{name:user.name, email:user.email, role:user.role}, token})
}


module.exports = {
    signup,
    login
}