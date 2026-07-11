import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  getLibraryStatus,
  updateBook,
} from '~/repositories/book.repository';
import {
  createBookRoute,
  deleteBookRoute,
  getBookByIdRoute,
  getLibraryStatusRoute,
  getListBooksRoute,
  updateBookRoute,
} from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getListBooksRoute, async (c) => {
  try {
    const allBooks = await getAllBooks();
    return c.json(allBooks, 200);
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
    const updatedBook = await updateBook(id, body);

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
    return c.json({ message: 'Book deleted successfully' }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(getLibraryStatusRoute, async (c) => {
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
