import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const createBookBodySchema = z.object({
  title: z.string(),
  author: z.string(),
  publishedYear: z.number().optional(),
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
          schema: createBookBodySchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            book: z.object({
              id: z.string(),
              title: z.string(),
              author: z.string(),
              publishedYear: z.number().nullable(),
              isAvailable: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          }),
        },
      },
      description: 'Successfully created book',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const updateBookParamsSchema = z.object({
  id: z.string(),
});

export const updateBookBodySchema = z.object({
  title: z.string().nullable(),
  author: z.string().nullable(),
  isAvailable: z.boolean().nullable(),
  publishedYear: z.number().nullable(),
});

export const updateBookRoute = createRoute({
  operationId: 'updateBook',
  tags: ['books'],
  method: 'patch',
  path: '/books/{id}',
  request: {
    params: updateBookParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateBookBodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            book: z.object({
              id: z.string(),
              title: z.string(),
              author: z.string(),
              publishedYear: z.number().nullable(),
              isAvailable: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          }),
        },
      },
      description: 'Successfully updated book',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteBookParamsSchema = z.object({
  id: z.string(),
});

export const deleteBookRoute = createRoute({
  operationId: 'deleteBook',
  tags: ['books'],
  method: 'delete',
  path: '/books/{id}',
  request: {
    params: deleteBookParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'Successfully deleted book',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookByIdParamsSchema = z.object({
  id: z.string(),
});

export const getBookByIdRoute = createRoute({
  operationId: 'getBookById',
  tags: ['books'],
  method: 'get',
  path: '/books/{id}',
  request: {
    params: getBookByIdParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            book: z.object({
              id: z.string(),
              title: z.string(),
              author: z.string(),
              publishedYear: z.number().nullable(),
              isAvailable: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string(),
            }),
          }),
        },
      },
      description: 'Successfully fetched book by id',
    },
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getAllBooksQuerySchema = z.object({
  isAvailable: z.coerce.boolean().optional(),
});

export const getAllBooksRoute = createRoute({
  operationId: 'getAllBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: getAllBooksQuerySchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                author: z.string(),
                publishedYear: z.number().nullable(),
                isAvailable: z.boolean(),
                createdAt: z.string(),
                updatedAt: z.string(),
              }),
            ),
          }),
        },
      },
      description: 'Successfully fetched all books',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
