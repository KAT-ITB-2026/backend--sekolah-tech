import { OpenAPIHono } from '@hono/zod-openapi';

import { bookRouter } from './book.controller';
import { healthRouter } from './health.controller';
import { libraryRouter } from './library.contollers';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', libraryRouter);
unprotectedApiRouter.route('/', bookRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
