import courses from '../routes/courses';
import config from 'config';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import {log} from '../middleware/logger';
const app = express();


// configuration
console.log(`Application Name:  ${config.get('name')}`);

/* 3rd-party middleware */
app.use(helmet());
if (app.get('env') === 'development'){
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

/* built-in middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


/* custom middleware */
app.use(log);
app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

app.use('/api/courses', courses);

app.get('/', (req,res) => {
  res.send('My first express app');
});


// set port environment variable
const port = process.env.PORT || 4000;

// listen at port for the sender
app.listen(port, () => console.log(`Listening on port ${port}...`));