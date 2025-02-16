// export const utilService = {
//     // loadFromStorage,
//     // saveToStorage,
//     makeId,
//     makeLorem,
//     getRandomIntInclusive,
//     getDayName,
//     getMonthName,
//     animateCSS
// }

export function makeId(length = 6) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  const words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color',
    'of nature',
    'tuned',
    'to',
    'a live channel',
    'All',
    'this happened',
    'more or less',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    'a pleasure',
    'to',
    'burn'
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)]
    if (size >= 1) txt += ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

// function saveToStorage(key, value) {
//     localStorage.setItem(key, JSON.stringify(value))
// }

// function loadFromStorage(key) {
//     const data = localStorage.getItem(key)
//     return (data) ? JSON.parse(data) : undefined
// }

export function getCurrencySymbol(currencyCode) {
  // let symbol = '$'

  // if (currencyCode === 'EUR') {
  //   symbol = '€'
  // } else if (currencyCode === 'ILS') {
  //   symbol = '₪'
  // }

  // return symbol

  // switch (currencyCode) {
  //     case 'EUR':
  //         return '€'

  //     case 'ILS':
  //         return '₪'

  //     default: return '$'
  // }

  const currencyMap = {
    EUR: '€',
    ILS: '₪',
    USD: '$'
  }
// check about intl = about language and currency
  return currencyMap[currencyCode]
}

export function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: 'long' })
}

export function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  return monthNames[date.getMonth()]
}

export function updateRating(starsRef,rate) {
  const stars = starsRef.current.querySelectorAll('i')
  // console.log('stars: ',stars)

  stars.forEach((star, idx)=>{
    if(rate >= idx + 1 ) star.classList.add('active')
      else star.classList.remove('active')
  })
}

export function animateCSS(el, animation = 'bounce') {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    el.classList.add(`${prefix}animated`, animationName)
    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }

    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}



export function debounce(callback, wait) {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback(...args)
    }, wait)
  }
}