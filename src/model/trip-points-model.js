import Observer from './observer.js';
import {deepClone} from '../utils/common.js';
export default class TripPointsModel extends Observer{
  constructor () {
    super();
    this._points = [];
  }

  setPoints(points){
    this._points = points.slice();
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updatePoint){
    const index = this._points.findIndex((point) => point.id === updatePoint.id);
    if (index === -1){
      throw new Error('Can not find element');
    }
    this._points = [
      ...this._points.slice(0, index),
      updatePoint,
      ...this._points.slice(index+1),
    ];
  }

  deletePoint(deletePoint){
    this._points = this._points.filter((point) => point.id !== deletePoint.id);
  }

  addPoint(addPoint){
    this._points.push(addPoint);
  }

  static adaptToСlient (tripPoint){
    let adaptedPoint = deepClone(tripPoint);
    adaptedPoint = Object.assign({},
      adaptedPoint,
      {
        basePrice: adaptedPoint.base_price,
        dateFrom: adaptedPoint.date_from,
        dateTo: adaptedPoint.date_to,
        isFavorite: adaptedPoint.is_favorite,
      },
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }
}
