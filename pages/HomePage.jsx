import { animateCSS } from '../services/util.service.js'
// Animate css: https://animate.style/

const { useRef } = React

export function HomePage() {
  const h1Ref = useRef()
  const imgRef = useRef()

  function onActivate() {
    animateCSS(h1Ref.current, 'rubberBand').then(() => {
      animateCSS(imgRef.current, 'bounceOut', false)
    })
  }
  return (
    <section className="home">
      <button onClick={onActivate}>Activate</button>
      <h1 ref={h1Ref}>Book's R Us!</h1>
      <img ref={imgRef} src="../assets/img/react.png" alt="react-img" />
    </section>
  )
}
