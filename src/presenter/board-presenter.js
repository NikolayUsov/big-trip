import { remove, render, RenderPosition } from '../utils/render';
import  Loading from '../view/loading-view.js';
import Sort from '../view/sort-view.js';
import { SortType, UpdateType } from  '../utils/const.js';
import TripPointPresenter from './trip-pont-presenter.js';
import TripListContainer from '../view/trip-list-container.js';
import { sortByDay } from '../utils/sorting.js';


export default class BoardPresenter {
  constructor(container, pointsModel) {
    this._boardContainer = container;
    this._pointsModel = pointsModel;
    this._pointsContiner = null;
    this._sortComponent = null;
    this._tripListContainer = new TripListContainer();
    this._currentSort = SortType.DAY;

    this._handlerFromModel = this._handlerFromModel.bind(this);

    this._pointsModel.addToObserver(this._handlerFromModel);

  }
  init(){
    this._renderLoading();
  }

  _getPoints() {
    const pointsData = this._pointsModel.getPoints();
    switch(this._currentSort){
      case SortType.DAY:
        pointsData.sort(sortByDay);
    }

    return pointsData;
  }

  _handlerFromModel(typeUpdate){
    switch(typeUpdate){
      case UpdateType.INIT:
        remove(this._loadingComponent);
        render(this._boardContainer, this._tripListContainer, RenderPosition.BEFOREEND);
        this._renderBoard();
    }
  }

  _renderBoard() {
    this._renderSort();
    this._renderPoints();
  }

  _renderPoint(pointData){
    const tripPoint = new TripPointPresenter(this._tripListContainer);
    tripPoint.init(pointData);
  }

  _renderPoints() {
    const pointForRender = this._getPoints();
    pointForRender.forEach((point) => this._renderPoint(point));
  }

  _renderSort(){
    if(this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new Sort(this._currentSort);
    render( this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    this._loadingComponent = new Loading();
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }
}
