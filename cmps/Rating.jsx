import { RateBySelect } from './RateBySelect.jsx'
import { RateByStars } from './RateByStars.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'

// TODO Fix the Bugs
export function Rating({ cmpType, rating, handleChange }) {
  console.log('cmpType: ', cmpType)
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

{
  /*

TODO make it dynamic comp

Dynamic Components
• Support 3 different ways of rating a book using 3 types of dynamic
components which receive a val prop and fire a selected event
- <RateBySelect>
- <RateByTextbox>
- <RateByStars>
Let the user choose his preferred way of rating by using radio buttons.
          
            <RateBySelect>
            <RateByTextbox>
            <RateByStars></RateByStars>

            */
}
