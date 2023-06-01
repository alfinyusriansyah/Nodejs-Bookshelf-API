const { nanoid } = require('nanoid');
const books = require('./books')

// ------------------ Add and save Book ----------------------------
const addBookHandler =  (request, h) => {
    const { name, year,author,summary,publisher, 
        pageCount, readPage, reading} = request.payload;
    
    // generate id unik sepanjang 16 karakter
    const id = nanoid(16);
    // make a date and update
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    if(!name){
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;

    }else if (readPage > pageCount) {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
      }
    
    // fill in value in the array book using push() method
    const newBooks = {
        id, name, year,author,summary,publisher, 
        pageCount, readPage, finished, reading, insertedAt, updatedAt
      };

    books.push(newBooks);  
    // check newbBook already in the array book ? 
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(400);
      return response;
};

// ------------------ Display all book ----------------------------

const getAllBookHandler = () => {
  const booksList = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return {
    status: 'success',
    data: {
       books: booksList.slice(0,2)
    }
}
}

// ------------------ Get Detail Book ----------------------------

const getDetailBookHandler = (request, h) => {
  const {id} = request.params
  const book = books.find((book) => book.id === id);
  // console.log(book);
  if(book !== undefined){
      const response = h.response({
          status: 'success',
          data: { 
              book,
          },
      })
      response.code(200);
      return response ;
  }    

  const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
      })
      response.code(404);
      return response ; 
};

// ------------------ Update Book ----------------------------

const updateBookHandler = (request, h) => {
  const {id} = request.params
  const { name, year, author, summary, 
      publisher, pageCount, readPage, reading } = request.payload;


          if(!name){
            const response = h.response({
              status: 'fail',
              message: 'Gagal memperbarui buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
          }
          
          if (readPage > pageCount) {
            const response = h.response({
              status: 'fail',
              message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
          });
          response.code(400);
          return response;
          }
      
          const updatedAt = new Date().toISOString();
          const index = books.findIndex((book) => book.id === id);
        
    if(index !== -1){
      books[index] = {
        ...books[index],
        name, year, author,summary, 
        publisher, pageCount, readPage, reading,updatedAt,
    }

      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } 



module.exports = { addBookHandler, getAllBookHandler, getDetailBookHandler, updateBookHandler };