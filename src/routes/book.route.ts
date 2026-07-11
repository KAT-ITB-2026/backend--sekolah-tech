import { createRoute } from '@hono/zod-openapi';
import {
  GetBookByIdParamsSchema,
  GetBookByIdResponseSchema,
  GetBooksQuerySchema,
  GetBooksResponseSchema,
  CreateBookBodySchema,
  CreateBookResponseSchema,
} from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getBooksRoute = createRoute({
  operationId: 'getBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: GetBooksQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBooksResponseSchema,
        },
      },
      description: 'Successfully fetched books',
    },
    400: createErrorResponse('VALIDATION', 'Validation error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookByIdRoute = createRoute({
  operationId: 'getBookById',
  tags: ['books'],
  method: 'get',
  path: '/books/{id}',
  request: {
    params: GetBookByIdParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookByIdResponseSchema,
        },
      },
      description: 'Successfully fetched book by id',
    },
    400: createErrorResponse('VALIDATION', 'Validation error'),
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const createBookRoute = createRoute({
  operationId: 'createBook',
  tags: ['books'],
  method: 'post',
  path: '/books',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateBookBodySchema,
        },
      },
    },
  },
  responses: {
    // 201: Successfully created (Sesuai panduan di PDF halaman 9)
    201: {
      content: {
        'application/json': {
          schema: CreateBookResponseSchema,
        },
      },
      description: 'Successfully created a new book',
    },
    400: createErrorResponse('VALIDATION', 'Validation error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});