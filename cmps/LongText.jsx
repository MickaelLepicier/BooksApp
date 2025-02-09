const { useState } = React

export function LongText({ description }) {
  if (!description) return ''
  if (description.length <= 100) return description

  const [isShown, setIsShown] = useState(false)

  const firstText = description.slice(0, 100)
  const btnMsg = isShown ? 'Read Less' : 'Read More'
  const currText = isShown ? description : `${firstText}...`

  return (
    <React.Fragment>
      {currText}
      <button onClick={() => setIsShown(!isShown)}>{btnMsg}</button>
    </React.Fragment>
  )
}
