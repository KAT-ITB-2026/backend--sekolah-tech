import { getAllBooks, getBooksById, createBook, updateBook, deleteBook } from '~/repositories/book.repository';
import { getAllBooksRoute, getBooksByIdRoute, createBookRoute, updateBookRoute, deleteBookRoute } from '~/routes/book.route';
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

bookRouter.openapi(createBookRoute, async (c) => {
    try {
        const body = c.req.valid('json');
        const book = await createBook(body);
        return c.json(book, 201);
    }
    catch (e) {
        if (e instanceof Error) {
            return c.json({ error: e.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRouter.openapi(updateBookRoute, async (c) => {
    try {
        const { id } = c.req.valid('param');
        const body = c.req.valid('json');
        const book = await updateBook(id, body);
        if (book === undefined) {
            return c.json({ error: 'Book not found' }, 404);
        }
        return c.json(book, 200);
    }
    catch (e) {
        if (e instanceof Error) {
            return c.json({ error: e.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRouter.openapi(deleteBookRoute, async (c) => {
    try {
        const { id } = c.req.valid('param');
        const book = await deleteBook(id);
        if (book === undefined) {
            return c.json({ error: 'Book not found' }, 404);
        }
        return c.body(null, 204);
    }
    catch (e) {
        if (e instanceof Error) {
            return c.json({ error: e.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});