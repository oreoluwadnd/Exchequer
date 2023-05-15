const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: 'Exchequer',
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// process.on('unhandledRejection', (err) => {
//   console.log(err.name, err.message);
//   console.log('UnhandledRejection! SHUTTING DOWN');
//   server.close(() => {
//     process.exit(1);
//   });
// });
process.on('SIGTERM', (err) => {
  console.log(err.name, err.message);
  console.log('SIGTERM RECEIVED! SHUTTING DOWN NICELY');
  server.close(() => {
    console.log('Process terminated!');
  });
});
