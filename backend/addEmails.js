import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from "./routes/routes.js";
import DBconnection from './database/db.js';
import Email from './models/login_email.js'; // Use Email model from login_email.js

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line

app.use('/', router);

app.get('/', (req, res) => {
    res.send('Welcome to the AIMS Portal Backend');
});

// Route to add email manually
app.post('/add-email', async (req, res) => {
    const email = "vishalgargdelhi3434@gmail.com"; // Hardcoded email
    const email_type = "student"; // Hardcoded role

    try {
        const newEmail = new Email({ email, email_type });
        await newEmail.save();
        res.status(201).send('Email and role added successfully');
    } catch (error) {
        res.status(500).send('Error adding email and role');
    }
});

DBconnection();

app.listen(8000, () => {
    console.log("server is listening on port 8000"); 
});