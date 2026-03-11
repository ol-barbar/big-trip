import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import {getRandom} from './random-func.js'

let pointTypeList = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeng', 'restaurant']
let cityList = ['Amsterdam', 'Geneva', 'Chamonix', 'Milan', 'Berlin']
let offersList = ['Switch to business', 'Switch to comfort', 'Order Uber', 'Add luggage', 'Travel by train', 'Choose seats', 'Add meal', 'Rent car']

let descriptionList = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
                       'Cras aliquet varius magna, non porta ligula feugiat eget. Cras aliquet varius magna, non porta ligula feugiat eget.', 
                       'Fusce tristique felis at fermentum pharetra. Fusce tristique felis at fermentum pharetra.', 
                       'Aliquam id orci ut lectus varius viverra. Aliquam id orci ut lectus varius viverra.', 
                       'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.']

// let photoPlug = 'https://loremflickr.com/248/152?random='

const RANDOM_MIN = 0
const RANDOM_MAX = 4

let getOffersData = () => {
    let offersItem = {
    offer: offersList[getRandom(RANDOM_MIN, offersList.length-1)],
    offerPrice: getRandom(10, 100)
    }
    return offersItem
}

let getOffersArray = () => {
    let offersData = new Array(getRandom(RANDOM_MIN, RANDOM_MAX)).fill().map(getOffersData)
    return offersData
}

const createDate = () => {
    let startDate = dayjs().add(10, 'd')
    return () => {
        const dateFrom = dayjs(startDate).add(0, 'm')
        const dateTo = dayjs(dateFrom).add(getRandom(1, 1440), 'm')
        startDate = dateTo
        return {
            from: dateFrom.toDate(),
            to: dateTo.toDate()
        }
    }
}

const dateGenerator = createDate()

let getPointData = () => {
    let pointData = {
        id: nanoid(),
        nameCity: cityList[getRandom(RANDOM_MIN, RANDOM_MAX)],
        type: pointTypeList[getRandom(RANDOM_MIN, RANDOM_MAX)],
        offers: getOffersArray(), // массив заполненный объектами
        favorite: Boolean(getRandom(0, 1)),
        price: getRandom(20, 200),
        date: dateGenerator()        
    }
    return pointData
}

const getPicture = () => {
    let templatePicturesArray = new Array(getRandom(0, 5)).fill(`https://loremflickr.com/248/152?random=${getRandom(0, 10)}`)
    let picturesArray = templatePicturesArray.map(() => {return `https://loremflickr.com/248/152?random=${getRandom(0, 10)}`})
    return picturesArray
}

const destinationData = cityList.map((city, i) => ({
  destination: city,
  description: descriptionList[i],
  pictures: getPicture()
}))

// console.log(destinationData)

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
}

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
}


export {offersList, getPointData, pointTypeList, cityList, destinationData, getOffersArray, getOffersData}