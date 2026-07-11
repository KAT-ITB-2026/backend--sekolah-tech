import { createRoute, z } from '@hono/zod-openapi';
import {
  BookSchema,
  CreateBookBodySchema,
  GetBookParamsSchema,
  LibraryStatusSchema,
  UpdateBookBodySchema,
  deleteBookResponseSchema,
} from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getListBooksRoute = createRoute({
  operationId: 'getListBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.array(BookSchema),
        },
      },
      description: 'Successfully fetched list of books',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookByIdRoute = createRoute({
  operationId: 'getBookById',
  tags: ['books'],
  method: 'get',
  path: '/books/{id}',
  request: {
    params: GetBookParamsSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: BookSchema } },
      description: 'Successfully fetched book',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
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
    201: {
      content: { 'application/json': { schema: BookSchema } },
      description: 'Successfully created book',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const updateBookRoute = createRoute({
  operationId: 'updateBook',
  tags: ['books'],
  method: 'patch',
  path: '/books/{id}',
  request: {
    params: GetBookParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: UpdateBookBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: BookSchema } },
      description: 'Successfully updated book',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteBookRoute = createRoute({
  operationId: 'deleteBook',
  tags: ['books'],
  method: 'delete',
  path: '/books/{id}',
  request: {
    params: GetBookParamsSchema,
  },
  responses: {
    200: {
      content: { 'application/json': { schema: deleteBookResponseSchema } },
      description: 'Successfully delete book',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getLibraryStatusRoute = createRoute({
  operationId: 'getLibraryStatus',
  tags: ['books'],
  method: 'get',
  path: '/library/status',
  responses: {
    200: {
      content: { 'application/json': { schema: LibraryStatusSchema } },
      description: 'Successfully fetched library status',
    },
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
