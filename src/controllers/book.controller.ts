import { createBook, getAllBooks, getBookById } from '~/repositories/book.repository';
import {
  createBookRoute,
  getBookRoute,
  getBooksRoute,
} from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getBooksRoute, async (c) => {
  try {
    const books = await getAllBooks();
    return c.json(books, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(getBookRoute, async (c) => {
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
    const data = await c.req.valid('json');
    const newBook = await createBook(data);

    return c.json(newBook, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

