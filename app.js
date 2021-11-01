require('dotenv').config();
require('express-async-errors');

// security
const cors = require('cors');

// Swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// connect DB
const connectDB = require('./db/connect')


const express =require('express')
const app = express()

// Router
const authRouter = require('./routes/auth')
const parcelRouter = require('./routes/parcel')

// middleware
// error handler
const errorHandlerMiddleware = require('./middleware/error-handler'); 
const notFoundMiddleware = require('./middleware/not-found');



app.use(express.json())
app.use(cors());


app.get('/', (req, res) => {
  res.send('<h1>Parcel delivery API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
app.use('/api/v1/auth', authRouter )
app.use('/api/v1/parcels', parcelRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000; 

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();