import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const bookSchema = z.object({
    id : z.string(),
    title: z.string(),
    author : z.string(),
    publishedYear : z.number().nullable(),
    isAvailable : z.boolean(),
    createdAt : z.string(),
    updatedAt : z.string(),
})
.openapi('Book');

export const createBookSchema = z.object({
    title: z.string(),
    author : z.string(),
    publishedYear : z.number().optional(),
})

export const editBookSchema = z.object({
    id : z.string(),
    title: z.string().optional(),
    author : z.string().optional(),
    publishedYear : z.number().optional(),
    isAvailable : z.boolean().optional(),
})

export const getAllBooksRoute = createRoute({
  operationId: 'getAllBooks',
  tags: ['books'],
  method: 'get',
  path: '/books',
  request: {
    query: z.object({
      isAvailable: z.boolean().optional(),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(bookSchema),
          }),
        },
      },
      description: 'Retrieved all books',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const getBookByIdRoute = createRoute({
  operationId: 'getBookById',
  tags: ['books'],
  method: 'get',
  path: '/books/:id',
  request: {
    query: z.object({
        id: z.string(),
    }),
  },
    responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            books: z.array(bookSchema),
          }),
        },
      },
      description : 'Retrieved book by ID',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  }
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
                    schema: createBookSchema,
                },
            },
        },
    },
    responses: {
        201: {
            content: {
                'application/json': {
                    schema: bookSchema,
                },
            },
            description: 'Book created successfully',
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});

export const editBookRoute = createRoute({
  operationId: 'editBook',
  tags: ['books'],
  method: 'patch',
  path: '/books/:id',
  request: {
    body: {
      content: {
        'application/json': {
          schema: editBookSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: bookSchema,
        },
      },
      description: 'Book updated successfully',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});

export const deleteBookRoute = createRoute({
  operationId: 'deleteBook',
  tags: ['books'],
  method: 'delete',
  path: '/books/:id',
  request: {
    query: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Book deleted successfully',
    },
    400: createErrorResponse('UNION', 'Bad request error'),
    404: createErrorResponse('GENERIC', 'Book not found'),
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});
