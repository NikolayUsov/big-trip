import { remove, render, RenderPosition, replace } from '../utils/render.js';
import TripPointView from '../view/trip-point-card.js';
export default class TripPointPresenter{
  constructor(container){
    this._container = container;
    this._pointComponent = null;
    this._pointData = null;
  }

  init(pointData) {
    this._pointData = pointData;
    const prevPointComponent = this._pointComponent;
    this._pointComponent = new TripPointView( this._pointData);

    if (prevPointComponent === null) {
      render(this._container, this._pointComponent, RenderPosition.BEFOREEND);
    } else {
      replace(this._pointComponent, prevPointComponent);
    }
  }

  destroy(){
    remove( this._pointComponent);
  }
}
