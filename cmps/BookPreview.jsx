export function BookPreview({ book }) {
  const { id, title, price, imgSrc, } = book

  // const imgSrc = `../assets/img/${imgName}.jpg`

  // const imgNames = getImgNames()
  // console.log('imgNames: ', imgNames)


  return (
    <React.Fragment>
      <img src={imgSrc} alt="book-image" />
      <h2>{title}</h2>
      <p>{price}$</p>
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
