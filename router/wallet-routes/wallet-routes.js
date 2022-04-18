import express from 'express';
import { addWallet, allWallets } from '../../controller/wallet-controller/wallet-controller.js';

const walletRoutes = express.Router();

walletRoutes.post("/", addWallet);

walletRoutes.get("/", allWallets)


export default walletRoutes