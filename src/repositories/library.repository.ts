import { eq, count } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getLibraryStatus = async () => {
  const totalBooksData = await db
    .select({ value: count() })
    .from(books);

  const totalAvailableData = await db
    .select({ value: count() })
    .from(books)
    .where(eq(books.isAvailable, true));

  return {
    totalBooks: totalBooksData[0].value,
    totalAvailable: totalAvailableData[0].value,
  };
};