const { useState, useEffect, useRef } = React

export function LongText({ description }) {
  // console.log('description: ',description.length);
  if (description.length <= 100) return description

  // const [btnMsg, setBtnMsg] = useState('Read More')

  const [isShown, setIsShown] = useState(false)

  const firstText = description.slice(0, 100)
  // console.log('description: ',description);
  // console.log('firstText: ',firstText);

  const btnMsg = isShown ? 'Read Less' : 'Read More'

  const currText = isShown ? description : `${firstText}...`

  return (
    <React.Fragment>
      {currText}
      <button onClick={() => setIsShown(!isShown)}>{btnMsg}</button>
    </React.Fragment>
  )
}
