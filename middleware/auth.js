import jwt from 'jsonwebtoken'

export const isAuthenticated = (model, tokenName) => async (req, res, next) => {
    const tokens = req.cookies;
    let accessToken;
    // console.log("cookes response ", tokens)
    try {

        for (let token in tokens) {
            // console.log("key ", token, "value ", tokens[token]);
            // console.log("key ", token, "value ", tokens[tokenName]);
            if (tokenName === token) {
                // console.log("matched ", token, tokenName);
                // console.log("key ", token, "value ", tokens[token]);
                // console.log("key ", token, "value ", tokens[tokenName]);
                accessToken = tokens[tokenName]
                break
            }
        }


        if (!accessToken) {
            throw new Error("Unauthorized : No token provided ! Please login")
        }
        const varifiedToken = jwt.verify(accessToken, process.env.PRIVATE_KEY);
        req.user = await model.findById(varifiedToken.id); // ye line humne iss liye likh di he kyonki agar user login he to uska sara data req.user me se hum access kr skte he

        next();
    } catch (error) {
        console.log("error in auth.s file ", error.message);
        res.status(401).send({ error: `${error.message}`, tokens })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role)) {
            return res.status(501).json({ error: `Role : ${req.user.Role} is cannot access this resource | you are not super admin` })
        }
        next();
    }
}