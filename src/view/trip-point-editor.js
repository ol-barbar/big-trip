import {Smart} from './smart.js'
import {pointTypeList, cityList, destinationData, offersList, getOffersArray, getOffersData} from './../mock.js'
import {getActualDestination} from '../util.js'
// import {getOffersItem} from './trip-point-offers.js'
import {getRandom} from '../random-func.js'

// import dayjs from 'dayjs'

import flatpickr from 'flatpickr'
import '../../node_modules/flatpickr/dist/flatpickr.min.css'
import dayjs from 'dayjs'

// id: nanoid(),
//         nameCity: cityList[getRandom(RANDOM_MIN, RANDOM_MAX)],
//         type: pointTypeList[getRandom(RANDOM_MIN, RANDOM_MAX)],
//         // description: descriptionList[getRandom(RANDOM_MIN, RANDOM_MAX)],
//         // pictures: picturesData,
//         offers: getOffersArray(), // массив заполненный объектами
//         favorite: Boolean(getRandom(0, 1)),
//         price: getRandom(20, 200),
//         date: dateGenerator()

// const dateNow = dayjs()
// console.log(dateNow)

const EMPTY_POINT = {
  id: '',
  nameCity: cityList[getRandom(0, cityList.length-1)],
  type: pointTypeList[getRandom(0, pointTypeList.length-1)],
  offers: [],
  favorite: '',
  price: getRandom(20, 200),  
  date: {
    from: dayjs().toDate(),
    to: dayjs().toDate(),
  }
}

// console.log(EMPTY_POINT.date)

const createEventTypeItem = (typeList, currentType) => {
  return typeList.map((typeItem) => `<div class="event__type-item">
                                      <input id="event-type-${typeItem}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem}" ${typeItem === currentType ? 'checked' : ''}>
                                      <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-1">${typeItem}</label>
                                    </div>`).join('')
}

const createDestinationItem = (DestinationList) => {
  return DestinationList.map((DestinationItem) => `<option value="${DestinationItem.destination}"></option>`).join('')
}

const createDestinationDescription = (description) => {
  return description.length > 0 ?
          `<p class="event__destination-description">${description}</p>`
        : ''
}

const createDestinationPictures = (pictures) => {
  return pictures.length > 0 ?
          `<div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo">`).join('')}
            </div>
          </div>`
        : ''
}

const createDestinationInfo = (destinationDescription, destinationPictures) => {
  return destinationDescription.length > 0 || destinationPictures.length > 0 ? 
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${createDestinationDescription(destinationDescription)}</p>
      ${createDestinationPictures(destinationPictures)}
      </section>` : ''
}

