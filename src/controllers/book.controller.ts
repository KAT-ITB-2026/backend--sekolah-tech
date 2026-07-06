import { bookRepository } from '../repositories/book.repository';

export const getAllBooks = async (c: any) => {
  const books = await bookRepository.getAllBooks();
  return c.json({ data: books });
};