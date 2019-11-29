import { isDone } from './storage';

export default function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, className, ...children) {
  const element = document.createElement(name);
  if (className) {
    element.classList.add(className);
  }
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }
  return element;
}

/**
 * @returns {Promise}
 */
export async function getLectures() {
  return fetch('./lectures.json')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Villa við að sækja gögn');
    });
}

/**
 *
 * @param {string} img
 * @param {string} title
 * @param {string} category
 * @param {string} slug
 */
export function createListElement(img, title, category, slug) {
  const listEl = el('a', 'lectures__col', el('div', 'lecture', el('img', 'lecture__img'), el('div', 'lecture__header', el('div', 'lecture__text', el('div', 'lecture__text__category'), el('div', 'lecture__text__title')), el('div', 'lecture__checked'))));
  const imgEl = listEl.querySelector('.lecture__img');
  listEl.href = `./fyrirlestur.html?slug=${slug}`;
  if (img) imgEl.src = img;
  const catEl = listEl.querySelector('.lecture__text__category');
  catEl.appendChild(document.createTextNode(category));
  const titleEl = listEl.querySelector('.lecture__text__title');
  titleEl.appendChild(document.createTextNode(title));
  const doneEl = listEl.querySelector('.lecture__checked');
  doneEl.appendChild(document.createTextNode('✓'));
  if (isDone(slug)) {
    doneEl.classList.remove('lecture__checked');
    doneEl.classList.add('lecture__checked--done');
  }
  return listEl;
}