const createOffer = (data) => {
  // console.log(data)
  return data.length > 0 ?
   `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${data.map(({offer, offerPrice}) => {
        const check = data.some(item => item.offer === offer)
        const checkStatus = check ? 'checked' : ''
        const className = offer.split(' ').pop()
        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${className}-1" type="checkbox" name="event-offer-${className}" ${checkStatus}>
          <label class="event__offer-label" for="event-offer-${className}-1">
            <span class="event__offer-title">${offer}</span> +€&nbsp;
            <span class="event__offer-price">${offerPrice}</span>
          </label>
        </div>`
      }).join('')}
      </div>
    </section>` : ''
}

// const getRandomOffer = () => {
  // offersList список офферов
  // getOffersArray массив объектов с оффераами и ценами 
  // getOffersData объект из оффера и цены

// }

const getTripPointEditor = (data) => {
  let actualDestinationDescription = getActualDestination(data, destinationData, 'description')
  let actualDestinationPictures = getActualDestination(data, destinationData, 'pictures')

    return `<li class="trip-events__item">
                <form class="event event--edit" action="#" method="post">
                    <header class="event__header">
                      <div class="event__type-wrapper">
                        <label class="event__type  event__type-btn" for="event-type-toggle-1">
                          <span class="visually-hidden">Choose event type</span>
                          <img class="event__type-icon" width="17" height="17" src="img/icons/${data.type}.png" alt="Event type icon">
                        </label>
                        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                        <div class="event__type-list">
                          <fieldset class="event__type-group">
                            <legend class="visually-hidden">Event type</legend>
                              ${createEventTypeItem(pointTypeList, data.type)}
                          </fieldset>
                        </div>
                      </div>

                      <div class="event__field-group  event__field-group--destination">
                        <label class="event__label  event__type-output" for="event-destination-1">
                          ${data.type}
                        </label>
                        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${data.nameCity}" list="destination-list-1">
                        <datalist id="destination-list-1">
                          ${createDestinationItem(destinationData)}
                        </datalist>
                      </div>

                      <div class="event__field-group  event__field-group--time">
                        <label class="visually-hidden" for="event-start-time-1">From</label>
                        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${data.date.from}">
                        —
                        <label class="visually-hidden" for="event-end-time-1">To</label>
                        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${data.date.to}">
                      </div>

                      <div class="event__field-group  event__field-group--price">
                        <label class="event__label" for="event-price-1">
                          <span class="visually-hidden">Price</span>
                          €
                        </label>
                        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${data.price}">
                      </div>

                      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                      <button class="event__reset-btn" type="reset">Delete</button>
                      <button class="event__rollup-btn" type="button">
                        <span class="visually-hidden">Open event</span>
                      </button>
                    </header>
                    <section class="event__details">
                      ${createOffer(data.offers)}
                      ${createDestinationInfo(actualDestinationDescription, actualDestinationPictures)}
                    </section>
                </form>
            </li>`
}

//event__section--destination вынесено в отдельную функцию с тернарным оператором, мб не надо, подумать на случай пустого дестинейшен

export class TripPointEditorView extends Smart {
  constructor(data = EMPTY_POINT) {
    super()
    this._data = TripPointEditorView.parseDataToPoint(data)
    this._datepickerFrom = null
    this._datepickerTo = null

    this._callback = {}
    this._onButtonCloseClick = this._onButtonCloseClick.bind(this)
    this._onButtonSubmitClick = this._onButtonSubmitClick.bind(this)

    this._onDestinationType = this._onDestinationType.bind(this) 
    this._onDestinationInput = this._onDestinationInput.bind(this) 

    this._onEventDateFrom = this._onEventDateFrom.bind(this) 
    this._onEventDateTo = this._onEventDateTo.bind(this) 

    this._setDatepickerFrom(this._datepickerFrom)
    this._setDatepickerTo(this._datepickerTo)

    this._setInnerListeners()

    this._onButtonDeleteClick = this._onButtonDeleteClick.bind(this) // _formDeleteClickHandler
  }

  static parsePointToData(data) {
    return Object.assign(
      {},
      data,
    )
  }

  static parseDataToPoint(state) {
    state = Object.assign(
      {},
      state,
    )
    return state
  }

  getTemplate() {
    return getTripPointEditor(this._data)
  }

  resetInput(pointData) {
    this.updateData(TripPointEditorView.parseDataToPoint(pointData))
  }

  updateElement() {
    const prevElement = this.getElement()
    const parent = prevElement.parentElement
    this.removeElement()
    const newElement = this.getElement()
    parent.replaceChild(newElement, prevElement)
    this.restoreListeners()
  }

  updateData(update) {
    if (!update) {
      return
    }
    this._data = Object.assign(
      {},
      this._data,
      update,
    )
    this.updateElement()
  }

  _setInnerListeners() { 
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._onDestinationType)
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._onDestinationInput)
  }

  restoreListeners() {
    this._setInnerListeners()
    this.setButtonCloseClick(this._callback.pointButtonClick)
    this.setButtonSubmitClick(this._callback.pointButtonSubmitClick)

    this.setButtonDeleteClick(this._callback.pointButtonDeleteClick)

    this._setDatepickerFrom(this._datepickerFrom)
    this._setDatepickerTo(this._datepickerTo)
  }

  _onDestinationType(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return
    }
    this.updateData({
      type: evt.target.value,
      offers: getOffersArray(),
    })
  }

  _onDestinationInput(evt) {
    if (!cityList.includes(evt.target.value)) {
      return
    }
    evt.preventDefault()
    this.updateData({
      nameCity: evt.target.value,
    })
  }

  _setDatepickerFrom(datepickerFrom) {
    if (datepickerFrom) {
      datepickerFrom.destroy()
      datepickerFrom = null
    }
      datepickerFrom = flatpickr( // ?
      this.getElement().querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: new Date(this._data.date.from),
        onChange: this._onEventDateFrom,
      },
      )
      return
  }

  _setDatepickerTo(datepickerTo) {
    if (datepickerTo) {
      datepickerTo.destroy()
      datepickerTo = null
    }
      datepickerTo = flatpickr( // ?
      this.getElement().querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: new Date(this._data.date.to),
        onChange: this._onEventDateTo,
      },
      )
      return
  }

  _onEventDateFrom([userDateFrom]) {
    const differenceValue = this._data.date.to - userDateFrom
    if (differenceValue < 0) {
      alert("Время начала события не может быть позже окончания")
      return
    }
    this.updateData({
      date: {
        from: userDateFrom,
        to: this._data.date.to,
      },
    })
  }

  _onEventDateTo([userDateTo]) {
    const differenceValue = userDateTo - this._data.date.from
    if (differenceValue < 0) {
      alert("Время окончания события не может быть раньше окончания")
      return
    }
    this.updateData({
      date: {
        from: this._data.date.from,
        to: userDateTo,
      },
    })
  }

  _onButtonCloseClick(evt) {
    this._callback.pointButtonClick()
  }

  setButtonCloseClick(callback) {
    this._callback.pointButtonClick = callback
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._onButtonCloseClick)
  }

  _onButtonSubmitClick(evt) { 
    evt.preventDefault()
    this._callback.pointButtonSubmitClick(TripPointEditorView.parseDataToPoint(this._data)) 
  }

  setButtonSubmitClick(callback) { 
    this._callback.pointButtonSubmitClick = callback 
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._onButtonSubmitClick) 
  }

  _onButtonDeleteClick(evt) {
    evt.preventDefault()
    this._callback.pointButtonDeleteClick(TripPointEditorView.parseDataToPoint(this._data)) // ne to?
  }

  setButtonDeleteClick(callback) {
    this._callback.pointButtonDeleteClick = callback 
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._onButtonDeleteClick)

  }




}




  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  // removeElement() {
  //   super.removeElement()
  //   if (this._datepicker) {
  //     this._datepicker.destroy()
  //     this._datepicker = null
  //   }
  // }