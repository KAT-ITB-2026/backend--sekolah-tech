import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { first, firstSure } from '~/db/helper';
import { books } from '~/db/schema/book.schema';

export const getBooks = async (isAvailable?: boolean) => {
  return await db
    .select()
    .from(books)
    .where(
      isAvailable === undefined
        ? undefined
        : eq(books.isAvailable, isAvailable),
    );
};

export const getBookById = async (id: string) => {
  return first(await db.select().from(books).where(eq(books.id, id)));
};

type CreateBookInput = {
  title: string;
  author: string;
  publishedYear?: number;
};

export const createBook = async (input: CreateBookInput) => {
  const result = await db.insert(books).values(input).returning();
  return firstSure(result);
};

type UpdateBookInput = {
  title?: string | null;
  author?: string | null;
  isAvailable?: boolean | null;
  publishedYear?: number | null;
};

export const updateBook = async (id: string, input: UpdateBookInput) => {
  const values: Partial<typeof books.$inferInsert> = {};
  if (input.title != null) values.title = input.title;
  if (input.author != null) values.author = input.author;
  if (input.isAvailable != null) values.isAvailable = input.isAvailable;
  if (input.publishedYear != null) values.publishedYear = input.publishedYear;

  if (Object.keys(values).length === 0) {
    return getBookById(id);
  }

  values.updatedAt = new Date();

  const result = await db
    .update(books)
    .set(values)
    .where(eq(books.id, id))
    .returning();
  return first(result);
};
