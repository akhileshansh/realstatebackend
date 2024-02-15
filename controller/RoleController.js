const Role = require('../model/Role');

const Store = async (req, res) => {
    try {
        const { role_name } = req.body;
        const existingRole = await Role.findOne({ role_name });
        if (existingRole) {
            return res.status(400).json({ error: 'Role already exists' });
        }
        const newRole = new Role({role_name});
        await newRole.save();
        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getall= async (req,res)=>{
    try {
        const roles = await Role.find(); 
        res.status(200).json({ roles });
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { Store,getall};
