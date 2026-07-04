import { db } from './drizzle.js';
import { books } from './schema/book.schema.js';

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    isAvailable: true,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: 1960,
    isAvailable: true,
  },
  {
    title: '1984',
    author: 'George Orwell',
    publishedYear: 1949,
    isAvailable: false,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publishedYear: 1813,
    isAvailable: true,
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    publishedYear: 1951,
    isAvailable: false,
  },
];

export async function seedBooks() {
  try {
    console.log('Starting library seeding...');

    // Test database connection first
    console.log('Testing database connection...');

    // Clear existing books
    await db.delete(books);
    console.log('Cleared existing books');

    // Insert sample books
    const insertedBooks = await db.insert(books).values(sampleBooks).returning();
    return insertedBooks;
  } catch (error) {
    console.error('Error seeding books:', error);
    console.error('Make sure:');
    console.error('   - Your database is running (docker-compose up -d)');
    console.error(
      '   - You have run migrations (bun db:push or bun db:migrate)',
    );
    console.error('   - Your DATABASE_URL is correct in .env');
    throw error;
  }
}

// Always run the seeder when this file is executed
console.log('Running database seeder...');
seedBooks()
  .then(() => {
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
