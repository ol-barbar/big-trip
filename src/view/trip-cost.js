// import {createElement} from './util.js'
// import {AbstractView} from './abstract.js'
import {AbstractView} from '../abstract.js'

//надо будет менять value

const getTripCostTemplate = () => {
  return `<p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
          </p>`
}

export class TripCostView extends AbstractView {
  getTemplate() {
    return getTripCostTemplate()
  }
}

// export {getTripCostTemplate,TripCostView}