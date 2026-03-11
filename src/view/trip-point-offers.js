export const getOffersItem = (data) => {
  return data !== undefined ? data.map(({offer, offerPrice}) => 
    `<li class="event__offer">
      <span class="event__offer-title">${offer}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
    </li>`
  ).join('') : ``
}
