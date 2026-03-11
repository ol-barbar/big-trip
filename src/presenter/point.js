import {renderElement, RenderPosition, changeElement, updateElement, remove, SortType, sortPointByDate, sortPointByTime, sortPointByPrice} from '../util.js'
import {TripPointView} from '../view/trip-point.js'
import {TripPointEditorView} from '../view/trip-point-editor.js'
// import {PointsModel} from './../model/points.js'
// import {Trip} from './point.js'

import {UserAction, UpdateType} from './../mock.js'

const POINT_MODE = {
    VIEW: 'view',
    EDITOR: 'editor'
}

export class Point {
    constructor(tripPointContainer, changePoint, changeMode) {
        this._tripPointContainer = tripPointContainer.getElement()

        this._tripPoint = null
        this._tripPointEditor = null

        this._changePoint = changePoint
        this._changeMode = changeMode
        this._pointMode = POINT_MODE.VIEW

        this._getEditor = this._getEditor.bind(this)
        this._getPoint = this._getPoint.bind(this)
        this._getEscPress = this._getEscPress.bind(this)
        this._getFavoriteClick = this._getFavoriteClick.bind(this)
        this._onFormSubmit = this._onFormSubmit.bind(this)

        this._onFormDelete = this._onFormDelete.bind(this)
    }

    init(point) {
        this._point = point

        const prevTripPoint = this._tripPoint
        const prevTripPointEditor = this._tripPointEditor

        this._tripPoint = new TripPointView(this._point)
        this._tripPointEditor = new TripPointEditorView(this._point)

        this._tripPoint.setButtonCloseClick(this._getEditor)
        this._tripPointEditor.setButtonCloseClick(this._getPoint)
        this._tripPointEditor.setButtonSubmitClick(this._getPoint)
        this._tripPoint._setFavoriteClick(this._getFavoriteClick)
        this._tripPointEditor.setButtonSubmitClick(this._onFormSubmit) 

        this._tripPointEditor.setButtonDeleteClick(this._onFormDelete)



        if (prevTripPoint === null || prevTripPointEditor === null) {
            renderElement(this._tripPointContainer, this._tripPoint, RenderPosition.BEFOREEND) 
            return
        }

        if (this._tripPointContainer.contains(prevTripPoint.getElement())) {
            changeElement(this._tripPointContainer, prevTripPoint, this._tripPoint)
        }

        remove(prevTripPoint)
        remove(prevTripPointEditor)
    }

    destroy() {
        remove(this._tripPoint)
        remove(this._tripPointEditor)
    }

    _getEscPress(evt) {
        if (evt.key === 'Escape' || evt.keyCode === 27) {
            evt.preventDefault()
            this._getPoint()
        }
    }

    _getEditor() { // из точки в форму
        changeElement(this._tripPointContainer, this._tripPoint, this._tripPointEditor)
        document.addEventListener('keydown', this._getEscPress)
        this._changeMode()
        this._pointMode = POINT_MODE.EDIT
    }

    _getPoint() { // из формы в точку
        this._tripPointEditor.resetInput(this._point)
        changeElement(this._tripPointContainer, this._tripPointEditor, this._tripPoint)
        document.removeEventListener('keydown', this._getEscPress)
        this._pointMode = POINT_MODE.VIEW
    }

    _onFormSubmit(point) {
        this._getPoint()
        this._changePoint(UserAction.UPDATE_POINT,
                          UpdateType.MINOR,
                          point
        )
    }

    _onFormDelete(point) {
        this._changePoint(UserAction.DELETE_POINT,
                          UpdateType.MINOR,
                          point
        )
    }

    _getFavoriteClick() {
        this._changePoint(
            UserAction.UPDATE_TASK,
            UpdateType.MINOR,
            Object.assign(
                {},
                this._point,
                {
                    favorite: !this._point.favorite,
                },
            ),
        )
    }

    _resetTripPointView() {
        if (this._pointMode !== POINT_MODE.VIEW) {
            this._getPoint()
        }
    }
}