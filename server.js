// ===== Server
// import all modules
const express       = require('express');
const dotenv        = require('dotenv');
const cors          = require('cors');
const helmet        = require('helmet');
const compression   = require('compression');
const morgan        = require('morgan');
const db            = require('./app/core/db');

// setup dotenv
dotenv.config({ path: "./.env"});

// init port
const port          = process.env.PORT || 3000;

// init app
const app           = express();

// setup url encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup cors
const whiteList     = [
  'http://127.0.0.1:3000'
];

const corsOpt       = {
  origin: function(origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin)
      callback(null, true);
    else 
      callback(new Error("Not Allowed By Cors"));
  }
};

app.use(cors(corsOpt));

// setup helmet, compression & morgan
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));

// sync database (membuat table baru, ketika table nya belum ada)
db.posts.sync();
/*
  Untuk synch database
  sekaligus menghapus dan
  membuat ulang table dari model.

  db.posts.sync({ force: true })
    .then(response => {
      cetak response
    })
    .catch(err => {
      cetak err
    })
*/

app.use('/api', require('./app/routes/pages'));

app.listen(port, () => {
  console.log(`Magic happen at http://127.0.0.1:${port}`);
});
