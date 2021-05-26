import { remove, render, RenderPosition } from '../utils/render';
import  Loading from '../view/loading-view.js';
import Sort from '../view/sort-view.js';
import { Filter, SortType, UpdateType, FilterFunction, UserAction } from  '../utils/const.js';
import TripPointPresenter from './trip-pont-presenter.js';
import TripListContainer from '../view/trip-list-container.js';
import { sortByDay } from '../utils/sorting.js';


export default class BoardPresenter {
  constructor(container, pointsModel,filterModel, api) {
    this._boardContainer = container;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._pointsContiner = null;
    this._sortComponent = null;
    this._destinationMap = new Map();
    this._offersMap = new Map();
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

  _handlerFromModel(typeUpdate, updatePoint){
    switch(typeUpdate){
      case UpdateType.INIT:
        remove(this._loadingComponent);
        this._renderPointsContainer();
        this._renderBoard();
        this._api.getDestination()
          .then((destinations) => {
            destinations.forEach((destination) => this._destinationMap.set(destination.name, destination));
          });

        this._api.getOffers()
          .then((offers) => {
            offers.forEach((offer) => this._offersMap.set(offer.type, offer.offers));
          });
        break;
      case UpdateType.PATH:
        this._pointsPresenter[updatePoint.id].init(updatePoint);
        break;
      case UpdateType.MAJOR:
        this._clearPointPresenters();
        this._renderBoard();
        break;
    }
  }

  _handleFromView(updateType, userAction, update){
    switch(userAction){
      case UserAction.UPDATE_POIN:
        this._pointsModel.updatePoint(updateType, update);
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
    const tripPoint = new TripPointPresenter(this._tripListContainer, this._handleFromView, this._destinationMap, this._offersMap);
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
