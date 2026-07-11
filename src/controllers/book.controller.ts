import { createBook, getBookById, getBooks, deleteBook, updateBook } from '~/repositories/book.repository';
import { createBookRoute, deleteBookRoute, getBookByIdRoute, getBooksRoute, updateBookRoute } from '~/routes/book.route';
import type { UpdateBookInput, UpdateBook } from '~/types/book.type';
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

booksRouter.openapi(updateBookRoute, async(c) => {
    try {
        const { id } = c.req.valid("param");
        const bookInputData  = c.req.valid("json");
        const book = await updateBook({
            id: id,
            data: bookInputData
        });
        return c.json(book, 200);
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