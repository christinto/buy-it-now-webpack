let _counter = 1;

const ShoppingCartItemCounter = {
  increment() {
    return 'id-' + String(_counter++);
  },
};

export default ShoppingCartItemCounter;
