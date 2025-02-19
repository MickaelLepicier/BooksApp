import { RateBySelect } from './RateBySelect.jsx'
import { RateByStars } from './RateByStars.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'

export function Rating({ cmpType, rating, handleChange }) {
  switch (cmpType) {
    case 'select':
      return <RateBySelect rating={rating} handleChange={handleChange} />

    case 'numInput':
      return <RateByTextbox rating={rating} handleChange={handleChange} />

    case 'stars':
      return <RateByStars rating={rating} handleChange={handleChange} />

    default:
      console.error('No cmpType has been found: ', cmpType)
      break
  }
}

// Put onChangeCmpType function here and all the label and input