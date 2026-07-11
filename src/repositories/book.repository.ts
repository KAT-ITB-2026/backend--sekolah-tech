import { eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';
import { type CreateBookInput, type UpdateBook} from '~/types/book.type';

export const getBooks = async(isAvailable?: boolean) => {
    if (isAvailable !== undefined) {
        return await db.select().from(books).where(eq(books.isAvailable, isAvailable));
    }
    return await db.select().from(books);
};

export const getBookById = async(id : string) => {
    const [book] = await db.select().from(books).where(eq(books.id, id));

    return book;
};

export const createBook = async(book : CreateBookInput) => {
    const [result] = await db.insert(books).values({
        title : book.title,
        author : book.author,
        publishedYear : book.publishedYear
    }).returning();
    return result;
};

export const updateBook = async(book : UpdateBook) => {
    const [updatedBook] = await db
        .update(books)
        .set({
            ...book.data,
            updatedAt: new Date()
        })
        .where(eq(books.id, book.id))
        .returning();
    return updatedBook;
}

export const deleteBook = async(id : string) => {
    await db.delete(books).where(eq(books.id, id));
};