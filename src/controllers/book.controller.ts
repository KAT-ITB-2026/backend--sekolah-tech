import { bookRepository } from '~/repositories/book.repository';
import { 
  getAllBooksRoute, 
  getBookByIdRoute, 
  createBookRoute, 
  editBookRoute, 
  deleteBookRoute 
} from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getAllBooksRoute, async (c) => {
  try {
    const query = c.req.valid('query');
    
    let isAvailable;
    if (query.isAvailable === 'true') isAvailable = true;
    if (query.isAvailable === 'false') isAvailable = false;

    const books = await bookRepository.getAllBooks(isAvailable);
    return c.json({ data: books }, 200);
  } catch (error) {
    return c.json({ error: 'Internal server error' } as any, 500);
  }
});

bookRouter.openapi(getBookByIdRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const book = await bookRepository.getBookById(id);
    
    if (!book) {
      return c.json({ error: 'Book not found' } as any, 404);
    }
    return c.json({ data: book }, 200);
  } catch (error) {
    return c.json({ error: 'Internal server error' } as any, 500);
  }
});

bookRouter.openapi(createBookRoute, async (c) => {
  try {
    const data = c.req.valid('json');
    const newBook = await bookRepository.createBook(data);
    
    return c.json({ data: newBook }, 201);
  } catch (error) {
    return c.json({ error: 'Internal server error' } as any, 500);
  }
});

bookRouter.openapi(editBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const data = c.req.valid('json');
    
    const updatedBook = await bookRepository.updateBook(id, data);
    
    if (!updatedBook) {
      return c.json({ error: 'Book not found' } as any, 404);
    }
    return c.json({ data: updatedBook }, 200);
  } catch (error) {
    return c.json({ error: 'Internal server error' } as any, 500);
  }
});

bookRouter.openapi(deleteBookRoute, async (c) => {
  try {
    const { id } = c.req.valid('param');
    const deletedBook = await bookRepository.deleteBook(id);
    
    if (!deletedBook) {
      return c.json({ error: 'Book not found' } as any, 404);
    }
    
    return c.json({ message: 'Book deleted successfully' } as any, 200);
  } catch (error) {
    return c.json({ error: 'Internal server error' } as any, 500);
  }
});