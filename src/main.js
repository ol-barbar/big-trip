import {renderElement, RenderPosition, changeElement} from './util.js'
import {MenuView} from './view/menu.js'
import {FilterView} from './view/filter.js'
import {getPointData} from './mock.js'
import {PointsModel} from './model/points.js'
// import dayjs from 'dayjs'
// dayjs.extend(duration)

import {Trip} from './presenter/page.js'

const LIST_COUNT = 5

let pointArray = new Array(LIST_COUNT).fill().map(getPointData) // новый массив из LIST_COUNT элементов заполняется моками
// console.log(pointArray)


const pointsModel = new PointsModel()
pointsModel.setPoints(pointArray)




const pageBody = document.querySelector('.page-body')
const headerNavigation = pageBody.querySelector('.trip-controls__navigation')
const tripInfo = pageBody.querySelector('.trip-main')
// const filterElement = siteBodyElement.querySelector('.trip-controls__filters')
const tripBoard = pageBody.querySelector('.trip-events')


renderElement(headerNavigation, new MenuView(), RenderPosition.BEFOREEND) // тоже перенести

const tripControls = tripInfo.querySelector('.trip-main__trip-controls')

renderElement(tripControls, new FilterView(), RenderPosition.BEFOREEND) // тоже перенести

const pagePresenter = new Trip(headerNavigation, tripInfo, tripBoard, pointsModel)




pagePresenter.init()


// filter init

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault()
  pagePresenter.renderNewPoint()
})


// const tripPointList = tripBoard.querySelector('.trip-events__list');

// for (let i = 0; i < pointArray.length; i++) {
//   console.log(pointArray[i].date.from.format('DD/MM/YYYY'))
// }

