const express = require('express');
const app = express();
const {rateLimit} = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

app.use(limiter)
app.use(express.json());
app.use(cookieParser());

require('dotenv').config();

const port = process.env.PORT || 5000;
app.listen(port, ()=> 
console.log(`Server started on port number ${port}`)
)

app.get('/',(req,res)=>{
    res.json({
        message : 'welcome to speer'})
})

const dbConnection = require('./Config/Database');
dbConnection();

const authRoute = require('./Routes/Auth');
const notesRoute = require('./Routes/Notes');
const searchRoute = require('./Routes/Search');

app.use('/api/auth',authRoute);
app.use('/api/notes',notesRoute);
app.use('/api/search',searchRoute);

module.exports = app;