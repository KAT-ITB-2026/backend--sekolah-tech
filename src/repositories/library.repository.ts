import { eq, sql } from 'drizzle-orm';

import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getLibraryStatus = async () => {
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(books);
  const availableResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(books)
    .where(eq(books.isAvailable, true));

  return {
    totalBooks: totalResult[0].count,
    totalAvailable: availableResult[0].count,
  };
};
