import { getCurrencySymbol } from "../services/util.service.js"

export function BookPreview({ book }) {
  const { title, listPrice, thumbnail } = book

  const currencySymbol = getCurrencySymbol(listPrice.currencyCode)

  
  return (
    <React.Fragment>
      <img src={thumbnail } alt="book-image" />
      <h2>{title}</h2>
      <p>{listPrice.amount} {currencySymbol}</p>
    </React.Fragment>
  )
}
