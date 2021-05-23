import FilterFiew from '../view/filter.js';
import { remove, render, RenderPosition, replace} from '../utils/render.js';
import { UpdateType } from '../utils/const.js';
export default class FilterPresenter {
  constructor(container, filterModel) {
    this._container = container;
    this._filtermodel = filterModel;
    this._filterComponent = null;
    this._handleForFilterClick = this._handleForFilterClick.bind(this);
    this.init = this.init.bind(this);
    this._filtermodel.addToObserver(this.init);
  }

  init() {
    const activeFilter = this._filtermodel.getFilter();
    const prevElement = this._filterComponent;
    this._filterComponent = new FilterFiew(activeFilter);
    this._filterComponent.setFilterClickHandler(this._handleForFilterClick);

    if (prevElement === null) {
      render( this._container, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevElement);
    remove(prevElement);

  }

  _handleForFilterClick(currentFiltr) {
    this._filtermodel.setFilter(currentFiltr, UpdateType.MAJOR);
  }

}
