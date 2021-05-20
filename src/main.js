import Api from './api/api.js';
import PointsModel from './model/trip-points-model.js';

const SERVER_URL = 'https://14.ecmascript.pages.academy/big-trip';
const AUTHORIZATION = 'Basic: nikusn';
const api = new Api(SERVER_URL, AUTHORIZATION);
const pointsModel = new PointsModel();

const successStartApp = (points) => {
  pointsModel.setPoints(points);
};

api.getPoints()
  .then(successStartApp);

