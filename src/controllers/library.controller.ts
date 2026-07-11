import { getLibraryStatus } from '~/repositories/library.repository';
import { getLibraryStatusRoute } from '~/routes/library.route';
import { createRouter } from '~/utils/router-factory';

export const libraryRouter = createRouter();

libraryRouter.openapi(getLibraryStatusRoute, async (c) => {
  try {
    const status = await getLibraryStatus();
    
    return c.json(status, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});