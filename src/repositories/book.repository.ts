import { count, eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getLibraryStatus = async () => {
  const [totalBooks] = await db.select({ value: count() }).from(books);
  const [totalAvailable] = await db
    .select({ value: count() })
    .from(books)
    .where(eq(books.isAvailable, true));

  return {
    totalBooks: totalBooks?.value ?? 0,
    totalAvailable: totalAvailable?.value ?? 0,
  };
};

export const getBooks = async (available?: boolean) => {
  const baseQuery = db.select().from(books);

  const result =
    available !== undefined
      ? await baseQuery.where(eq(books.isAvailable, available))
      : await baseQuery;

  return result.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    yearpublish: b.publishedYear,
    avaliable: b.isAvailable,
    created: b.createdAt.toISOString(),
    updated: b.updatedAt.toISOString(),
  }));
};

export const getBookById = async (bookid: string) => {
  const [book] = await db.select().from(books).where(eq(books.id, bookid));
  if (!book) return null;

  return {
    id: book.id,
    title: book.title,
    author: book.author,
    yearpublish: book.publishedYear,
    avaliable: book.isAvailable,
    created: book.createdAt.toISOString(),
    updated: book.updatedAt.toISOString(),
  };
};

export const insertNewBook = async (
  title: string,
  author: string,
  publishedYear?: number | null,
) => {
  const [newBook] = await db
    .insert(books)
    .values({
      title,
      author,
      publishedYear: publishedYear ?? null,
      isAvailable: true,
    })
    .returning();

  return {
    id: newBook.id,
    title: newBook.title,
    author: newBook.author,
    yearpublish: newBook.publishedYear,
    avaliable: newBook.isAvailable,
    created: newBook.createdAt.toISOString(),
    updated: newBook.updatedAt.toISOString(),
  };
};

export const patchBook = async (
  bookid: string,
  updates: {
    title?: string | null;
    author?: string | null;
    isAvailable?: boolean | null;
    publishedYear?: number | null;
  },
) => {
  const [currentBook] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookid));
  if (!currentBook) return null;

  const [updatedBook] = await db
    .update(books)
    .set({
      title:
        updates.title !== null && updates.title !== undefined
          ? updates.title
          : currentBook.title,
      author:
        updates.author !== null && updates.author !== undefined
          ? updates.author
          : currentBook.author,
      isAvailable:
        updates.isAvailable !== null && updates.isAvailable !== undefined
          ? updates.isAvailable
          : currentBook.isAvailable,
      publishedYear:
        updates.publishedYear !== null && updates.publishedYear !== undefined
          ? updates.publishedYear
          : currentBook.publishedYear,
      updatedAt: new Date(),
    })
    .where(eq(books.id, bookid))
    .returning();

  return {
    id: updatedBook.id,
    title: updatedBook.title,
    author: updatedBook.author,
    yearpublish: updatedBook.publishedYear,
    avaliable: updatedBook.isAvailable,
    created: updatedBook.createdAt.toISOString(),
    updated: updatedBook.updatedAt.toISOString(),
  };
};

export const removeBook = async (bookid: string) => {
  const [currentBook] = await db
    .select()
    .from(books)
    .where(eq(books.id, bookid));
  if (!currentBook) return false;

  await db.delete(books).where(eq(books.id, bookid));
  return true;
};
