import { db } from '../db/drizzle';
import { books } from '../db/schema/book.schema';
import { eq, count } from 'drizzle-orm';

export const bookRepository = {
  getLibraryStatus: async () => {
    const totalResult = await db.select({ value: count() }).from(books);
    const availableResult = await db.select({ value: count() }).from(books).where(eq(books.isAvailable, true));
    
    return {
      totalBooks: totalResult[0]?.value ?? 0,
      totalAvailable: availableResult[0]?.value ?? 0
    };
  },

  getAllBooks: async (isAvailable?: boolean) => {
    if (isAvailable !== undefined) {
      return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
    return await db.select().from(books);
  },

  getBookById: async (id: string) => {
    const result = await db.select().from(books).where(eq(books.id, id));
    return result[0] || null;
  },

  createBook: async (data: { title: string; author: string; publishedYear?: number }) => {
    const result = await db.insert(books).values({
      title: data.title,
      author: data.author,
      publishedYear: data.publishedYear,
      isAvailable: true,
    }).returning();
    return result[0];
  },

  updateBook: async (id: string, data: { title?: string | null; author?: string | null; isAvailable?: boolean | null; publishedYear?: number | null }) => {
    const updateData: any = {};
    
    if (data.title !== null && data.title !== undefined) updateData.title = data.title;
    if (data.author !== null && data.author !== undefined) updateData.author = data.author;
    if (data.isAvailable !== null && data.isAvailable !== undefined) updateData.isAvailable = data.isAvailable;
    if (data.publishedYear !== null && data.publishedYear !== undefined) updateData.publishedYear = data.publishedYear;

    updateData.updatedAt = new Date();

    const result = await db.update(books).set(updateData).where(eq(books.id, id)).returning();
    return result[0] || null;
  },

  deleteBook: async (id: string) => {
    const result = await db.delete(books).where(eq(books.id, id)).returning();
    return result[0] || null;
  }
};