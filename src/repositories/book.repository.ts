import { eq } from 'drizzle-orm';

import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getAllBooks = async (isAvailable?: boolean) => {
    if(isAvailable === undefined){
        return db.select().from(books);
    }
    return db.select().from(books).where(eq(books.isAvailable,isAvailable));
}

export const getBooksById = async (Id : string) =>{
    const result = await db.select().from(books).where(eq(books.id,Id)).limit(1);
    return result[0];
}

export const createBook = async (data: { title: string; author: string; publishedYear?: number }) => {
    const [book] = await db.insert(books).values(data).returning();
    return book;
}

export const updateBook = async (
    Id: string,
    data: { title?: string | null; author?: string | null; isAvailable?: boolean | null; publishedYear?: number | null },
) => {
    const updateData: Partial<typeof books.$inferInsert> = {};
    if (data.title != null) updateData.title = data.title;
    if (data.author != null) updateData.author = data.author;
    if (data.isAvailable != null) updateData.isAvailable = data.isAvailable;
    if (data.publishedYear != null) updateData.publishedYear = data.publishedYear;

    if (Object.keys(updateData).length === 0) {
        const result = await db.select().from(books).where(eq(books.id, Id)).limit(1);
        return result[0];
    }

    updateData.updatedAt = new Date();
    const result = await db.update(books).set(updateData).where(eq(books.id, Id)).returning();
    return result[0];
}

export const deleteBook = async (Id: string) => {
    const result = await db.delete(books).where(eq(books.id, Id)).returning();
    return result[0];
}