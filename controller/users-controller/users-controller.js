import User from "../../model/users/users.js"
import sendToken from "../../utils/jwtToken.js";

import ApiFeatures from "../../utils/apiFeatures.js";


// add new user
export const addUser = async (req, res) => {
    try {
        let { email } = req.body
        let exist = await User.findOne({ email });
        if (exist) {
            res.json({
                success: false,
                message: "user already exist",
                exist
            })
            return
        }
        else {
            let data = await new User(req.body).save()

            res.json({
                success: true,
                data
            })
            // sendToken(data, res);
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "cannot add new user",
            error: `${error.message}`
        })
    }
}

// get all users
export const allUsers = async (req, res) => {
    try {
        // let searchField = req.query.name;
        // let data = await User.find({
        //     firstName: {
        //         $regex: searchField,
        //         $options: 'i'
        //     }
        // });
        // res.json({
        //     success: true,
        //     data
        // })


        const resultPerPage = 4;
        const count = await User.countDocuments();
        // let data = await User.find();

        // const apiFeatures = new ApiFeatures(User.find(), req.query).search().filter().pagination(resultPerPage);
        // console.log("user query from controller ", req.query)
        const apiFeatures = new ApiFeatures(User.find(), req.query).search().pagination(req.query.pageNumber, req.query.pagesSize);

        let users = await apiFeatures.query
        // let filteredUserCount = users.length // here we get the length of filter products
        // apiFeatures.pagination(resultPerPage);

        // users = await apiFeatures.query;

        res.status(200).json({ success: true, users, count, resultPerPage })


    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// get user by userId
export const getUser = async (req, res) => {
    try {
        let data = await User.findById(req.params.userId)
        console.log("req.params.id ", req.params);
        res.json({
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

// update user info
export const updateUser = async (req, res) => {
    try {
        let exist = await User.findById(req.params.userId);
        if (exist) {
            await User.findByIdAndUpdate(req.params.userId, req.body);

            let data = await User.findById(req.params.userId)
            res.json({
                success: true,
                data
            })
        } else return

    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}

// delete user
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId)
        let data = await User.findById(req.params.userId)
        res.json({
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

// change user status
export const changeUserStatus = async (req, res) => {
    try {
        let data = await User.findById(req.params.userId);
        let { status } = req.body
        if (data) {
            data.active = status
            await data.save();
        }
        let data_ = await User.findById(req.params.userId);
        res.json({
            success: true,
            data_
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: `${error.message}`
        })
    }
}


// asign user role
export const assignRole = async (req, res) => {
    try {
        let { newRole } = req.body;
        let data = await User.findById(req.params.userId)
        data.Role = newRole;
        console.log("new role ", newRole)
        await data.save();
        let data_ = await User.findById(req.params.userId);
        res.json({
            success: true,
            message: "Role assigned successfully",
            data_
        })
    } catch (error) {
        res.status(501).json({ success: false, error: `${error.message}` })
    }
}