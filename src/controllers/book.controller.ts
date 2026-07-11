import { getBookById, getBooks } from '~/repositories/book.repository';
import { getBookByIdRoute, getBooksRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';
export const booksRouter = createRouter();

booksRouter.openapi(getBooksRoute, async(c) => {
    try {
        const { isAvailable } = c.req.valid("query");
        const books = await getBooks(isAvailable);
        return c.json({message: books}, 200);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({error: error.message}, 500);
        }
        return c.json({error: 'Internal server error'}, 500);
    }
});

booksRouter.openapi(getBookByIdRoute, async(c) => {
    try {
        const { id } = c.req.valid("param");
        const book = await getBookById(id);
        return c.json({message: book}, 200);

    } catch (error) {
        if (error instanceof Error) {
            return c.json({error: error.message}, 500);
        }
        return c.json({error: 'Internal server error'}, 500);
    }
});