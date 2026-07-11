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
