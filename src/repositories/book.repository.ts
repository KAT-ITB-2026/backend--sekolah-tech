import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getAllBooks = async (isAvailable?: boolean) => {
    if (isAvailable !== undefined) {
        return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
    return await db.select().from(books);
}

export const getBookById = async (id: string) => {
    return await db.select().from(books).where(eq(books.id, id));
}

export const createBook = async (book: { title: string, author: string, publishedYear?: number }) => {
    const newBook = await db.insert(books).values({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
    });
    return newBook;
}
