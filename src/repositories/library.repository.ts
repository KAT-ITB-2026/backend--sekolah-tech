import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getLibraryStatus = async () => {
    const totalBooks = await db.$count(books);
    const totalAvailable = await db.$count(books, eq(books.isAvailable, true));
    return { totalBooks, totalAvailable };
}