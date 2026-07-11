import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from '~/repositories/book.repository';
import {
  createBookRoute,
  deleteBookRoute,
  getBookByIdRoute,
  getBooksRoute,
  updateBookRoute,
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

bookRouter.openapi(updateBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');

    const existingBook = await getBookById(id);
    if (!existingBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

    const updatedBook = await updateBook(id, body);
    return c.json(updatedBook, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(deleteBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');

    const existingBook = await getBookById(id);
    if (!existingBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

    const deletedBook = await deleteBook(id);
    return c.json(deletedBook, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
