import Wallet from "../../model/wallet/wallet.js"

export const addWallet = async (req, res) => {
    try {
        let data = await new Wallet(req.body);
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get all all wallets
export const allWallets = async (req, res) => {
    try {
        let data = await Wallet.find();

        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}