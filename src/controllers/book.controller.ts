import { getAllBooks } from '~/repositories/book.repository';
import { getAllBooksRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getAllBooksRoute, async (c) => {
  try {
    const query = c.req.valid('query');
    const books = await getAllBooks(query.isAvailable);
    return c.json({ books }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
