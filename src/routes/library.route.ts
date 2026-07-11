import { createRoute, z } from '@hono/zod-openapi';
import { GetLibraryStatusResponse } from '~/types/library.type';
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
            schema: GetLibraryStatusResponse
            },
        },
        description: 'Check if server is healthy',
        },
        400: createErrorResponse('UNION', 'Bad request error'),
        500: createErrorResponse('GENERIC', 'Internal server error'),
    },
});
