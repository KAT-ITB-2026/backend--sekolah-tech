import { getBookById, getBooks, createBook, updateBook, deleteBook } from '~/repositories/book.repository';
import { getBookByIdRoute, getBooksRoute, createBookRoute, updateBookRoute, deleteBookRoute } from '~/routes/book.route';
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

bookRouter.openapi(updateBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');
    const updatedBook = await updateBook(id, body);

    if (!updatedBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

    const formattedBook = {
      ...updatedBook,
      createdAt: updatedBook.createdAt.toISOString(),
      updatedAt: updatedBook.updatedAt.toISOString(),
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

bookRouter.openapi(deleteBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const deletedBook = await deleteBook(id);

    if (!deletedBook) {
      return c.json({ error: 'Book not found' }, 404);
    }

    return c.json(
      {
        message: 'Book successfully deleted',
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