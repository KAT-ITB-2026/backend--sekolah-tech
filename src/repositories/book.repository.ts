import { eq, count } from "drizzle-orm";
import { db } from "~/db/drizzle";
import { books } from "~/db/schema/book.schema";

export const getKondisi = async () => {
    const [totalBooks] = await db.select({ value: count() }).from(books);
    const [totalAvailable] = await db
    .select({ value: count() })
    .from(books)
    .where(eq(books.isAvailable, true));

    return {
    totalBooks: totalBooks?.value ?? 0,
    totalAvailable: totalAvailable?.value ?? 0,
    };
}
export const getBooks = async (avaliable?: boolean) => {
  const baseQuery = db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      yearpublish: books.publishedYear, 
      avaliable: books.isAvailable,    
      created: books.createdAt,         
      updated: books.updatedAt          
    })
    .from(books);

  if (avaliable !== undefined) {
    return await baseQuery.where(eq(books.isAvailable, avaliable));
  }

  return await baseQuery;
};