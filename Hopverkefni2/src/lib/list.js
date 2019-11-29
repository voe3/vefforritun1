import empty, { getLectures, createListElement } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  /**
   *
   * @param {Array} types
   * Birtir lectures af flokkum í type.
   * Ef type er empty loadast allir lectures.
   */
  load(types) {
    empty(this.container);
    // Listi yfir öll lecture elements
    getLectures().then((data) => {
      const { lectures } = data;
      // Leitum yfir öll lecture element og birtum þau sem beðið er um
      for (let i = 0; i < lectures.length; i += 1) {
        if (!(Array.isArray(types)) || types.length === 0 || types.includes(lectures[i].category)) {
          const lecture = createListElement(
            lectures[i].thumbnail, lectures[i].title, lectures[i].category, lectures[i].slug,
          );
          this.container.appendChild(lecture);
        }
      }
    }).catch((e) => { throw new Error(e); });
  }
}
