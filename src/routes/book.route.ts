import { createRouter } from '../utils/router-factory';
import { bookRepository } from '../repositories/book.repository';

export const bookRouter = createRouter();

bookRouter.get('/', async (c) => {
  const isAvailableQuery = c.req.query('isAvailable');
  let isAvailable: boolean | undefined = undefined;
  
  if (isAvailableQuery === 'true') isAvailable = true;
  if (isAvailableQuery === 'false') isAvailable = false;

  const allBooks = await bookRepository.getAllBooks(isAvailable);
  return c.json({ success: true, data: allBooks }, 200);
});

bookRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const book = await bookRepository.getBookById(id);
  
  if (!book) return c.json({ success: false, message: 'Buku tidak ditemukan' }, 404);
  return c.json({ success: true, data: book }, 200);
});

bookRouter.post('/', async (c) => {
  const body = await c.req.json();
  
  if (!body.title || !body.author) {
    return c.json({ success: false, message: 'Title dan Author wajib diisi' }, 400);
  }

  const newBook = await bookRepository.createBook({
    title: body.title,
    author: body.author,
    publishedYear: body.publishedYear ? Number(body.publishedYear) : undefined
  });

  return c.json({ success: true, data: newBook }, 201);
});

bookRouter.patch('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();

  const existingBook = await bookRepository.getBookById(id);
  if (!existingBook) return c.json({ success: false, message: 'Buku tidak ditemukan' }, 404);

  const updatedBook = await bookRepository.updateBook(id, body);
  return c.json({ success: true, data: updatedBook }, 200);
});

bookRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  
  const existingBook = await bookRepository.getBookById(id);
  if (!existingBook) return c.json({ success: false, message: 'Buku tidak ditemukan' }, 404);

  await bookRepository.deleteBook(id);
  return c.json({ success: true, message: 'Berhasil menghapus buku' }, 200);
});