import PointsModel from '../model/trip-points-model.js';
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessStatus = {
  FROM: 200,
  TO: 299,
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints(){
    return this._load({url: 'points'})
      .then(Api.getJSON)
      .then((points) => points.map(PointsModel.adaptToСlient));
  }


  getDestination(){
    return this._load({url: 'destinations'})
      .then(Api.getJSON);
  }

  getOffers() {
    return this._load({url: 'offers'})
      .then(Api.getJSON);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) {
    headers.append('Authorization', this._authorization);
    return fetch (`${this._endPoint}/${url}`, {method,body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response){
    if (response.status < SuccessStatus.FROM || response.status > SuccessStatus.TO) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }

  static getJSON(response) {
    return response.json();
  }
}
