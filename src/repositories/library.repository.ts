import { eq, count, sql } from 'drizzle-orm';
import { db } from '~/db/drizzle';
import { books } from '~/db/schema/book.schema';
export async function getLibraryStatus() {
    const [result] = await db
        .select({
            totalBooks: count(books.id),
            totalAvailable: count(
                sql`case when ${eq(books.isAvailable, true)} then 1 end`
            ),
        })
        .from(books);
    return {
        totalBooks: Number(result?.totalBooks ?? 0),
        totalAvailable: Number(result?.totalAvailable ?? 0),
    };
}