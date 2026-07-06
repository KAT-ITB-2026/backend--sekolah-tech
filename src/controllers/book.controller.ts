import { getBookById, getBooks, getKondisi, insertNewBook, patchBook } from "~/repositories/book.repository";
import { getBookRoute, getById, getCondition, newBook, editBook} from "~/routes/book.route";
import { createRouter } from "~/utils/router-factory";

export const bookRouter = createRouter();

bookRouter.openapi(getCondition, async (c) => {
    try {
        const data = await getKondisi();
        return c.json(data, 200);
    } catch (error) {
        console.error('Galat mengambil total buku:', error);
        return c.json({ error: 'Internal server error' }, 500);
    }
});

bookRouter.openapi(getBookRoute, async (c) => {
    try{
        const query = c.req.valid('query');
        const booksData = await getBooks(query.isAvailable);
        return c.json(booksData, 200);
    } catch (error){
        console.error('Galat mengambil buku:', error);
        return c.json({error: 'Internal server error'}, 500);
    }
})

bookRouter.openapi(getById, async (c) => {
    try{
        const { bookid } = c.req.valid('query');
        console.log("Book ID yang diterima:", bookid);
        const booksData = await getBookById(bookid);
        return c.json(booksData, 200);
    } catch (error){
        console.error('Galat mengambil buku:', error);
        return c.json({error: 'Internal server error'}, 500);
    }
})

bookRouter.openapi(newBook, async (c) => {
    try{
        const {id,title,author,yearpublish} = c.req.valid("query");
        const booksData = await insertNewBook(id,title,author,yearpublish);
        return c.json(booksData,200);
    } catch (error){
        console.error('Galat memasukan buku:', error);
        return c.json({error: 'Internal server error'}, 500);
    }
})

bookRouter.openapi(editBook, async (c)=>{
    try{
        const {id,title,author,isavaliable,yearpublish} = c.req.valid("query");
        const booksData = await patchBook(id,title,author,isavaliable,yearpublish);
        return c.json(booksData,200);
    } catch (error){
        console.error('Galat mengedit buku:', error);
        return c.json({error: 'Internal server error'}, 500);
    }
})