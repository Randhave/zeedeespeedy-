
// creating token and saving into cookie
const sendToken = async (user, tokenName, res) => {
    const token = await user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        credentials: 'include',
        withCredentials: true,
       
        httpOnly: true 
    }
    res.cookie(tokenName, token, options).json({
        success: true,
        user,
        token
    });
};

export default sendToken 