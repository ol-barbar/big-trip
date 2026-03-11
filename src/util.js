import {AbstractView} from './abstract.js'
import dayjs from 'dayjs'

const createElement = (template) => {
  const newElement = document.createElement('div')
  newElement.innerHTML = template
  return newElement.firstChild
}

const getDateDifference = (from, to) => {
  const differenceValue = to - from
  const days = Math.floor(differenceValue / (1000 * 60 * 60 * 24))
  const hours = Math.floor((differenceValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((differenceValue % (1000 * 60 * 60)) / (1000 * 60))
  const formatNumber = (num) => String(num).padStart(2, '0')
  const parts = []
  if (days > 0) {
    parts.push(`${formatNumber(days)}D`);
  } if (hours > 0 || days > 0) {
    parts.push(`${formatNumber(hours)}H`);
  } if (minutes > 0 || hours > 0 || days > 0) {
    parts.push(`${formatNumber(minutes)}M`);
  } if (parts.length === 0) return '00M'
  return parts.join(' ')
}

const getYearMonthDay = (date) => {
  // 'YYYY-MM-DD'
  // console.log(date)
  // console.log(typeof date)
  const year = date.getFullYear()
  // console.log(year)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getYearMonthDayHoursMinutes = (date) => {
  // 'YYYY-MM-DD HH:mm'
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

const getHoursMinutes = (date) => {
  // 'HH:mm'
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// в эту функцию добавлена проверка на принадлежность к абстрактному классу
// если принадлежит контейнер/элемент, то использовать гетЭлемент
const renderElement = (container, element, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement()
  }
  if (element instanceof AbstractView) {
    element = element.getElement()
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element)
      break
    case RenderPosition.BEFOREEND:
      container.append(element)
      break
  }
}

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
}

const changeElement = (parentNode, oldChild, newChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement()
  }
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement()
  }
  if (parentNode.contains(oldChild)) {
    parentNode.replaceChild(newChild, oldChild)
  }
}

// export const updateElement = (points, updatePoint) => {
//   const index = points.findIndex((point) => point.id === updatePoint.id)
//   if (index === -1) {
//     return points
//   }
//   return [...points.slice(0, index), updatePoint, ...points.slice(index+1)]
// }

const remove = (component) => {
  if (component === null) {
    return
  }
  if (!(component instanceof AbstractView)) {
    throw new Error('Can remove only components')
  }
  component.getElement().remove()
  component.removeElement()
}

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
}

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0
  }

  if (dateA === null) {
    return 1
  }

  if (dateB === null) {
    return -1
  }

  return null
}

const sortPointByDate = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.date.from, pointB.date.from)

  if (weight !== null) {
    return weight
  }

  return dayjs(pointA.date.from).diff(dayjs(pointB.date.from))
}

const sortPointByTime = (pointA, pointB) => {
  const diffPointA = dayjs(pointA.date.from).diff(dayjs(pointA.date.to))
  const diffPointB = dayjs(pointB.date.from).diff(dayjs(pointB.date.to))
  const weight = getWeightForNullDate(diffPointA, diffPointB)

  if (weight !== null) {
    return weight
  }

  return diffPointB - diffPointA
}

const sortPointByPrice = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.price, pointB.price)

  if (weight !== null) {
    return weight
  }
  
  return pointA.price - pointB.price
}

const getActualDestination = (data, destinationArray, type = 'description') => {
  const foundDestination = destinationArray.find(i => i.destination === data.nameCity)
  return foundDestination ? foundDestination[type] : null
}

export {renderElement, getDateDifference, createElement, RenderPosition, changeElement, remove, SortType, sortPointByDate, sortPointByTime, sortPointByPrice, getActualDestination, getYearMonthDay, getYearMonthDayHoursMinutes, getHoursMinutes}