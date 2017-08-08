import AppDispatcher from '../dispatcher/AppDispatcher';
import ProductActionTypes from '../constants/ProductActionTypes';
import ProductAPI from '../utils/ProductAPI';

const Actions = {
  addToCart(item) {
    AppDispatcher.handleViewAction({
      actionType: ProductActionTypes.ADD_TO_CART,
    });

    ProductAPI.checkQuantity(item);
  }
}

export default Actions;
