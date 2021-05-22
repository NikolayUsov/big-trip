import Abstract from './abstract.js';

const Filter = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PAST: 'Past',
};

const createFilterItem = (filter, currentFilter = Filter.EVERYTHING) => {
  return `<div class="trip-filters__filter">
<input id="filter-${filter.toLowerCase()}"
class="trip-filters__filter-input  visually-hidden"
type="radio"
name="trip-filter"
value="${filter.toLowerCase()}"
${filter === currentFilter ? 'checked' : ''}>
  <label class="trip-filters__filter-label" for="filter-${filter.toLowerCase()}">${filter}</label>
</div>`;
};

const createFilterList = (currentFilter) => {
  const filters = [];
  for (const key in Filter) {
    filters.push(createFilterItem(key, currentFilter));
  }

  return filters.join('');
};

const createFilterTemplate = (currentFilter) => {
  return `<form class="trip-filters" action="#" method="get">
    ${createFilterList(currentFilter)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class FilterView extends Abstract {
  constructor(currentFilter) {
    super();
    this._data = currentFilter;
  }

  getTemplate() {
    return createFilterTemplate(this._data);
  }
}

