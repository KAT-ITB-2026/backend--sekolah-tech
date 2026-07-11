import { getAllBooks, getBooksById } from '~/repositories/book.repository';
import { getAllBooksRoute, getBooksByIdRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getAllBooksRoute, async (c) => {
    try {
        const { isAvailable } = c.req.valid('query');
        const booksCollection = await getAllBooks(isAvailable);
        return c.json({
            books: booksCollection,
        }, 200);
    }
    catch (e) {
        if (e instanceof Error) {
            return c.json({ error: e.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});


bookRouter.openapi(getBooksByIdRoute, async (c) => {
    try {
        const { id } = c.req.valid('param');
        const book = await getBooksById(id);
        if(book === undefined){
            return c.json({error: 'Book not found'},404);
        }
        return c.json(book,200);
    }
    catch (e) {
        if (e instanceof Error) {
            return c.json({ error: e.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});