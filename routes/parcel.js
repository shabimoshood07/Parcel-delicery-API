
const express = require('express')
const router = express.Router()
const{
    createParcel,
    getAllParcel,
    getUserParcel,
    updateDestination,
    updateStatus,
    updateLocation,
    deleteParcel
} = require('../controllers/parcels')

const {adminAuth, userAuth} = require('../middleware/authentication')

const {auth} = require("../middleware/authentication")


router.post('/', auth, userAuth, createParcel)

router.get('/', auth, adminAuth, getAllParcel)

router.get('/user',auth, userAuth , getUserParcel)

router.put('/:id/destination', auth, userAuth, updateDestination)

router.put('/:id/status', auth, adminAuth, updateStatus)

router.put('/:id/presentLocation', auth, adminAuth, updateLocation)

router.delete('/:id/delete', auth, deleteParcel)



module.exports  = router