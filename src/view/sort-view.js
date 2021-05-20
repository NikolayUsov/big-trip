import Abstract from './abstract.js';

const SortType = {
  Day: 'Day',
  Event: 'Event',
  Time: 'Time',
  Price: 'Price',
  Offers: 'Offers',
}


const sortItemsTemplate = (sort, currenSort) => {
  return `<div class="trip-sort__item  trip-sort__item--${sort.toLowerCase()}">
<input
id="sort-${sort.toLowerCase()}"
class="trip-sort__input  visually-hidden"
type="radio" name="trip-sort"
value="sort-${sort.toLowerCase()}"
${sort === currenSort ? 'checked' : ''}>
<label class="trip-sort__btn" for="sort-${sort.toLowerCase()}">${sort}</label>
</div>`
}

const createSortList = (currentSort) => {
const sortList = [];
  for (const sort of SortType) {
    sortList.push(sortItemsTemplate(sort, currentSort))
  }
  return sortList.join('');
}

const sortTemplate = (currentSort) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${createSortList(currentSort)}
</form>`
}

export default class SortView extends Abstract {
  constructor(currentSort) {
    super();
    this._data = currentSort;
  }

  getTemplate() {
    return sortTemplate(this._data)
  }
}
