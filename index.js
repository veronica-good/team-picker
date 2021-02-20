const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const knex = require('./db/client')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // setting configuration for express letting it know to use EJS as our templating engine

app.use(express.urlencoded({ extended: true }));

// Method Override
app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
    const method = req.body._method;
    return method;
  }
}))

app.use(cookieParser()); // will parse cookies and put them on request.cookies
// app.use is a method used to mount middleware
app.use(logger('dev')); // add logging middleware
app.get('/', (req, res)=>{
  res.render('home')
})
// ------------
// POST ROUTES
// ------------

const cohortRouter = require('./routes/cohorts');
app.use('/cohorts', cohortRouter);

const ADDRESS = 'localhost'; // the loopback address this is your home for your machine. The IP is 127.0.0.1
const PORT = 3600;
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on ${ADDRESS}:${PORT}`);
});