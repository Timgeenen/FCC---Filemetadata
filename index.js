var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = require('./upload');

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    res.json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  }
  catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
