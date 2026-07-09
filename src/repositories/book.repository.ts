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

export const updateBook = async (
  id: string,
  input: {
    title?: string | null;
    author?: string | null;
    isAvailable?: boolean | null;
    publishedYear?: number | null;
  },
) => {
  const setValues: Record<string, any> = {
    updatedAt: new Date(),
  };
  if (input.title !== null && input.title !== undefined)
    setValues.title = input.title;
  if (input.author !== null && input.author !== undefined)
    setValues.author = input.author;
  if (input.isAvailable !== null && input.isAvailable !== undefined)
    setValues.isAvailable = input.isAvailable;
  if (input.publishedYear !== null && input.publishedYear !== undefined)
    setValues.publishedYear = input.publishedYear;

  const result = await db
    .update(books)
    .set(setValues)
    .where(eq(books.id, id))
    .returning();
  return result[0];
};
