import Abstract from './abstract.js';

const containerTemplate = () => {
  return '<ul class="trip-events__list"></ul>';
};

export default class TripCardContiner extends Abstract {
  constructor(){
    super();
  }
  getTemplate(){
    return containerTemplate();
  }
}
