import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { first } from '~/db/helper';
import { books } from '~/db/schema/book.schema';

export const getBooks = async (isAvailable?: boolean) => {
  if (isAvailable === undefined) {
    return await db.select().from(books);
  }

  return await db
    .select()
    .from(books)
    .where(eq(books.isAvailable, isAvailable));
};

export const getBookById = async (id: string) => {
  const result = await db.select().from(books).where(eq(books.id, id));

  return first(result);
};
