import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/postRoute.js";
import dotenv from 'dotenv';

const app= express();
dotenv.config();
app.use(bodyParser.json({limit: '50mb',  extended: true }))
app.use(bodyParser.urlencoded({limit: '50mb',extended:true}))

app.use(cors());

const PORT=process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL,({ useNewUrlParser: true },{ useUnifiedTopology: true }))
.then(()=> app.listen(PORT,()=>console.log(`server running on port : ${PORT}`)))
.catch((err)=> console.log(` some error occured . Details are : ${err}`))

app.use("/posts",router)

app.get('/',(req,res)=>{
 res.send("Welcome to VS Diary API")
})

mongoose.set('useFindAndModify', false);


////////////////////////////////////////////////////////////////////////////////////////////

// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';

// import postRoutes from './routes/postRoute.js';

// const app = express();

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());

// app.use('/posts', postRoutes);

// const CONNECTION_URL = "mongodb+srv://vinayak:Abhi1234@cluster0.bclys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// const PORT = process.env.PORT|| 5000;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);