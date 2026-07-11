import { count, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';
import { CreateBookBodySchema, UpdateBookBodySchema } from '~/types/book.type';

type CreateBookInput = z.infer<typeof CreateBookBodySchema>;
export const getAllBooks = async () => {
  return db.select().from(books);
};

export const getBookById = async (id: string) => {
  const result = await db.select().from(books).where(eq(books.id, id));
  return result[0];
};

export const createBook = async (data: CreateBookInput) => {
  const result = await db.insert(books).values(data).returning();
  return result[0];
};

type UpdateBookInput = z.infer<typeof UpdateBookBodySchema>;

export const updateBook = async (id: string, data: UpdateBookInput) => {
  const updateData: Record<string, unknown> = {};
  if (data.title != null) updateData.title = data.title;
  if (data.author != null) updateData.author = data.author;
  if (data.publishedYear != null) updateData.publishedYear = data.publishedYear;
  if (data.isAvailable != null) updateData.isAvailable = data.isAvailable;

  const result = await db
    .update(books)
    .set(updateData)
    .where(eq(books.id, id))
    .returning();
  return result[0];
};

export const deleteBook = async (id: string) => {
  const result = await db.delete(books).where(eq(books.id, id)).returning();
  return result[0];
};

export const getLibraryStatus = async () => {
  const total = await db.select({ value: count() }).from(books);
  const available = await db
    .select({ value: count() })
    .from(books)
    .where(eq(books.isAvailable, true));

  return { totalBooks: total[0].value, totalAvailable: available[0].value };
};
