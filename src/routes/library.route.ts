import { createRoute, z } from '@hono/zod-openapi';
import { createErrorResponse } from '~/utils/error-response-factory';

export const LibraryStatusSchema = z.object({
    totalBooks : z.number(),
    totalAvailable : z.number(),
})
.openapi('LibraryStatus');

export const getLibraryStatusRoute = createRoute({
    operationId: 'getLibraryStatus',
    tags: ['library'],
    method: 'get',
    path: '/library/status',
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: LibraryStatusSchema,
                },
            }, 
            description: 'Retrieved library status',
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});
