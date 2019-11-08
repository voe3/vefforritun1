const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let input; 
  let items; 

  function init(_form, _items) {
    items = _items;
    input = _form.querySelector('input');
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka

    // For-lykkja: allir takkar sem eyða í items
    for (let item of items.querySelectorAll('.item__button')) {
      item.addEventListener('click', deleteItem);
    }

    // For-lykkja:  allir checkboxar í items
    for (let box of items.querySelectorAll('.item__checkbox')) {
      box.addEventListener('click', finish);
    }

    // For-lykkja: öll span í items
    for (let span of items.querySelectorAll('.item__text')) {
      span.addEventListener('click', edit);
    }

    // For-lykkja: allt það sem verið er að edita í items
    for (let edit of items.querySelectorAll('.item__edit')) {
      edit.addEventListener('keypress', commit);
    }

  }

  function formHandler(e) {
    e.preventDefault();

    const value = input.value;

    if ((value.length > 0)) {
      add(input.value);
    }
    input.value = ''; 
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    const span = e.target.nextElementSibling;
    if (e.target.checked) {
      span.style.textDecoration = 'line-through';
    } else {
      span.style.textDecoration = 'none';
    }
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    const span = e.target;
    const item = span.parentElement;
    const gamallTexti = span.childNodes[0].nodeValue;
    const input = el('input', 'item__edit', commit);
    input.value = gamallTexti;
    item.replaceChild(input, e.target);
    input.focus();
    input.addEventListener('keypress', commit)
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    let keyCode = e.keyCode;
    if (keyCode == ENTER_KEYCODE) {
      let input = e.target;
      let currentText = input.value;
      let item = input.parentElement;
      let span = el('span', 'item__text', edit);
      span.appendChild(document.createTextNode(currentText));
      item.replaceChild(span, e.target);
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    const elementItem = document.createElement('li');
    elementItem.classList.add('item');

    const textItem = document.createTextNode(value);

    const spanItem = document.createElement('span');
    spanItem.classList.add('item__text');
    spanItem.appendChild(textItem);

    const buttonText = document.createTextNode('Eyða');

    const buttonItem = document.createElement('button');
    buttonItem.classList.add('item__button');
    buttonItem.appendChild(buttonText);

    const checkboxItem = document.createElement('input');
    checkboxItem.setAttribute('type', 'checkbox');
    checkboxItem.classList.add('item__checkbox');

    elementItem.appendChild(checkboxItem);
    elementItem.appendChild(spanItem);
    elementItem.appendChild(buttonItem);

    items.appendChild(elementItem);

    //Látum add fallið fara aftur yfir for-lykkurnar til að fara aftur yfir listan
    // For-lykkja: allir takkar sem eyða í items
    for (let item of items.querySelectorAll('.item__button')) {
      item.addEventListener('click', deleteItem);
    }

    // For-lykkja:  allir checkboxar í items
    for (let box of items.querySelectorAll('.item__checkbox')) {
      box.addEventListener('click', finish);
    }

    // For-lykkja: öll span í items
    for (let span of items.querySelectorAll('.item__text')) {
      span.addEventListener('click', edit);
    }

    // For-lykkja: allt það sem verið er að edita í items
    for (let edit of items.querySelectorAll('.item__edit')) {
      edit.addEventListener('keypress', commit);
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.preventDefault;

    this.parentNode.remove();

  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const element = document.createElement(type);
    element.setAttribute('class', className);
    element.addEventListener('click', clickHandler);
    return element;
  }

  return {
    init: init
  }
})();
