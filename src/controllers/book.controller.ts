import { getAllBooks, getBookById, createBook } from '~/repositories/book.repository';
import { getAllBooksRoute, getBookByIdRoute, createBookRoute } from '~/routes/book.route';
import { createRouter } from '~/utils/router-factory';

export const bookRouter = createRouter();

bookRouter.openapi(getAllBooksRoute, async (c) => {
    try{
        const books = await getAllBooks();
        return c.json({ books }, 200);
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRouter.openapi(getBookByIdRoute, async (c) => {
    const { id } = c.req.param();
    try{
        const book = await getBookById(id);
        if (book.length === 0) {
            return c.json({ error: 'Book not found' }, 404);
        }
        return c.json({ books: book }, 200);
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRouter.openapi(createBookRoute, async (c) => {
    const { title, author, publishedYear } = await c.req.json();
    try{
        const newBook = await createBook({ title, author, publishedYear });
        return c.json({ book: newBook }, 201);
    }
    catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 500);
        }
        return c.json({ error: 'Internal server error' }, 500);
    }
});