const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Role Schema
const roleSchema = new Schema({
    role_name: {
        type: String,
        required: true,
        unique: true,
    },
});

// Create the Role model
const Role = mongoose.model('Role', roleSchema);

// Export the Role model
module.exports = Role;
