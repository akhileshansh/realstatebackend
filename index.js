const express = require("express");
const app= express();
const env=require('dotenv').config();
const PORT=process.env.PORT||4000
const database= require("./config/database");
const RoleRoute=require("./routes/roleroute")
const UserRoute=require("./routes/userroute")
database();

app.use(express.json());
app.use('/api/role',RoleRoute);
app.use('/api/user',UserRoute);
app.listen(PORT,()=>{
    console.log(`Server runing on PORT ${PORT}`)
})