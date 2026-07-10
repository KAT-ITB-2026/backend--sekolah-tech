import { eq } from 'drizzle-orm';

import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export const getAllBooks = async (isAvailable?: boolean) => {
    if(isAvailable === undefined){
        return db.select().from(books);
    }
    return db.select().from(books).where(eq(books.isAvailable,isAvailable));
}