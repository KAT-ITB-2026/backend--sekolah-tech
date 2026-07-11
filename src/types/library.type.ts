import { z } from '@hono/zod-openapi';

export const GetLibraryStatusResponse = z.object({
    totalBooks : z.number().int(),
    totalAvailable : z.number().int()
}).openapi('GetLibraryStatusResponse');