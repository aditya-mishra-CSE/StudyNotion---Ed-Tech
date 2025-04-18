const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");


//hum chahte hai ki backend woh frontend ki request ko entertain kre
const cors = require("cors");

const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();


//Setting up port number
const PORT = process.env.PORT || 5000;

//database connect 
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/",
    })
)

//cloudinary coonnection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default route

app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:'Your server is up and running....'
    })
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})
