const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path: './Config/config.env'
})

connectDatabase()

const app = express();
// app.use(cors(
//     {
//         origin: ["https://tailored-tails-frontend.vercel.app"],
//         methods:["POST", "GET"],
//         credentials: true
//     }
// ));
const nodemailer = require('nodemailer');
app.use(express.json())
app.use(cors())

app.use("/", IndexRoute)

app.use(customErrorHandler)

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")))

app.post('/api/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a nodemailer transporter with your email service provider details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'coolcoder201@gmail.com',
            pass: '123123123',
        },
    });

    // Define the email options
    const mailOptions = {
        from: email,
        to: "coolcoder201@gmail.com",
        subject: 'Dog Care',
        text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});

const server = app.listen(PORT, () => {

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

})

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error : ${err}`)

    server.close(() => process.exit(1))
})
