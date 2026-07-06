import { OpenAPIHono } from '@hono/zod-openapi';

import { healthRouter } from './health.controller';

import { bookRouter } from '../routes/book.route';

import { libraryRouter } from '../routes/library.route';

const unprotectedApiRouter = new OpenAPIHono();
unprotectedApiRouter.route('/', healthRouter);
unprotectedApiRouter.route('/books', bookRouter);
unprotectedApiRouter.route('/library', libraryRouter);

const protectedApiRouter = new OpenAPIHono();

export const apiRouter = new OpenAPIHono();
apiRouter.route('/', unprotectedApiRouter);
apiRouter.route('/', protectedApiRouter);
