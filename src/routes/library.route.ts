import { createRouter } from '../utils/router-factory';
import { bookRepository } from '../repositories/book.repository';

export const libraryRouter = createRouter();

libraryRouter.get('/status', async (c) => {
  const status = await bookRepository.getLibraryStatus();
  return c.json({ success: true, data: status }, 200);
});