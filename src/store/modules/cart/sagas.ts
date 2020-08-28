import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { IState } from '@store/index';

import api from '@services/api';
import {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
} from './actions';
import { ActionTypes } from './types';

interface IStockResponse {
  id: number;
  quantity: number;
}

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  const currentQuantity: number = yield select(
    (state: IState) =>
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0,
  );

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`,
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
