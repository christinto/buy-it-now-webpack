import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';

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
    console.log("SearchResultStore", SearchResultStore.getList());
    this.setState(SearchResultStore.getList());
  },
  render: function() {
    return (
      <div>
        <p>Search Results</p>
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
  return (
    <li>
      <div>
        <label>
          {item.title}
        </label>
      </div>
    </li>
  );
}

module.exports = Search;
