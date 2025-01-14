export function useCommand() {
  const addEditChangeListener = (event, stateFunc) => {
    const userInput = event.target.value;
    const input = userInput.trim();
    stateFunc(input);
  };

  const addPageNumber = (arr, PageState, PageStateFunc) => {
    const newCount = PageState + 10;
    if (newCount < arr.length) {
      PageStateFunc(newCount);
    }
  };

  const reducePageNumber = (PageState, PageStateFunc) => {
    const newCount = PageState - 10;
    if (newCount >= 0) {
      PageStateFunc(newCount);
    }
  };
  return {addEditChangeListener,addPageNumber,reducePageNumber}
}
