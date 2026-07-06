import { Hono } from 'hono';
import { getAllBooks } from '../controllers/book.controller';

const bookRouter = new Hono();
bookRouter.get('/', getAllBooks);

export { bookRouter };