

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const apiRouter = require('./routes/index');
require('dotenv').config();

const app = express();

app.use(cors())
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  
  
  app.use(express.json());


app.use('/api', apiRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
