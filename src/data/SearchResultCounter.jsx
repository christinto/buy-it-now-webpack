let _counter = 1;

const SearchResultCounter = {
  increment() {
    return 'id-' + String(_counter++);
  },
};

export default SearchResultCounter;
