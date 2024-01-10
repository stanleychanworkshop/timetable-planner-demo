const express = require('express');
const logger = require('./middleware/logger');
var cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(cors());

// DB connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dev_db_url = 'mongodb+srv://plannerdemo:plannerdemopw@cluster0.dtfzvds.mongodb.net/plannerdemo?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

// Initialize the middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression());

// Set CSP headers to allow our Bootstrap to be served
app.use(
    helmet.contentSecurityPolicy({
        directives: {
        "script-src": ["'self'", "cdn.jsdelivr.net"],
        },
    }),
);

// Set up rate limiter: maximum of 60 requests per minute
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60,
});

// Apply rate limiter to all requests
app.use(limiter);

app.use('/api/users', require('./routes/api/users'));
app.use('/api/raw', require('./routes/api/raw'));

// Ref: https://docs.railway.app/troubleshoot/fixing-common-errors
const PORT = process.env.PORT || 3500;
app.listen(PORT, `0.0.0.0`, () => console.log(`Server started on port ${PORT}!!!`));

// const PORT = 3500;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}!!!`));