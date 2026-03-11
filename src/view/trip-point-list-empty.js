// import {AbstractView} from './abstract.js'
import {AbstractView} from '../abstract.js'

const getTripPointListEmpty = () => {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`
}

export class TripPointListEmptyView extends AbstractView {
  getTemplate() {
    return getTripPointListEmpty()
  }
}

// export {TripPointListEmptyView}