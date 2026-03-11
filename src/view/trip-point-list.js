// import {AbstractView} from './abstract.js'
import {AbstractView} from '../abstract.js'


const getTripPointList = () => {
  return `<ul class="trip-events__list">
          </ul>`
}

export class TripPointListView extends AbstractView {
  getTemplate() {
    return getTripPointList()
  }
}

// export {getTripPointList, TripPointListView}