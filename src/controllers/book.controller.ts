import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getLibraryStatus,
  updateBook,
} from '../repositories/book.repository';
import {
  createBookRoute,
  deleteBookRoute,
  getBookByIdRoute,
  getBooksRoute,
  getLibraryStatusRoute,
  updateBookRoute,
} from '../routes/book.route';
import { createRouter } from '../utils/router-factory';

export const bookRouter = createRouter();
bookRouter.openapi(getBooksRoute, async (c) => {
  try {
    const { isAvailable } = c.req.valid('query');
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
    const result = await getBookById(id);
    if (!result) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.json(result, 200);
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
    const result = await createBook(body);
    return c.json(result, 201);
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
    const result = await updateBook(id, body);
    if (!result) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.json(result, 200);
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
    const result = await deleteBook(id);
    if (!result) {
      return c.json({ error: 'Book not found' }, 404);
    }
    return c.body(null, 204);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(getLibraryStatusRoute, async (c) => {
  try {
    const result = await getLibraryStatus();
    return c.json(result, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ error: 'Internal server error' }, 500);
  }
});
