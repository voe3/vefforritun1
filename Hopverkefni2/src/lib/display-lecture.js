import empty, { getLectures } from './helpers';
import createLecture from './lecture';

export default function loadLecture() {
  getLectures().then((lectures) => {
    const data = lectures.lectures;
    // sækjum hvaða fyrirlestur var ýtt á
    const url = new URLSearchParams(window.location.search);
    const slug = url.get('slug');
    let index = 0;
    // leitum af fyrirlestri í lectures.json
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].slug === slug) {
        index = i;
        break;
      }
    }
    const fyrirlestur = data[index];
    // setja allt inn úr þeim fyrirlestri
    const main = document.querySelector('.main');
    empty(main);
    const d = createLecture(fyrirlestur);
    main.appendChild(d);
  }).catch((e) => { throw new Error(e); });
}
