// import {createElement} from './util.js'
// import {AbstractView} from './abstract.js'
import {AbstractView} from '../abstract.js'


const getMenuTemplate = () => {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
                <a class="trip-tabs__btn" href="#">Table</a>
                <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
              </nav>`
}

export class MenuView extends AbstractView {
  getTemplate() {
    return getMenuTemplate()
  }
}

// export {getMenuTemplate, MenuView}