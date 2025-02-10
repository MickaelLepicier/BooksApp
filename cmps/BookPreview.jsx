import { getCurrencySymbol } from "../services/util.service.js"

export function BookPreview({ book }) {
  const { title, price, currencyCode, thumbnail, imgSrc } = book

  const currencySymbol = getCurrencySymbol(currencyCode)

  

  return (
    <React.Fragment>
      <img src={thumbnail || imgSrc} alt="book-image" />
      <h2>{title}</h2>
      <p>{price} {currencySymbol}</p>
    </React.Fragment>
  )
}
