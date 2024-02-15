const User = require('../model/User');

const Store = async (req, res) => {
    try {
        const { username,email,password,firstName,lastName,phoneNumber,address,role_id } = req.body;
        const existingRole = await User.findOne({ email:email });
        if (existingRole) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = new User({username,email,password,firstName,lastName,phoneNumber,address,role_id});
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
         // Check if the error is a duplicate key error
         if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            const errorMessage = `Duplicate key error. The provided ${field} is already in use.`;
            return res.status(400).json({ error: errorMessage });
        }

        res.status(500).json({ error: 'Internal Server Error',error:error.message });
    }
};

const getall = async (req, res) => {
    try {
        const usersAndAgents = await User.aggregate([
            {
                $lookup: {
                    from: 'roles', // Replace with your actual collection name
                    localField: 'role_id',
                    foreignField: '_id',
                    as: 'userRole',
                },
            },
            {
                $match: {
                    'userRole.role_name': { $in: ['user', 'agent'] },
                },
            },
        ]);

        res.status(200).json({ data:usersAndAgents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
};


module.exports = { Store,getall};
