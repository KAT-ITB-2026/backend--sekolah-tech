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