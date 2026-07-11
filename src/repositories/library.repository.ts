import { count, eq } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';

export async function getLibraryStatus() {
    
    const [totalResult] = await db.select({ value: count()}).from(books);
    const [availableResult] = await db
        .select({ value : count() })
        .from(books)
        .where(eq(books.isAvailable, true));

    return {
        totalBooks: totalResult?.value ?? 0,
        totalAvailable : availableResult?.value ?? 0,
    };
}