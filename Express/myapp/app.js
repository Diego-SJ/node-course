const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const { stat, createReadStream } = require('fs');
const { promisify } = require('util');
const upload = require('./middleware/uploadMiddleware');

const fileInfo = promisify(stat);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const exampleRouter = require('./routes/example');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ====================================
// CUSTOM PUBLIC FOLDERS
// ====================================
app.use(express.static('files'));

// ====================================
// DOWNLOAD FILE
// ====================================
app.get('/download/:user_name', (req, res) => {
  const streamWriting = fs.createWriteStream(`${__dirname}/files/myFile2.txt`);
  streamWriting.write(
    `Dear ${req.params.user_name}: your doc is ready.`,
    () => {
      res.download(`${__dirname}/files/myFile2.txt`, (error) => {
        if (error) {
          res.status(400).render('error');
        } else {
          res.status(200).render('success');
        }
      });
    },
  );
});

// ====================================
// OLD PAGE
// ====================================
app.use((req, res, next) => {
  let currentUrl = req.originalUrl;
  if (currentUrl === '/old-page') {
    res.redirect(301, 'https://www.google.com');
  }
  return next();
});

// ====================================
// PROVIDE STATIC VIDEO
// ====================================
app.use('/videoStatic', (req, res, next) => {
  const videoFile = `${__dirname}/public/video/video.mp4`;
  res.type('video/mp4');
  res.sendFile(videoFile);
});

// ====================================
// PROVIDE STREAM VIDEO
// ====================================
app.use('/videoStream', (req, res, next) => {
  const videoFile = `${__dirname}/public/video/video.mp4`;
  res.writeHead(200, {
    'Content-Type': 'video/mp4',
  });
  createReadStream(videoFile).pipe(res);
});

// ====================================
// PROVIDE STREAM VIDEO WITH RANGE
// ====================================
app.use('/videoStreamRange', async (req, res, next) => {
  const videoFile = `${__dirname}/public/video/video.mp4`;
  const { size } = await fileInfo(videoFile);
  const range = req.headers.range;

  if (range) {
    let [start, end] = range.replace(/bytes=/, '').split('-');
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;

    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${size}`,
    });
    createReadStream(videoFile, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': 'video/mp4',
      'Content-Length': size,
    });
    createReadStream(videoFile).pipe(res);
  }
});

// ====================================
// FORM ROUTE
// ====================================
app.post('/confirm', (req, res, next) => {
  res.render('formResult', { data: req.body });
});

// ====================================
// FORM ROUTE FOR FILE
// ====================================
app.post('/sendFiles', upload.single('image'), (req, res, next) => {
  try {
    console.log(req);
  res.render('formResultFile', { data: req.body, files: req.file });
  } catch (error) {
    console.log(error);
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/example', exampleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
