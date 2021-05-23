import { Filter } from '../utils/const';
import Observer from './observer';

export default class FilterModel extends Observer {
  constructor(){
    super();
    this._currentFilter = Filter.EVERYTHING;
  }

  setFilter(activeFilter, updateType) {
    this._currentFilter = activeFilter;
    this._notify(updateType);
  }

  getFilter(){
    return this._currentFilter;
  }
}
