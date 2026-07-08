import { OpenAPIHono } from '@hono/zod-openapi';

import { bookRouter } from './book.controller.js';
import { healthRouter } from './health.controller.js';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);

apiRouter.route('/', bookRouter);
