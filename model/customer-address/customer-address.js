import mongoose from 'mongoose'

const customerAddressSchema = new mongoose.Schema({
    // active(boolean, optional),
    // addressOf(string, optional),
    // buildingName(string, optional),
    // cityId(integer, optional),
    // countryId(integer, optional),
    // customerId(integer, optional),
    // defaultAddress(boolean, optional),
    // firstName(string, optional),
    // id(integer, optional),
    // landmark(string, optional),
    // lastName(string, optional),
    // latitude(number, optional),
    // longitude(number, optional),
    // phoneNumber(string, optional),
    // pincodeId(integer, optional),
    // stateId(integer, optional),
    // streetNo(string, optiona
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    addressOf: {
        type: String,
        // required: true,
        default: "Customer"
    },
    buildingName: {
        type: String,
        required: true
    },
    cityId: {
        type: String,
        required: true
    },
    countryId: {
        type: String,
        required: true
    },
    customerId: {
        // type: mongoose.Schema.ObjectId,
        // ref: "Customer",
        type: String,
        required: true
    },
    defaultAddress: {
        type: Boolean,
        default: true
    },
    firstName: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique : true
    },
    pincodeId: {
        type: Number,
        required: true
    },
    stateId: {
        type: Number,
        required: true
    },
    streetNo: {
        type: String
    },
    cretedAt: {
        type: Date,
        default: Date.now()
    }
})

const CustomerAddress = mongoose.model("customerAddress", customerAddressSchema)


export default CustomerAddress