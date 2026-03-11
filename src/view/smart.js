import {AbstractView} from '../abstract.js'

export class Smart extends AbstractView {
  constructor() {
    super()
    this._data = {}
  }

    restoreHandlers() {
        // реализовать в наследнике !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11111
        // восстанавливает обработчики после перерисовки
        throw new Error('Abstract method not implemented: resetHandlers')
    }


    
    updateElement() {
        // удаляет старый дом элемент компонента
        // создает новый дом элемент
        // помещает новый дом элемент вместо старого
        // вызывает restoreHandlers (восстанавливает обработчики)

        const oldElement = this.getElement()
        const parent = oldElement.parentElement
        this.removeElement()
        const newElement = this.getElement()
        parent.replaceChild(newElement, oldElement)
        this.restoreHandlers()
    }



    // update, justDataUpdating
    updateData() {
        // обновляет данные
        // при необходимости вызывает updateElement

        if (!update) {
            return
        }

        this._data = Object.assign(
            {},
            this._data,
            update,
        )

        if (justDataUpdating) {
            return
        }
    
        this.updateElement()
    }
}