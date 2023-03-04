import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import ventasAPI from './routes/venta.routes';

// config
import config from './config';

// middlewares
import { errorHandler, logErrors, wrapErrors } from './middlewares/errorHandler.middleware';
import notFoundHandler from './middlewares/notFoundHandler';
import {verifyUserPassw} from './middlewares/auth';



// Express initializers
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(verifyUserPassw);
app.use(express.json({ limit: '50mb' }));

ventasAPI(app)

// Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Not Found Handler
app.use(notFoundHandler);

app.listen(config.port, () => {
  console.log(`Server listen on port ${config.port}`);
});
