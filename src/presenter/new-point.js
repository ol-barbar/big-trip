import {renderElement, RenderPosition, changeElement, updateElement, remove, SortType, sortPointByDate, sortPointByTime, sortPointByPrice} from '../util.js'
import {TripPointView} from '../view/trip-point.js'
import {TripPointEditorView} from '../view/trip-point-editor.js'
// import {PointsModel} from './../model/points.js'
// import {Trip} from './point.js'

import {UserAction, UpdateType} from './../mock.js'

import { nanoid } from 'nanoid'

// const POINT_MODE = {
//     VIEW: 'view',
//     EDITOR: 'editor'
// }


export class NewPoint {
    constructor(tripPointContainer, changePoint) { // offers
        this._tripPointContainer = tripPointContainer.getElement()

        this._tripPointEditor = null

        this._changePoint = changePoint

        this._onEscPress = this._onEscPress.bind(this)
        this._onFormSubmit = this._onFormSubmit.bind(this)
        this._onFormDelete = this._onFormDelete.bind(this)
    }

    init() {
        if (this._tripPointEditor !== null) {
            return
        }
        // this._point = point

        this._tripPointEditor = new TripPointEditorView()//(this._point)

        this._tripPointEditor.setButtonSubmitClick(this._onFormSubmit) 
        this._tripPointEditor.setButtonDeleteClick(this._onFormDelete)

        renderElement(this._tripPointContainer, this._tripPointEditor, RenderPosition.AFTERBEGIN)
        document.addEventListener('keydown', this._onEscPress)
    }

    destroy() {
        if (this._tripPointEditor === null) {
            return
        }
        remove(this._tripPointEditor)
        this._tripPointEditor = null
        document.removeEventListener('keydown', this._onEscPress)
    }

    _onEscPress(evt) {
        if (evt.key === 'Escape' || evt.keyCode === 27) {
            evt.preventDefault()
            this.destroy()
        }
    }

    _onFormSubmit(point) {
        this._changePoint(UserAction.ADD_POINT,
                          UpdateType.MINOR,
                          Object.assign({ id: nanoid() }, point)
        )
        this.destroy()
    }

    _onFormDelete() {
        this.destroy()
    }
}

