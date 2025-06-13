const User = require('../models/user');


async function handleGetAllUsers(req, res){
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
    const updateUser = await User.findByIdAndUpdate(req.params.id,req.body,
    { last_name: "changed" })
    return res.json({ status: "sucess" });
}

async function handleDeleteUserById(req, res) {
    const DeleteUser = await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success", deletedUser: DeleteUser });
}

async function handleCreateUser(req, res) {
       const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "Required all fields" });
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
    
    return res.status(201).json({ msg: "success", id: result._id });
}



module.exports = {
    handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateUser,
}