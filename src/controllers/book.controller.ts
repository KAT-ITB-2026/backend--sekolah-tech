import {
  getBookById,
  getBooks,
  getLibraryStatus,
  insertNewBook,
  patchBook,
  removeBook,
} from '~/repositories/book.repository';
import {
  deleteBook,
  editBook,
  getBookRoute,
  getById,
  getLibraryStatusRoute,
  newBook,
} from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getLibraryStatusRoute, async (c) => {
  try {
    const data = await getLibraryStatus();
    return c.json(data, 200);
  } catch (error) {
    console.error('Galat mengambil status perpustakaan:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(getBookRoute, async (c) => {
  try {
    const query = c.req.valid('query');
    const booksData = await getBooks(query.isAvailable);
    return c.json(booksData, 200);
  } catch (error) {
    console.error('Galat mengambil daftar buku:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(getById, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const book = await getBookById(id);
    if (!book) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }
    return c.json(book, 200);
  } catch (error) {
    console.error('Galat mengambil buku:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(newBook, async (c) => {
  try {
    const body = c.req.valid('json');
    const book = await insertNewBook(
      body.title,
      body.author,
      body.publishedYear,
    );
    return c.json(book, 201);
  } catch (error) {
    console.error('Galat memasukkan buku baru:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(editBook, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');
    const updatedBook = await patchBook(id, body);
    if (!updatedBook) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }
    return c.json(updatedBook, 200);
  } catch (error) {
    console.error('Galat mengedit data buku:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

bookRouter.openapi(deleteBook, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const isDeleted = await removeBook(id);
    if (!isDeleted) {
      return c.json({ error: 'Buku tidak ditemukan' }, 404);
    }
    return c.json({ message: 'Buku berhasil dihapus' }, 200);
  } catch (error) {
    console.error('Galat menghapus buku:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});
