import { getBooks } from '~/repositories/book.repository';
import { getBooksRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getBooksRoute, async (c) => {
  try {
    const { isAvailable: isAvailableStr } = c.req.valid('query');
    const isAvailable =
      isAvailableStr === 'true'
        ? true
        : isAvailableStr === 'false'
          ? false
          : undefined;

    const result = await getBooks(isAvailable);
    return c.json(result, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
