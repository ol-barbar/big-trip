import {Observer} from '../observer.js'

export class PointsModel extends Observer {
    constructor() {
        super()
        this._points = []
    }

    setPoints(points) {
        this._points = points.slice()
    }

    getPoints() {
        return this._points
    }

    updatePOINT(updateType, update) {
        const index = this._points.findIndex((point) => point.id === update.id)
        if (index === -1) {
          throw new Error('Can\'t update point')
        }
        this._points = [
          ...this._points.slice(0, index),
          update,
          ...this._points.slice(index + 1),
        ]
        this._notify(updateType, update)
    }

    addPOINT(updateType, update) {
        this._points = [
          update,
          ...this._points,
        ]
        this._notify(updateType, update)
    }

    deletePOINT(updateType, update) {
        const index = this._points.findIndex((point) => point.id === update.id)
        console.log(this._points.length)
        if (index === -1) {
          throw new Error('Can\'t delete point')
        }
        this._points = [
          ...this._points.slice(0, index),
          ...this._points.slice(index + 1),
        ]
        this._notify(updateType)
    }
}
