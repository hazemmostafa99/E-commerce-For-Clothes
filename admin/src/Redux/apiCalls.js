import { publicRequest, userRequest } from "../requestMethods";
import {
  addClientFailure,
  addClientStart,
  addClientSuccess,
  deleteClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  getClientFailure,
  getClientStart,
  getClientSuccess,
  updateClientFailure,
  updateClientStart,
  updateClientSuccess,
} from "./client";
import {
  fetchProductsFailure,
  fetchProductsStart,
  fetchProductsSuccess,
  deleteProductStart,
  deleteProductFailure,
  deleteProductSuccess,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "./productSlice";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const res = await publicRequest("products");
    dispatch(fetchProductsSuccess(res.data));
  } catch (error) {
    dispatch(fetchProductsFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await userRequest.delete("products/" + id);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put("products/" + id, product);
    dispatch(updateProductSuccess({ id: id, product: res.data }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("products", product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const getClients = async (dispatch) => {
  dispatch(getClientStart());
  try {
    const res = await userRequest.get("users");
    dispatch(getClientSuccess(res.data));
  } catch (error) {
    dispatch(getClientFailure());
  }
};

export const deleteClient = async (dispatch, id) => {
  dispatch(deleteClientStart());
  try {
     await userRequest.delete("users/" + id);
    dispatch(deleteClientSuccess(id));
  } catch (error) {
    dispatch(deleteClientFailure());
  }
};

export const updateClient = async (dispatch, id, user) => {
  dispatch(updateClientStart());
  try {
    const res = await userRequest.put("users/" + id, user);
    dispatch(updateClientSuccess({ id, user: res.data }));
  } catch (error) {
    dispatch(updateClientFailure());
  }
};

export const addClient = async (dispatch, user) => {
  dispatch(addClientStart());
  try {
    const res = await userRequest.post("auth/register", user);
    dispatch(addClientSuccess(res.data));
  } catch (error) {
    dispatch(addClientFailure());
  }
};
