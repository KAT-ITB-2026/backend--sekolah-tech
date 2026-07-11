import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { first, firstSure } from '~/db/helper';
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

export const createBook = async (payload: {
  title: string;
  author: string;
  publishedYear?: number;
}) => {
  const result = await db
    .insert(books)
    .values({
      title: payload.title,
      author: payload.author,
      publishedYear: payload.publishedYear,
    })
    .returning();

  return firstSure(result); 
};