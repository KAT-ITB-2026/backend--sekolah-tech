import { createBook, deleteBook, editBook, getAllBooks, getBookById } from '~/repositories/book.repository';
import {
  createBookRoute,
  deleteBookRoute,
  getBookRoute,
  getBooksRoute,
  updateBookRoute,
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

bookRouter.openapi(updateBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const data = await c.req.valid('json');
    const updatedBook = await editBook(id, data);

    if (!updatedBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

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
    const deletedBook = await deleteBook(id);

    if (!deletedBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

    return c.json(deletedBook, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

