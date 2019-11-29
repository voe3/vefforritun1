import loadLecture from './lib/display-lecture';
import init from './lib/display-list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  if (isLecturePage) {
    loadLecture();
  } else {
    init(page);
  }
});
