const { addBookHandler, 
  getAllBookHandler,
  getDetailBookHandler, 
  updateBookHandler, 
  DeleteBooksHandler } = require("./handler");

const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },

    {
      method: 'GET',
      path: '/books',
      handler: getAllBookHandler ,
    },

    {
      method: 'GET',
      path: '/books/{id}',
      handler: getDetailBookHandler ,
    },

    {
      method: 'PUT',
      path: '/books/{id}',
      handler: updateBookHandler ,
    },

    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: DeleteBooksHandler ,
    },

  ];

  module.exports = routes;