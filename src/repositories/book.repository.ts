import { eq, count } from "drizzle-orm";
import { db } from "~/db/drizzle";
import { books } from "~/db/schema/book.schema";
import { createErrorResponse } from "~/utils/error-response-factory";
import { sql } from "drizzle-orm";
import { bookSchema } from "~/routes/book.route";
import { PgUpdateBase } from "drizzle-orm/pg-core";

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

export const getBookById = async (bookid: string | undefined) => {
    if(!bookid){
        createErrorResponse("GENERIC", "Need Book ID");
        return;
    }
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
        .from(books).where(eq(books.id, bookid));
    return await baseQuery;
}

export const insertNewBook = async(
  bookid: string,
  booktitle: string, 
  bookauthor: string,
  yearpublish: number | null,
  ) => {
    const baseQuery = db.insert(books).values({
      id:bookid,
      title:booktitle,
      author:bookauthor,
      publishedYear:yearpublish,
      isAvailable:true,
      createdAt:sql`CURRENT_TIMESTAMP`,
      updatedAt:sql`CURRENT_TIMESTAMP`,
    })
    return await baseQuery;
}

export const patchBook = async(
  bookid: string,
  booktitle: string, 
  bookauthor: string,
  isavaliable: boolean,
  yearpublish: number | null,
) => {
  const baseQuery = db.update(books).set({
    title:booktitle,
    author:bookauthor,
    isAvailable:isavaliable,
    publishedYear:yearpublish,
  }).where(eq(books.id, bookid));
  return await baseQuery;
}

export const removeBook = async(bookid: string | undefined)=>{
  if(!bookid){
    createErrorResponse("GENERIC", "Need Book ID");
    return;
  }
  const baseQuery = db.delete(books).where(eq(books.id, bookid));
  return await baseQuery;
}