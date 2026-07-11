import {books} from "../db/schema/book.schema";
import {db} from "../db/drizzle";
import { eq } from "drizzle-orm";

export const getAllBooks = async(isAvailable?: boolean) => {
    if(isAvailable === undefined) {
        return await db.select().from(books);
    } else {
        return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
}
export const getBookById = async(id:string) => {
    const [book] = await db.select().from(books).where(eq(books.id, id));
    return book ?? null;
}
export const createBook = async(book: {title: string, author: string, publishedYear?: number}) => {
    const [createdBook] = await db.insert(books).values({...book, isAvailable: true}).returning();

    return createdBook ?? null;
}
export const editBook = async(
  id: string,
  book: Partial<{
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
  }>,
) => {
  const [updatedBook] = await db
    .update(books)
    .set(book)
    .where(eq(books.id, id))
    .returning();

  return updatedBook ?? null;
}
export const deleteBook = async(id: string) => {
    const [deletedBook] = await db.delete(books).where(eq(books.id, id)).returning();

    return deletedBook ?? null;
}