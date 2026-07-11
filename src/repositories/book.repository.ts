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

export const updateBook = async (
  id: string,
  payload: {
    title?: string | null;
    author?: string | null;
    isAvailable?: boolean | null;
    publishedYear?: number | null;
  }
) => {
  const updateData: Record<string, any> = {
    updatedAt: new Date(), 
  };

  if (payload.title !== undefined && payload.title !== null) updateData.title = payload.title;
  if (payload.author !== undefined && payload.author !== null) updateData.author = payload.author;
  if (payload.isAvailable !== undefined && payload.isAvailable !== null) updateData.isAvailable = payload.isAvailable;
  if (payload.publishedYear !== undefined && payload.publishedYear !== null) updateData.publishedYear = payload.publishedYear;

  const result = await db
    .update(books)
    .set(updateData)
    .where(eq(books.id, id))
    .returning();

  return first(result);
};

export const deleteBook = async (id: string) => {
  const result = await db
    .delete(books)
    .where(eq(books.id, id))
    .returning();

  return first(result);
};