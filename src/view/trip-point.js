import {AbstractView} from '../abstract.js'
import {getOffersItem} from './trip-point-offers.js'
import {getDateDifference, getYearMonthDay, getYearMonthDayHoursMinutes, getHoursMinutes} from '../util.js'

const getTripPoint = (data) => {
  // console.log(data.date.from)
  const isFavorite = data.favorite ? 'event__favorite-btn--active' : ''
  const dateDifference = getDateDifference(data.date.from, data.date.to)
  return `<li class="trip-events__item">
  <div class="event">
      <time class="event__date" datetime="${getYearMonthDay(data.date.from)}">
        ${data.date.from.toLocaleString('en-US', {month: 'short', day: 'numeric'})}
      </time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${data.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${data.type} ${data.nameCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getYearMonthDayHoursMinutes(data.date.from)}">${getHoursMinutes(data.date.from)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getYearMonthDayHoursMinutes(data.date.to)}">${getHoursMinutes(data.date.to)}</time>
        </p>
        <p class="event__duration">${dateDifference}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${data.price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${getOffersItem(data.offers)} 
      </ul>
      <button class="event__favorite-btn ${isFavorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`
}

export class TripPointView extends AbstractView {
  constructor(data) {
    super()
    this._data = data
    this._callback = {}
    this._onButtonCloseClick = this._onButtonCloseClick.bind(this)
    this._onFavoriteClick = this._onFavoriteClick.bind(this)
  }

  getTemplate() {
    return getTripPoint(this._data)
  }

  _onButtonCloseClick(evt) {
    this._callback.pointButtonClick()
  }

  setButtonCloseClick(callback) {
    this._callback.pointButtonClick = callback
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._onButtonCloseClick)
  }

  _onFavoriteClick(evt) {
    this._callback.pointFavoriteClick()
  }

  _setFavoriteClick(callback) {
    this._callback.pointFavoriteClick = callback
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._onFavoriteClick)
  }
}
