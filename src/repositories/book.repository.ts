import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getBooks = async(isAvailable?: boolean) => {
    if (isAvailable !== undefined) {
        return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
    return await db.select().from(books);
};

export const getBookById = async(id : string) => {
    return await db.select().from(books).where(eq(books.id, id)).limit(1);
};