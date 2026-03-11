// import {createElement} from './util.js'
// import {AbstractView} from './abstract.js'
import {AbstractView} from '../abstract.js'

// title нужно будет менять
// даты нужно будет менять

const getTripInfoTemplate = () => {
    return `<section class="trip-main__trip-info trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>

            
          </section>`
}

export class TripInfoView extends AbstractView {
  getTemplate() {
    return getTripInfoTemplate()
  }
}

// export {getTripInfoTemplate, TripInfoView}