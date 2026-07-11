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
    return await db.select().from(books).where(eq(books.id, id));
}
export const createBook =  async(book: {title: string, author: string, publishedYear?: number}) => {
    return await db.insert(books).values({...book, isAvailable: true}).returning();
}
export const editBook = async(id:string, book:{title:string, author:string, publishedYear:number,isAvailable:boolean}) =>{
    return await db.update(books).set(book).where(eq(books.id, id)).returning();
}
export const deleteBook = async(id: string)=> {
    return await db.delete(books).where(eq(books.id, id)).returning();
}