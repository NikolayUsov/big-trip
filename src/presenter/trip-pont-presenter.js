import { remove, render, RenderPosition, replace } from '../utils/render.js';
import TripPointView from '../view/trip-point-card.js';
import EditPointView from '../view/edit-point-form.js';
export default class TripPointPresenter{
  constructor(container, handleChangePointOnView, destinationMap, offersMap){
    this._container = container;
    this._handleChangePointView = handleChangePointOnView;
    this._pointComponent = null;
    this._pointData = null;
    this._editFormComponent = null;
    this._destinationMap = destinationMap;
    this._offersMap = offersMap;
    this._handlerOnButtonShowEditForm = this._handlerOnButtonShowEditForm.bind(this);
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

    this._pointComponent.setHandlerOnButtonShowEditForm(this._handlerOnButtonShowEditForm);
  }

  destroy(){
    remove( this._pointComponent);
  }

  _handlerOnButtonShowEditForm(){
    this._editFormComponent = new EditPointView(this._pointData, this._destinationMap,  this._offersMap);
    replace(this._editFormComponent,  this._pointComponent);
  }

  _handleOnSubmitEditForm(){
    this._handleChangePointView(updateType, userAction, update)
  }

  setSubmitEditFormHandler(

  )
}
