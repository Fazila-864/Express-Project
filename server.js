require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db.js')

const app = express();

const PORT = Number(process.env.PORT) || 5000;
connectDB();

app.use(cors());
// app.use(express.json());
app.use('/api/categories', require('./routes/categoryRoutes.js'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', require('./routes/ProductRoutes.js'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));