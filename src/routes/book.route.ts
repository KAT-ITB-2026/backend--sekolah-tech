import { createRoute, z } from '@hono/zod-openapi';

import {
  BookListResponseSchema,
  BookResponseSchema,
  CreateBookResponseSchema,
  CreateBookSchema,
  DeleteBookResponseSchema,
  UpdateBookResponseSchema,
  UpdateBookSchema,
} from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getBooksRoute = createRoute({
  operationId: 'getBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookListResponseSchema,
        },
      },
      description: 'List all books',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookRoute = createRoute({
  operationId: 'getBook',
  tags: ['books'],
  method: 'get',
  path: '/books/{id}',
  request: {
    params: z.object({
      id: z.string().min(1),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookResponseSchema,
        },
      },
      description: 'Get a book by id',
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
          schema: CreateBookSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: CreateBookResponseSchema,
        },
      },
      description: 'Create a new book',
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
    params: z.object({
      id: z.string().min(1),
    }),
    body: {
      content: {
        'application/json': {
          schema: UpdateBookSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UpdateBookResponseSchema,
        },
      },
      description: 'Update a book by id',
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
    params: z.object({
      id: z.string().min(1),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: DeleteBookResponseSchema,
        },
      },
      description: 'Delete a book by id',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
