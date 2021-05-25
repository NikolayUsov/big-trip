import Smart from './smart-component';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'transport', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const isCurrentOffers = (offer, checkedOffers) => {
  for(let i = 0; i < checkedOffers.length; i++){
    if(offer.title === checkedOffers[i].title){
      return true;
    }
  }
  return false;
};

const createTypeList = (currentType) => {
  return TYPES.map((type) => {
    return`<div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
     value="${type}"
     ${currentType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase()+type.slice(1)}</label>
  </div>`;
  }).join('');
};

const createOfferTemplate = (offer, activeOffers) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden"
  id="${offer.title.split(' ').join('-')}-1"
  type="checkbox"
  value="${offer.title}"
  data-price = "${offer.price}"
  name="event-${offer.title.split(' ').join('-')}"
  ${isCurrentOffers(offer, activeOffers) ? 'checked' : ''}>
  <label class="event__offer-label" for="${offer.title.split(' ').join('-')}-1">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
};

const createOffersList = (offers, activeOffers) => {
  return offers.map((offer) => {return createOfferTemplate(offer, activeOffers);}).join('');
};

const createDestinationList = (destinations) => {
  return destinations.map((destination) => {
    return `<option value="${destination}"></option>`;
  }).join('');
};

const createPhotosList = (photos) => {
  return photos.map(({src, description}) => {
    return `<img class="event__photo" src="${src}" alt="${description}">`;
  });
};

const editPointTemplate = (point, destinationMap, offersMap) => {
  const {basePrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    type,
    isTypeChange,
  } = point;
  const offers = isTypeChange ? [] : point.offers.slice();
  console.log(offers);
  const allOffers = offersMap.get(type);
  const allDestinations = [...destinationMap.keys()];
  const {description, name, pictures} = destinationMap.get(destination.name);
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createTypeList(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationList(allDestinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time event__input--time-start" id="event-start-time-1" type="text" name="event-start-time"
         value="${dayjs(dateFrom).format('DD/MM/YYYY hh:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
        value="${dayjs(dateTo).format('DD/MM/YYYY hh:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>

    <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${createOffersList(allOffers, offers)}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">${name}</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
         ${createPhotosList(pictures)}
        </div>
      </div>
    </section>
  </section>
  </form>
</li>`;
};

export default class EditPointView extends Smart {
  constructor(point, destinationMap, offersMap){
    super();
    this._data = EditPointView.parseDataToState(point);
    this._offersMap = offersMap;
    this._destinationMap = destinationMap;
    this._handleOnChangeType = this._handleOnChangeType.bind(this);
    this._handleOnChangeOffer = this._handleOnChangeOffer.bind(this);
    this._handleOnChangeDestination = this._handleOnChangeDestination.bind(this);
    this._handleOnInputPrice = this._handleOnInputPrice.bind(this);
    this.setHandlers();
    this.setFlatPicker();
  }

  setHandlers() {
    this.getElement().querySelector('.event__type-list').addEventListener('change', this._handleOnChangeType);
    this.getElement().querySelector('.event__available-offers').addEventListener('change', this._handleOnChangeOffer);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._handleOnChangeDestination);
    this.getElement().querySelector('.event__input--price').addEventListener('input',  this._handleOnInputPrice);
  }

  setFlatPicker(){
    const startDateInput = this.getElement().querySelector('.event__input--time-start');
    flatpickr(startDateInput,{});
  }

  restoreHandlers(){
    this.setHandlers();
  }

  getTemplate(){
    return editPointTemplate(this._data, this._destinationMap, this._offersMap);
  }

  _handleOnChangeDestination(evt){
    this.updateData(
      Object.assign(
        {},
        this._data,
        {destination: this._destinationMap.get(evt.target.value)},
      ),
    );
  }

  _handleOnChangeType(evt) {
    this.updateData(
      Object.assign({},
        this._data,
        {
          type: evt.target.value,
          offers: [],
        }),
    );
  }

  _handleOnChangeOffer(evt){
    if(evt.target.checked){
      this.updateData(
        Object.assign(
          {},
          this._data.offers.push({
            title: evt.target.value,
            price: evt.target.dataset.price,
          }),
        ),
      );
    } else {
      this.updateData(
        Object.assign(
          {},
          this._data,
          {offers: this._data.offers.filter((offer) => offer.title !== evt.target.value)},
        ),
      );
    }

  }

  _handleOnInputPrice(evt){
    this.updateData(
      Object.assign(
        {},
        this._data,
        {basePrice: evt.target.value},
      ),
      true,
    );
  }

  static parseDataToState(data) {
    Object.assign({}, data);
    return data;
  }
}
