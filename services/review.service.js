import { bookService } from './book.service.js'
import { makeId } from './util.service.js'

export const reviewService = {
  addReview,
  removeReview,
  getEmptyReview
}

function addReview(bookId, review) {
  review.id = makeId()
  return bookService
    .get(bookId)
    .then((book) => {
      book.reviews.unshift(review)
      return bookService.save(book).then(() => review)
    })
    .catch((err) => console.log('err: ', err))
}

function removeReview(bookId, reviewId) {
  return bookService
    .get(bookId)
    .then((book) => {
      const newReviews = book.reviews.filter((review) => review.id !== reviewId)
      book.reviews = newReviews
      return bookService.save(book)
    })
    .catch((err) => console.log('err: ', err))
}

function getEmptyReview() {
  return {
    fullName: 'new name',
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    txt: '',
    selected: 0
  }
}
