import Immutable from 'immutable';

const Transaction = Immutable.Record({
  id: '',
  index: '',
  state: '',
  date: '',
  amount: 0
});

export default Transaction;
