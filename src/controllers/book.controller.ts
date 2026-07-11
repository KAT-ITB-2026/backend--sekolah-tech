import { createBook, getBookById, getBooks, deleteBook } from '~/repositories/book.repository';
import { createBookRoute, deleteBookRoute, getBookByIdRoute, getBooksRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';
export const booksRouter = createRouter();

booksRouter.openapi(getBooksRoute, async(c) => {
    try {
        const { isAvailable } = c.req.valid("query");
        const books = await getBooks(isAvailable);
        return c.json(books, 200);
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
        return c.json(book, 200);

    } catch (error) {
        if (error instanceof Error) {
            return c.json({error: error.message}, 500);
        }
        return c.json({error: 'Internal server error'}, 500);
    }
});

booksRouter.openapi(createBookRoute, async(c) => {
    try {
        const body = c.req.valid("json");
        const book = await createBook(body);
        return c.json(book, 201);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({error: error.message}, 500);
        }
        return c.json({error: 'Internal server error'}, 500);
    }
});

booksRouter.openapi(deleteBookRoute, async(c) => {
    try {
        const { id } = c.req.valid("param");
        await deleteBook(id);
        return c.json({message:"Succesfully delete a book!"}, 200);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({error: error.message}, 500);
        }
        return c.json({error: 'Internal server error'}, 500);
    }
});