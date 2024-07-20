
const options = [
  {
    id: 'raw',
    name: 'Raw Earth',
    search: 'RAW EARTH'
  },

  {
    id: 'gummy',
    name: 'Gummies',
    search: 'GUMMIES'
  },

  {
    id: 'flower',
    name: 'Flowers',
    search: 'flower'
  }
]

let rowItems = [];

function getOptionById(id) {
  return options.find(x => x.id === id)
}

function getOptionElementById(id) {
  return document.getElementById(id)
}

function toggleFilter(value) {
  console.warn('filter Changed', value)
  const option = getOptionById(value.id)
  const optionSearch = option.search.toLowerCase();
  rowItems.forEach(item => {
    const text = item.innerText.toLowerCase();
    if (text.includes(optionSearch)) {
      console.error('Text match', { text, optionSearch })
      item.style.display = value.checked ? 'flex' : 'none'
    }
  })

}

function addEventHandler(optionElement) {
  optionElement.addEventListener("change", (event) => { toggleFilter({ id: event.target.id, checked: event.target.checked }) });
}

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
    return;
  }
  document.addEventListener('DOMContentLoaded', fn);
}

function generateOptionHtmlElement(option) {
  const div = document.createElement('div');
  div.innerHTML = `
  <input type="checkbox" id="${option.id}" name="filter" value="${option.id}" checked />
  <label for="${option.id}">${option.name}</label>
  `
  return div;
}

function createMainComponent() {
  const mainDiv = document.createElement('div');
  mainDiv.style = `z-index: 9999; border-style: solid; width: 200px; position: absolute; top: 5px; right: 5px; background-color: red;`
  let fieldSetHtml = `<fieldset>
  <legend>Filter Options</legend>`
  options.forEach(option => {
    const optionDiv = generateOptionHtmlElement(option)
    fieldSetHtml += optionDiv.outerHTML
  })
  // Other stuff here
  fieldSetHtml += `</fieldset>`;
  mainDiv.innerHTML = fieldSetHtml
  document.body.appendChild(mainDiv)
}

function addFilterListeners() {
  options.forEach(option => {
    const element = getOptionElementById(option.id);
    addEventHandler(element);
  })
}



ready(() => {
  rowItems = Array.from(document.getElementsByClassName('lv-table-view__row'))
  if (rowItems && rowItems.length > 0) {
    console.warn('Rows', rowItems.length)
    console.warn('First', { text: rowItems[0].innerText })
    createMainComponent();
    addFilterListeners();
  }
})
