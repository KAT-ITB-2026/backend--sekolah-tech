import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export async function getBooks(isAvailable?: boolean) {
  if (isAvailable !== undefined) {
    return db.select().from(books).where(eq(books.isAvailable, isAvailable));
  }
  return db.select().from(books);
}

export async function getBookById(id: string) {
  const [book] = await db.select().from(books).where(eq(books.id, id));
  return book;
}

export async function createBook(data: {
  title: string;
  author: string;
  publishedYear?: number | null;
}) {
  const [newBook] = await db
    .insert(books)
    .values({
      title: data.title,
      author: data.author,
      publishedYear: data.publishedYear,
      isAvailable: true,
    })
    .returning();
  return newBook;
}

export async function updateBook(
  id: string,
  data: {
    title?: string | null;
    author?: string | null;
    isAvailable?: boolean | null;
    publishedYear?: number | null;
  },
) {
  const updateData: Record<string, any> = {};

  if (data.title !== null && data.title !== undefined) {
    updateData.title = data.title;
  }
  if (data.author !== null && data.author !== undefined) {
    updateData.author = data.author;
  }
  if (data.isAvailable !== null && data.isAvailable !== undefined) {
    updateData.isAvailable = data.isAvailable;
  }
  if (data.publishedYear !== null && data.publishedYear !== undefined) {
    updateData.publishedYear = data.publishedYear;
  }

  updateData.updatedAt = new Date();

  const [updatedBook] = await db
    .update(books)
    .set(updateData)
    .where(eq(books.id, id))
    .returning();

  return updatedBook;
}

export async function deleteBook(id: string) {
  const [deletedBook] = await db
    .delete(books)
    .where(eq(books.id, id))
    .returning();
  return deletedBook;
}
