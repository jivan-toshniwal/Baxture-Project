require('dotenv').config({ path: 'config.env' });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AppError = require('./Error/AppError');
const { globalErrorHand } = require('./Error/GlobalError');

app.use(express.json());

// ROUTE
const userRoute = require('./Routs/userRoute');

app.use('/api/users', userRoute);

// MONGOOSE
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('Connected to MONGODB!'))
  .catch((err) => console.log('Mongoose:', err));

// ALL OTHER ROUTE
app.all('*', (req, res, next) => {
  next(new AppError(`The Url ${req.originalUrl} not found on server!`, 404));
});

// GLOBAL ERROR HANDLER
app.use(globalErrorHand);

const port = process.env.PORT || 4100;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
