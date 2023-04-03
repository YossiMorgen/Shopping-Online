import express from "express";
import appConfig from "./2-utils/AppConfig";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import cors from "cors";
import authController from "./6-controllers/auth-controller";
import productsController from "./6-controllers/products-controller";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import sanitaize from "./3-middleware/sanitaize";
import expressFileUpload from 'express-fileupload'

const server = express();

server.use(expressRateLimit({
    max: 30,
    windowMs: 1000,
    message: "Fuck Of "
}));
server.use(cors({ origin: 'http://localhost:3000' } ));
server.use(helmet({
    crossOriginResourcePolicy: {
        policy: "cross-origin"
    }
}));

server.use( express.json());
server.use(sanitaize);

server.use(express.static('src/1-assets/images'))
server.use(express.urlencoded({ extended: false }));

server.use('/api', authController);

server.use(expressFileUpload());
server.use('/api', productsController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening to http://localhost:${appConfig.port}`))