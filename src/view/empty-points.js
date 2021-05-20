import Abstract from './abstract.js';

const createEmptyTemplate = () => {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
};

export default class EmptyPoints extends Abstract {
  getTemplate(){
    return createEmptyTemplate();
  }
}
