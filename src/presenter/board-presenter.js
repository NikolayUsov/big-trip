import { remove, render, RenderPosition } from '../utils/render';
import  Loading from '../view/loading-view.js';
import Sort from '../view/sort-view.js';
import { Filter, SortType, UpdateType, FilterFunction } from  '../utils/const.js';
import TripPointPresenter from './trip-pont-presenter.js';
import TripListContainer from '../view/trip-list-container.js';
import { sortByDay } from '../utils/sorting.js';


export default class BoardPresenter {
  constructor(container, pointsModel,filterModel) {
    this._boardContainer = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointsContiner = null;
    this._sortComponent = null;
    this._pointsPresenter = {};
    this._tripListContainer = new TripListContainer();
    this._currentSort = SortType.DAY;

    this._handlerFromModel = this._handlerFromModel.bind(this);

    this._pointsModel.addToObserver(this._handlerFromModel);
    this._filterModel.addToObserver(this._handlerFromModel);
  }
  init(){
    this._renderLoading();
  }

  _getPoints() {
    const pointsData = this._pointsModel.getPoints();
    const currentFilter = this._filterModel.getFilter();
    const renderedPoints = FilterFunction[currentFilter](pointsData);
    switch(this._currentSort){
      case SortType.DAY:
        renderedPoints.sort(sortByDay);
    }

    return renderedPoints;
  }

  _handlerFromModel(typeUpdate){
    switch(typeUpdate){
      case UpdateType.INIT:
        remove(this._loadingComponent);
        this._renderPointsContainer();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearPointPresenters();
        this._renderBoard();
        break;
    }
  }


  _renderBoard() {
    this._renderSort();
    this._renderPoints();
  }

  _clearPointPresenters() {
    Object.values(this._pointsPresenter).forEach((pointPresenter) => pointPresenter.destroy());
  }

  _renderPoint(pointData){
    const tripPoint = new TripPointPresenter(this._tripListContainer);
    tripPoint.init(pointData);
    this._pointsPresenter[pointData.id] = tripPoint;
  }

  _renderPointsContainer() {
    render(this._boardContainer, this._tripListContainer, RenderPosition.BEFOREEND);
  }

  _renderPoints() {
    const pointForRender = this._getPoints();
    pointForRender.forEach((point) => this._renderPoint(point));
  }

  _renderSort(){
    if(this._sortComponent !== null) {
      remove( this._sortComponent);
    }

    this._sortComponent = new Sort(this._currentSort);
    render( this._boardContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    this._loadingComponent = new Loading();
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }
}
