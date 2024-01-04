const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json({ extended : false }));

// Connect the database
connectDB();
const PORT = process.env.PORT || 5000;

app.use('/todos', require('./route/api/users'));
app.use('/api/auth', require('./route/api/auth'));


app.get('/', (req,res) => {
    res.send("API running");
})
app.listen(PORT, () => {
    console.log(` Server started on port ${PORT}`);
});