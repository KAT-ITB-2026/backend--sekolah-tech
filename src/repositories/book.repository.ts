import { eq } from 'drizzle-orm';

import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getAllBooks = async (isAvailable?: boolean) => {
  if (isAvailable !== undefined) {
    return db.select().from(books).where(eq(books.isAvailable, isAvailable));
  }
  return db.select().from(books);
};

export const getBookById = async (id: string) => {
  const result = await db.select().from(books).where(eq(books.id, id));
  return result[0];
};

export const createBook = async (input: {
  title: string;
  author: string;
  publishedYear?: number;
}) => {
  const result = await db
    .insert(books)
    .values({
      title: input.title,
      author: input.author,
      publishedYear: input.publishedYear,
    })
    .returning();
  return result[0];
};
