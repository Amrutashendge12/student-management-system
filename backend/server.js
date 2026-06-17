const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

pool.connect()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Student Management API Running');
});

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

app.listen(5000, () => {
    console.log('Server Running On Port 5000');
});