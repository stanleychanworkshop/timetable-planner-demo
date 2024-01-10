const express = require('express');
const logger = require('./middleware/logger');
var cors = require('cors');

const app = express();

app.use(cors());

// DB connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = 'mongodb+srv://plannerdemo:plannerdemopw@cluster0.dtfzvds.mongodb.net/plannerdemo?retryWrites=true&w=majority';
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/raw', require('./routes/api/raw'));

// Ref: https://docs.railway.app/troubleshoot/fixing-common-errors
// const PORT = process.env.PORT || 3500;
// app.listen(PORT, `0.0.0.0`, () => console.log(`Server started on port ${PORT}!!!`));

const PORT = 3500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));