import { OpenAPIHono } from '@hono/zod-openapi';

import { healthRouter } from './health.controller';
import { booksRouter } from './book.controller';
import { libraryRouter } from './library.controller';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/', booksRouter);
unprotectedApiRouter.route('/', libraryRouter);
const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
