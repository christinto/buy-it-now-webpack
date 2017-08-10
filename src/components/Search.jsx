import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';
import ProductActions from '../actions/ProductActions';

var Search = React.createClass({
  getInitialState: function() {
    return SearchResultStore.getList();
  },
  componentWillMount: function() {
    this.setState(SearchResultStore.getList());
  },
  componentDidMount: function() {
    SearchResultStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SearchResultStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(SearchResultStore.getList());
  },
  render: function() {
    return (
      <div>
        <p className="highlighted">Search Results</p>
        {this.state.list.map(item => (
          <SearchResultItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    );
  }
});

function SearchResultItem(props) {
  const {item} = props;

  const onClick = (event) => {
    ProductActions.addToCart(item);
  };

  let button = '';

  if (item.price > 0) {
    button = <button onClick={onClick}>Add to Cart</button>;
  }

  return (
    <li>
      <div>
        <label>
          {item.title} {button}
        </label>
      </div>
    </li>
  );
}

module.exports = Search;
