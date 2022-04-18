import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
    // active(boolean, optional),
    // amount(number, optional),
    // createdAt(string, optional),
    // customerId(integer, optional),
    // description(string, optional),
    // firstName(string, optional),
    // id(integer, optional),
    // lastName(string, optional),
    // orderId(integer, optional),
    // transactionType(string, optional)

    active: {
        type: Boolean,
        required: true,
        default: false
    },
    amount: {
        type: Number,
        required: true
    },
    customerId: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet