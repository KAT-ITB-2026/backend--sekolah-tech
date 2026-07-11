import { OpenAPIHono } from '@hono/zod-openapi';

import { bookRouter } from './book.controller';
import { healthRouter } from './health.controller';
import { libraryRouter } from './library.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', bookRouter);
unprotectedApiRouter.route('/', libraryRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
