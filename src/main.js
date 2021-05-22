import Api from './api/api.js';
import PointsModel from './model/trip-points-model.js';
import TripInfo from './view/trip-info.js';
import Navigation from './view/navigation.js';
import { render, RenderPosition } from './utils/render.js';
import Filter from './view/filter.js';
import { UpdateType } from './utils/const.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const navigationContainer = document.querySelector('.trip-controls__navigation');
const filterContainer = document.querySelector('.trip-controls__filters');
const boardContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripInfoComponent = new TripInfo();
const navigationComponent = new Navigation();
const filterComponent = new Filter();
const boardPresentor = new BoardPresenter(boardContainer, pointsModel);
boardPresentor.init();


const SERVER_URL = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic: nikusn';
const api = new Api(SERVER_URL, AUTHORIZATION);

render(tripInfoContainer, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(navigationContainer,navigationComponent,RenderPosition.BEFOREEND);
render(filterContainer, filterComponent, RenderPosition.BEFOREEND);

const successStartApp = (points) => {
  pointsModel.setPoints(UpdateType.INIT, points);
};

api.getPoints()
  .then(successStartApp);

