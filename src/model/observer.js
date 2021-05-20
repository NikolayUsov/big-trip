export default class Observer {
  constructor () {
    this._observers = [];
  }

  addToObserver (cb){
    this._observers.push(cb);
  }

  removeObserver(cb){
    this._observers.filter((observer) => observer !== cb);
  }

  _notify(event, payload) {
    this._observers.forEach((observe) => observe(event, payload));
  }
}
