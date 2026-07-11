import { createRoute } from '@hono/zod-openapi';
import { GetLibraryStatusResponseSchema } from '~/types/library.type';
import { createErrorResponse } from '~/utils/error-response-factory';

export const getLibraryStatusRoute = createRoute({
  operationId: 'getLibraryStatus',
  tags: ['library'],
  method: 'get',
  path: '/library/status',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetLibraryStatusResponseSchema,
        },
      },
      description: 'Successfully fetched library status',
    },
    500: createErrorResponse('GENERIC', 'Internal server error'),
  },
});