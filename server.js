require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const verifyToken = require('./middleware/verifyToken');
const connectDB = require('./config/dbConnection');
const login = require('./controllers/authController');
const todoRouter = require('./routes/todoRoutes');
const projectRouter = require('./routes/projectRoutes');
const PORT = process.env.PORT || 3500;

const app = express();
connectDB();
app.use(express.json());
app.use(cors());

// const useEmulator = process.env.NODE_ENV === 'production' ? false : true;
// if (useEmulator) {
//     process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
// }


admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
});

app.get('/api/v1/auth', verifyToken, login);
app.use('/api/v1/todos', verifyToken, todoRouter);
app.use('/api/v1/projects', verifyToken, projectRouter);

app.all('*', (req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log(`Connected to mongoDB`);
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}....`);
    });
});
