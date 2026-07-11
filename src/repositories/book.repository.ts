import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getAllBooks = async (isAvailable?: boolean) => {
    if (isAvailable !== undefined) {
        return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
    return await db.select().from(books);
}

export const getBookById = async (id: string) => {
    return await db.select().from(books).where(eq(books.id, id));
}

export const createBook = async (book: { title: string, author: string, publishedYear?: number }) => {
    const newBook = await db.insert(books).values({
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
    });
    return newBook;
}

export const editBook = async (id: string, book: { title?: string, author?: string, publishedYear?: number, isAvailable?: boolean }) => {
    const updateData: { title?: string, author?: string, publishedYear?: number, isAvailable?: boolean } = {};

    if (book.title !== undefined && book.title !== null) {
        updateData.title = book.title;
    }
    if (book.author !== undefined && book.author !== null) {
        updateData.author = book.author;
    }
    if (book.publishedYear !== undefined && book.publishedYear !== null) {
        updateData.publishedYear = book.publishedYear;
    }
    if (book.isAvailable !== undefined && book.isAvailable !== null) {
        updateData.isAvailable = book.isAvailable;
    }

    const updatedBook = await db.update(books).set(updateData).where(eq(books.id, id));
    return updatedBook;
}