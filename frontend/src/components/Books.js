import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Books() {
    
    const [books,setBooks] = useState([])
    //variables to store user choice
    const [choice,setChoice] = useState(null)

    //function to get books from server
    async function getBooks(){
        // return 'hehe'
        const response = await axios.get("http://localhost:3001/api/books")
        console.log(response.data)
        setBooks(response.data)
    }

    //function to add book to cart
    async function buyBook(e){
        // return "hehe"
        setChoice(e.target.id)
        console.log(typeof(choice))
        console.log(typeof books[0]?.id)
        // var book_id = books.find(({id}) => id === choice)
        
        if (Array.isArray(books) && books.length > 0) {
          // console.log(typeof books[0]?.id);
          var book= books.find(({ id }) => id === Number(choice));
          console.log(book);}
        
        await axios.post('http://localhost:3001/api/cart', {
            id: book.id,
            author: book.author,
            title: book.title,
            price: book.price
            
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        

    } 



    useEffect(() => {
        getBooks()
    },[])

    return (
        <div>
          {books.map((book, index) => (
            <div key={index}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>ID: {book.id}</p>
              <p>Price: {book.price}</p>
              <button id={book.id} onClick={buyBook}>Purchase</button>
            </div>
          ))}

        </div>
      );}
      