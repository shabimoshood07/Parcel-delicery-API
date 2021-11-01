const Parcel = require('../models/parcel')
const { BadRequestError, NotFoundError } = require('../errors')

const {StatusCodes} = require('http-status-codes')


const createParcel = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const parcel = await Parcel.create({...req.body})
    res.status(StatusCodes.CREATED).json({parcel})
}

const getAllParcel =async (req,res)=>{

    const parcels = await Parcel.find({})
    res.status(StatusCodes.OK).json({parcels:{parcels}, count:parcels.length})

}


const getUserParcel = async(req,res)=>{

    const parcel = await Parcel.find({createdBy: req.user.userId})
    // const {destination, status} = parcel
    
    res.status(StatusCodes.OK).json({parcel:{parcel}, count:parcel.length})
    
   
}



const updateDestination = async(req,res)=>{

      const {
    body: {destination},
    user: { userId },
    params: { id: parcelId },
    } = req

      if (destination === '' || !destination) {
    throw new BadRequestError('destination fields cannot be empty')
  }
    const parcel = await Parcel.findOneAndUpdate(
    { _id: parcelId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )

    if (!parcel || !parcelId) {
    throw new NotFoundError(`No parcel with id ${parcelId}`)
  }

    res.status(StatusCodes.OK).json({parcel:{parcel}, msg:'destination updated'})
}


const updateStatus = async (req,res)=>{
  const{
    body:{status},
    user:{userId},
    params:{id:parcelId}
  } = req
  if(status === "" || !status){
    throw new BadRequestError('status fields cannot be empty')
  }
  const parcel = await Parcel.findByIdAndUpdate(
    {_id:parcelId}, 
    req.body,
    { new: true, runValidators: true }
  )

    if (!parcel) {
    throw new NotFoundError(`No parcel with id ${parcelId}`)
  }

    res.status(StatusCodes.OK).json({parcel:{parcel}, msg:'status updated'})
}



const updateLocation = async (req,res)=>{
  const {
    body:{presentLocation},
    user:{userId},
    params:{id:parcelId}
  } = req
  if(presentLocation === "" || !presentLocation){
    throw new BadRequestError('location can not be empty')
  }
  const parcel = await Parcel.findByIdAndUpdate(
    {_id : parcelId},
    req.body,
    { new: true, runValidators: true}
  )
  if(!parcel){
     throw new NotFoundError(`No parcel with id ${parcelId}`)
  }
    res.status(StatusCodes.OK).json({parcel:{parcel}, msg:'location updated'})
}

const deleteParcel = async (req,res)=>{
    const{
      user:{userId},
      params:{id:parcelId}
    }=req

  if(req.user.role === "admin"){
    const parcel = await Parcel.findByIdAndDelete({
      _id:parcelId
    })

     if(!parcel){
     throw new NotFoundError(`No parcel with id ${parcelId}`)
  }
  }else if(req.user.role === "user"){
    const parcel = await Parcel.findOneAndDelete(
      {createdBy:userId},
      {_id:parcelId},
      )
       if(!parcel){
     throw new NotFoundError(`No parcel with id: ${parcelId}`)
  }
  }

  
    res.status(StatusCodes.OK).json({msg:'delivery cancelled'})
}

module.exports={
    createParcel,
    getAllParcel,
    getUserParcel,
    updateDestination,
    updateStatus,
    updateLocation,
    deleteParcel
}