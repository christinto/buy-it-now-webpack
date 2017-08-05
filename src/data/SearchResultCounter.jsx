let _counter = 1;

/**
 * This is a simple counter for providing unique ids.
 */
const SearchResultCounter = {
  increment() {
    return 'id-' + String(_counter++);
  },
};

export default SearchResultCounter;
