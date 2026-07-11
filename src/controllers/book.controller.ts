import { getBookById, getBooks, createBook } from '~/repositories/book.repository';
import { getBookByIdRoute, getBooksRoute, createBookRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getBooksRoute, async (c) => {
  try {
    const { isAvailable } = c.req.valid('query');

    const books = await getBooks(isAvailable);

    const formattedBooks = books.map((book) => ({
      ...book,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
    }));

    return c.json(
      {
        data: formattedBooks,
      },
      200,
    );
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

    const formattedBook = {
      ...book,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
    };

    return c.json(
      {
        data: formattedBook,
      },
      200,
    );
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
    const formattedBook = {
      ...newBook,
      createdAt: newBook.createdAt.toISOString(),
      updatedAt: newBook.updatedAt.toISOString(),
    };

    return c.json(
      {
        data: formattedBook,
      },
      201, 
    );
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    }

    return c.json({ error: 'Internal server error' }, 500);
  }
});