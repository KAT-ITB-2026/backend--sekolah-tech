import {
  createBook,
  getBookById,
  getBooks,
} from '~/repositories/book.repository';
import {
  createBookRoute,
  getBookByIdRoute,
  getBooksRoute,
} from '~/routes/book.route';
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

bookRouter.openapi(getBookByIdRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const book = await getBookById(id);
    if (!book) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.json(book, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(createBookRoute, async (c) => {
  try {
    const body = c.req.valid('json');
    const newBook = await createBook(body);
    return c.json(newBook, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
