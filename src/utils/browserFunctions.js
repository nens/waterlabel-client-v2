export function scrollElementIntoViewWorkaround (element) {
  // element must be valid html dom element

  // method used from:
  // https://stackoverflow.com/questions/24665602/scrollintoview-scrolls-just-too-far
  // answer from: Arseniy-II
  // const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset;
  // const yOffset = -10; 
  // window.scrollTo({
  //     top: yCoordinate + yOffset,
  //     behavior: 'smooth'
  // }); 
  // edit: above code is no longer needed because of addition block: start
  // future may use scroll if needed:
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}