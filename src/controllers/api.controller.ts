import { OpenAPIHono } from '@hono/zod-openapi';

import { healthRouter } from './health.controller';
import { bookRouter } from './book.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', bookRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
