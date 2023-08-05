const express = require('express');
const morgan = require('morgan');
const ratelimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const error = require('./middlewares/error');

const userRoute = require('./routes/userRoutes');
const accountRoute = require('./routes/accountRoutes');
const HomeRoute = require('./routes/HomeRoutes');

// Start express app
const app = express();
//trust proxy
app.enable('trust proxy');
//implement cors
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://192.168.37.177:5173'],
    credentials: true,
  })
);
//set security http headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:'],

      fontSrc: ["'self'", 'https:', 'data:'],

      scriptSrc: ["'self'", 'https://*.cloudflare.com'],

      scriptSrcElem: ["'self'", 'https:', 'https://*.cloudflare.com'],

      styleSrc: ["'self'", 'https:', 'unsafe-inline'],

      connectSrc: ["'self'", 'data', 'https://*.cloudflare.com'],
    },
  })
);
//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//limit requests from same api
const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);
//body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
//data sanitization against NoSQL query injection
app.use(mongoSanitize());
//data sanitization against XSS
app.use(xss());
//compress text sent to client
app.use(compression());

app.use(express.json());

app.get('/', HomeRoute);
//routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/account', accountRoute);
app.use(error);
module.exports = app;
