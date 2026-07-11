import { z } from '@hono/zod-openapi';

export const GetLibraryStatusResponseSchema = z
  .object({
    totalBooks: z.number().int(),
    totalAvailable: z.number().int(),
  })
  .openapi('GetLibraryStatusResponse');