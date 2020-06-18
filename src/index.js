import courseRoutes from '../routes/courses';
import config from 'config';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import logger from '../middleware/logger';
import {log} from 'console';
const app = express();


/* configuration */
log(`Application Name:  ${config.get('name')}`);

/* 3rd-party middleware */
app.use(helmet());
if (app.get('env') === 'development'){
  app.use(morgan('tiny'));
  log('Morgan enabled...');
}

/* built-in middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


/* custom middleware */
app.use(logger);
app.use((req, res, next) => {
  log('Authenticating...');
  next();
});

app.use('/api/courses', courseRoutes);

app.get('/', (req,res) => {
  res.send('My first express app');
});


/* set port environment variable */
const port = process.env.PORT || 4000;

/* listen at port for the sender */
app.listen(port, () => log(`Listening on port ${port}...`));