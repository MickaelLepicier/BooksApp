
export function BookPreview() {
    const book = { fullname: 'Puki Reactof', score: 87 }
    
    return (
        <section className="book-preview">
            <h2>{book.fullname}</h2>
            <h3>Score: {book.score}</h3>
        </section>
    )
}