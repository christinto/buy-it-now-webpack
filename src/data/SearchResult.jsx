import Immutable from 'immutable';

const SearchResult = Immutable.Record({
  id: '',
  title: '',
  asin: '',
  price: 0,
  stock: 0
});

export default SearchResult;
