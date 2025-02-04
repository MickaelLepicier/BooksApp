//
//

const { useState, useEffect, useRef } = React

export function BookIndex() {
  //   const [books, setBooks] = useState()

  const obj = {
    id: 'OXeMG8wNskc',
    title: 'metus hendrerit',
    description: 'placerat nisi sodales suscipit tellus',
    thumbnail: 'http://ca.org/books-photos/20.jpg',
    listPrice: {
      amount: 109,
      currencyCode: 'EUR',
      isOnSale: false
    }
  }

  const [books, setBooks] = useState(obj)
  console.log('books: ', books)
  return (
    <section>
      <h1>Books</h1>
    </section>
  )
}
