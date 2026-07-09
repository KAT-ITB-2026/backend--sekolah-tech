import {
  createBook,
  getAllBooks,
  getBookById,
} from '~/repositories/book.repository';
import {
  createBookRoute,
  getAllBooksRoute,
  getBookByIdRoute,
} from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(createBookRoute, async (c) => {
  try {
    const body = c.req.valid('json');
    const book = await createBook(body);
    return c.json({ book }, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

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

bookRouter.openapi(getBookByIdRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const book = await getBookById(id);
    if (!book) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.json({ book }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
