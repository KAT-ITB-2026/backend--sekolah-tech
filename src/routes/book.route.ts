import { createRoute } from '@hono/zod-openapi';
import {
  BookSchema,
  CreateBookSchema,
  GetBookByIdSchema,
  LibraryStatusSchema,
  ListBookSchema,
  QueryBookSchema,
  UpdateBookSchema,
} from '~/types/book.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getBooksRoute = createRoute({
  operationId: 'getBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: QueryBookSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: ListBookSchema,
        },
      },
      description: 'Get all books',
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
    params: GetBookByIdSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: BookSchema,
        },
      },
      description: 'Get book by id',
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
          schema: BookSchema,
        },
      },
      description: 'Book created',
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
    params: GetBookByIdSchema,
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
          schema: BookSchema,
        },
      },
      description: 'Book updated',
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
    params: GetBookByIdSchema,
  },
  responses: {
    204: {
      description: 'Book deleted',
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
      content: {
        'application/json': {
          schema: LibraryStatusSchema,
        },
      },
      description: 'Library statistics',
    },
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
