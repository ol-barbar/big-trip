import {renderElement, RenderPosition, changeElement, updateElement, remove, SortType, sortPointByDate, sortPointByTime, sortPointByPrice} from '../util.js'
import {TripInfoView} from '../view/trip-info.js'
import {TripCostView} from '../view/trip-cost.js'
import {SortView} from '../view/sort.js'
// import {getnewTripTemplate, NewTrip} from './view/new-trip.js'
import {TripPointView} from '../view/trip-point.js'
import {TripPointListEmptyView} from '../view/trip-point-list-empty.js'
import {TripPointListView} from '../view/trip-point-list.js'
import {TripPointEditorView} from '../view/trip-point-editor.js'
// import {PointsModel} from './../model/points.js'
import {Point} from './point.js'
import {NewPoint} from './new-point.js'

import {UserAction, UpdateType} from './../mock.js'

const POINT_MODE = {
    VIEW: 'view',
    EDITOR: 'editor'
}

export class Trip {
    constructor(headerNavigationContainer, tripInfoContainer, tripBoardContainer, pointModel) {
        this._pointModel = pointModel

        this._headerNavigationContainer = headerNavigationContainer // headerNavigation
        this._tripInfoContainer = tripInfoContainer // tripInfo
        this._tripBoardContainer = tripBoardContainer // tripBoard

        this._point = {}
        this._tripPoint = {} // presenter
        this._currentSortType = SortType.DAY
        
        this._emptyTrip = new TripPointListEmptyView()
        this._tripInfo = new TripInfoView()
        this._tripCost = new TripCostView()
        this._sort = new SortView()
        this._tripPointList = new TripPointListView()

        this._getModeChange = this._getModeChange.bind(this) 
        this._getSortTypeChange = this._getSortTypeChange.bind(this)

        this._handleViewAction = this._handleViewAction.bind(this)
        this._handleModelEvent = this._handleModelEvent.bind(this)

        this._pointModel.addObserver(this._handleModelEvent)

        this._newPointPresenter = new NewPoint(this._tripPointList, this._handleViewAction)
    }

    init() { // (data)
        // this._data = data.slice() // ошибка?
        // this._sourcedTripPoints = data.slice()

        this._renderPage()
        // this._renderAllTripPoints() // this._data
        this._renderList()
    }

    renderNewPoint() { // createPoint
        this._newPointPresenter.init()
        this._currentSortType = SortType.DAY
        // this._filterModel.setActiveFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        
    }

    _renderEmptyTrip() {
        // рендеринг пустого списка
        renderElement(this._tripBoardContainer, this._emptyTrip, RenderPosition.BEFOREEND)    
    }

    _renderTripInfo() {
        // рендеринг информации трипа
        renderElement(this._headerNavigationContainer, this._tripInfo, RenderPosition.AFTERBEGIN)
    }

    _renderTripCost() {
        // рендеринг стоимости трипа
        renderElement(this._tripInfoContainer, this._tripCost, RenderPosition.BEFOREEND)
    }

    _renderSort() {
        // рендеринг сортировки трипа

        if (this._sort !== null) {
            this._sort = null
        }
        this._sort = new SortView() // this._currentSortType

        this._sort.setSortTypeChange(this._getSortTypeChange)   


        renderElement(this._tripBoardContainer, this._sort, RenderPosition.BEFOREEND)
         
    }

    _renderTripPointList() {
        // рендеринг списка трипа
        renderElement(this._tripBoardContainer, this._tripPointList, RenderPosition.BEFOREEND) 
    }

    _renderTripPoint(point) {
        // const tripPoint = new Point(this._tripPointList, this._updatePoint, this._getModeChange)
        const tripPoint = new Point(this._tripPointList, this._handleViewAction, this._getModeChange) // ошибка? 
        tripPoint.init(point)
        this._tripPoint[point.id] = tripPoint
    }

    _renderAllTripPoints(points) {
        // this._data.slice().forEach((point) => this._renderTripPoint(point))
        points.forEach((point) => this._renderTripPoint(point))
    }

    // _updatePoint(updatedPoint) {
        // this._data = updateElement(this._data, updatedPoint) // обновляет массив
        // this._sourcedTripPoints = updateElement(this._sourcedTripPoints, updatedPoint)


        // вызов обновления модели
        // this._tripPoint[updatedPoint.id].init(updatedPoint) // вызывает инит для отрисованной точки
    // }

    _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
        case UserAction.UPDATE_POINT:
            this._pointModel.updatePOINT(updateType, update)
            break
        case UserAction.ADD_POINT:
            this._pointModel.addPOINT(updateType, update)
            break
        case UserAction.DELETE_POINT:
            this._pointModel.deletePOINT(updateType, update)
            break
        default:
        throw new Error('Unknown action-type. Check UserAction value')
        }
    }

    _handleModelEvent(updateType, data) {
        switch (updateType) {
            case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
                this._tripPoint[data.id].init(data)
                break
            case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
                this._clearList()
                this._renderList()
                break
            case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
                this._clearList({resetSortType: true}) //resetRenderedTaskCount: true, 
                this._renderList()
                break
        }
    }

    // _clearTripPointList() {
    //     Object
    //         .values(this._tripPoint)
    //         .forEach((point) => point.destroy())
    //     this._tripPoint = {}
    // }

    _getModeChange() {
        Object
            .values(this._tripPoint)
            .forEach((point) => point._resetTripPointView())
    }

    // _sortPoints(sortType) { 
    //     switch (sortType) {
    //         case SortType.DAY:
    //             this._data = this._sourcedTripPoints.slice();
    //             break
    //         case SortType.TIME:
    //             this._data.sort(sortPointByTime)
    //             break
    //         case SortType.PRICE:
    //             this._data.sort(sortPointByPrice)
    //             break
    //         default:
    //             throw new Error('Error')
    //     }

    //     this._currentSortType = SortType
    // }

    _getSortTypeChange(SortType) {
        if (this._currentSortType === SortType) {
            return
        }
        // this._sortPoints(SortType)
        this._currentSortType = SortType
        // this._clearTripPointList()
        this._clearList({resetSortType: false})
        // this._renderAllTripPoints()
        this._renderList()
    }

    _renderPage() {
        if (this._getPoints().length === 0) {
            this._renderEmptyTrip()
            return
        } else {
            this._renderTripInfo()
            this._renderTripCost()
            this._renderSort()
            this._renderTripPointList()
        }
    }

    _getPoints() {
        switch (this._currentSortType) {
            case SortType.DAY:
                // this._data = this._sourcedTripPoints.slice();
                // break
                return this._pointModel.getPoints().slice().sort()
            case SortType.TIME:
                // this._data.sort(sortPointByTime)
                // break
                return this._pointModel.getPoints().slice().sort(sortPointByTime)
            case SortType.PRICE:
                // this._data.sort(sortPointByPrice)
                // break
                return this._pointModel.getPoints().slice().sort(sortPointByPrice)
            default:
                throw new Error('Error')
        }
        return this._pointModel.getPoints()
    }

    _clearList({resetSortType = false} = {}) { //resetRenderedTaskCount = false, 
        // const pointCount = this._getPoints().length
        Object
            .values(this._tripPoint)
            .forEach((point) => point.destroy())
        this._tripPoint = {}
        // remove(this._sort) // удаляется сортировка
        if (resetSortType) {
          this._currentSortType = SortType.DAY
        }
    }

    _renderList() {
        const points = this._getPoints()
        const pointCount = points.length
        if (pointCount === 0) {
            this._renderNoTasks()
            return
        }
        this._renderAllTripPoints(points)
    }
}


