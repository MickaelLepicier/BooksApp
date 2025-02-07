export function BookPreview({ book }) {
  const { id, title, imgSrc, listPrice } = book

  // const imgSrc = `../assets/img/${imgName}.jpg`

  // const imgNames = getImgNames()
  // console.log('imgNames: ', imgNames)

  // TODO add on the img "onSale" if isOnSale === true

  return (
    <React.Fragment>
      <img src={imgSrc} alt="book-image" />
      <h2>{title}</h2>
      <p>{listPrice.amount}$</p>
    </React.Fragment>
  )
}

function getImgNames() {
  let res = []

  for (let i = 1; i <= 20; i++) {
    res.push(i)
  }
  return res

  // later on just return [names of the imgs]
}
