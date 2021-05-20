import Abstract from './abstract.js';

const headerControlsTemplate = () => {
  return'<div class="trip-main__trip-controls  trip-controls"></div>';
};


export default class HeaderControlContainer extends Abstract {
  getTemplate() {
    return headerControlsTemplate();
  }
}
