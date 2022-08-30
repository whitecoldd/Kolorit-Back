import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./usersRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
} from "./categoryRedux";
import {
  getSubcategoryStart,
  getSubcategorySuccess,
  getSubcategoryFailure,
  deleteSubcategoryStart,
  deleteSubcategorySuccess,
  deleteSubcategoryFailure,
  updateSubcategoryStart,
  updateSubcategorySuccess,
  updateSubcategoryFailure,
  addSubcategoryStart,
  addSubcategorySuccess,
  addSubcategoryFailure,
} from "./subcategoryRedux";
import {
  getSubsubcategoryStart,
  getSubsubcategorySuccess,
  getSubsubcategoryFailure,
  deleteSubsubcategoryStart,
  deleteSubsubcategorySuccess,
  deleteSubsubcategoryFailure,
  updateSubsubcategoryStart,
  updateSubsubcategorySuccess,
  updateSubsubcategoryFailure,
  addSubsubcategoryStart,
  addSubsubcategorySuccess,
  addSubsubcategoryFailure,
} from "./subsubcategoryRedux";
import {
  getBrandsIconStart,
  getBrandsIconSuccess,
  getBrandsIconFailure,
  deleteBrandsIconStart,
  deleteBrandsIconSuccess,
  deleteBrandsIconFailure,
  updateBrandsIconStart,
  updateBrandsIconSuccess,
  updateBrandsIconFailure,
  addBrandsIconStart,
  addBrandsIconSuccess,
  addBrandsIconFailure,
} from "./brandsIconRedux";
import {
  getBrandStart,
  getBrandSuccess,
  getBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,
  addBrandStart,
  addBrandSuccess,
  addBrandFailure,
} from "./brandRedux";
import {
  getSliderStart,
  getSliderSuccess,
  getSliderFailure,
  deleteSliderStart,
  deleteSliderSuccess,
  deleteSliderFailure,
  updateSliderStart,
  updateSliderSuccess,
  updateSliderFailure,
  addSliderStart,
  addSliderSuccess,
  addSliderFailure,
} from "./sliderRedux";
import {
  getContactStart,
  getContactSuccess,
  getContactFailure,
  deleteContactStart,
  deleteContactSuccess,
  deleteContactFailure,
  updateContactStart,
  updateContactSuccess,
  updateContactFailure,
  addContactStart,
  addContactSuccess,
  addContactFailure,
} from "./contactsRedux";
import {
  getAboutStart,
  getAboutSuccess,
  getAboutFailure,
  deleteAboutStart,
  deleteAboutSuccess,
  deleteAboutFailure,
  updateAboutStart,
  updateAboutSuccess,
  updateAboutFailure,
  addAboutStart,
  addAboutSuccess,
  addAboutFailure,
} from "./aboutRedux";
import {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailure,
  addArticleStart,
  addArticleSuccess,
  addArticleFailure,
} from "./articleRedux";
import {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
} from "./orderRedux";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/api/auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const loggingOut = async (dispatch) => {
  dispatch(loginStart());
  try {
    dispatch(logout());
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const getUser = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/api/user/find");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/api/user/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/api/user/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/api/user/`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
export const getBrandsIcon = async (dispatch) => {
  dispatch(getBrandsIconStart());
  try {
    const res = await userRequest.get("/api/brandsIcon/find");
    dispatch(getBrandsIconSuccess(res.data));
  } catch (err) {
    dispatch(getBrandsIconFailure());
  }
};
export const deleteBrandsIcon = async (id, dispatch) => {
  dispatch(deleteBrandsIconStart());
  try {
    const res = await userRequest.delete(`/api/brandsIcon/${id}`);
    dispatch(deleteBrandsIconSuccess(id));
  } catch (err) {
    dispatch(deleteBrandsIconFailure());
  }
};
export const updateBrandsIcon = async (id, brandsIcon, dispatch) => {
  dispatch(updateBrandsIconStart());
  try {
    const res = await userRequest.put(`/api/brandsIcon/${id}`, brandsIcon);
    dispatch(updateBrandsIconSuccess(res.data));
  } catch (err) {
    dispatch(updateBrandsIconFailure());
  }
};
export const addBrandsIcon = async (brandsIcon, dispatch) => {
  dispatch(addBrandsIconStart());
  try {
    const res = await userRequest.post(`/api/brandsIcon/`, brandsIcon);
    dispatch(addBrandsIconSuccess(res.data));
  } catch (err) {
    dispatch(addBrandsIconFailure());
  }
};
export const getBrand = async (dispatch) => {
  dispatch(getBrandStart());
  try {
    const res = await userRequest.get("/api/brand/find");
    dispatch(getBrandSuccess(res.data));
  } catch (err) {
    dispatch(getBrandFailure());
  }
};
export const deleteBrand = async (id, dispatch) => {
  dispatch(deleteBrandStart());
  try {
    const res = await userrRequest.delete(`/api/brand/${id}`);
    dispatch(deleteBrandSuccess(id));
  } catch (err) {
    dispatch(deleteBrandFailure());
  }
};
export const updateBrand = async (id, brand, dispatch) => {
  dispatch(updateBrandStart());
  try {
    const res = await userRequest.put(`/api/brand/${id}`, brand);
    dispatch(updateBrandSuccess(res.data));
  } catch (err) {
    dispatch(updateBrandFailure());
  }
};
export const addBrand = async (brand, dispatch) => {
  dispatch(addBrandStart());
  try {
    const res = await userRequest.post(`/api/brand/`, brand);
    dispatch(addBrandSuccess(res.data));
  } catch (err) {
    dispatch(addBrandFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/api/items/find/");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
export const getCategory = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await publicRequest.get("/api/cat/find/");
    dispatch(getCategorySuccess(res.data));
  } catch (err) {
    dispatch(getCategoryFailure());
  }
};
export const getSubcategory = async (dispatch) => {
  dispatch(getSubcategoryStart());
  try {
    const res = await publicRequest.get("/api/subcat/find/");
    dispatch(getSubcategorySuccess(res.data));
  } catch (err) {
    dispatch(getSubcategoryFailure());
  }
};
export const getSubsubcategory = async (dispatch) => {
  dispatch(getSubsubcategoryStart());
  try {
    const res = await publicRequest.get("/api/subsubcat/find/");
    dispatch(getSubsubcategorySuccess(res.data));
  } catch (err) {
    dispatch(getSubsubcategoryFailure());
  }
};
export const getSlider = async (dispatch) => {
  dispatch(getSliderStart());
  try {
    const res = await publicRequest.get("/api/slider/find/");
    dispatch(getSliderSuccess(res.data));
  } catch (err) {
    dispatch(getSliderFailure());
  }
};
export const getContact = async (dispatch) => {
  dispatch(getContactStart());
  try {
    const res = await publicRequest.get("/api/contact/find/");
    dispatch(getContactSuccess(res.data));
  } catch (err) {
    dispatch(getContactFailure());
  }
};
export const getAbout = async (dispatch) => {
  dispatch(getAboutStart());
  try {
    const res = await publicRequest.get("/api/about/find/");
    dispatch(getAboutSuccess(res.data));
  } catch (err) {
    dispatch(getAboutFailure());
  }
};
export const getArticle = async (dispatch) => {
  dispatch(getArticleStart());
  try {
    const res = await publicRequest.get("/api/article/find/");
    dispatch(getArticleSuccess(res.data));
  } catch (err) {
    dispatch(getArticleFailure());
  }
};
export const getOrder = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/api/order/");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/api/items/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    const res = await userRequest.delete(`/api/cat/${id}`);
    dispatch(deleteCategorySuccess(id));
  } catch (err) {
    dispatch(deleteCategoryFailure());
  }
};
export const deleteSubcategory = async (id, dispatch) => {
  dispatch(deleteSubcategoryStart());
  try {
    const res = await userRequest.delete(`/api/subcat/${id}`);
    dispatch(deleteSubcategorySuccess(id));
  } catch (err) {
    dispatch(deleteSubcategoryFailure());
  }
};
export const deleteSubsubcategory = async (id, dispatch) => {
  dispatch(deleteSubsubcategoryStart());
  try {
    const res = await userRequest.delete(`/api/subsubcat/${id}`);
    dispatch(deleteSubsubcategorySuccess(id));
  } catch (err) {
    dispatch(deleteSubsubcategoryFailure());
  }
};
export const deleteSlider = async (id, dispatch) => {
  dispatch(deleteSliderStart());
  try {
    const res = await userRequest.delete(`/api/slider/${id}`);
    dispatch(deleteSliderSuccess(id));
  } catch (err) {
    dispatch(deleteSliderFailure());
  }
};
export const deleteContact = async (id, dispatch) => {
  dispatch(deleteContactStart());
  try {
    const res = await userRequest.delete(`/api/contact/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (err) {
    dispatch(deleteContactFailure());
  }
};
export const deleteAbout = async (id, dispatch) => {
  dispatch(deleteAboutStart());
  try {
    const res = await userRequest.delete(`/api/about/${id}`);
    dispatch(deleteAboutSuccess(id));
  } catch (err) {
    dispatch(deleteAboutFailure());
  }
};
export const deleteArticle = async (id, dispatch) => {
  dispatch(deleteArticleStart());
  try {
    const res = await userRequest.delete(`/api/article/${id}`);
    dispatch(deleteArticleSuccess(id));
  } catch (err) {
    dispatch(deleteArticleFailure());
  }
};
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/api/order/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/api/items/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure(err));
  }
};
export const updateCategory = async (id, category, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const res = await userRequest.put(`/api/cat/${id}`, category);
    dispatch(updateCategorySuccess(res.data));
  } catch (err) {
    dispatch(updateCategoryFailure(err));
  }
};
export const updateSubcategory = async (id, subcategory, dispatch) => {
  dispatch(updateSubcategoryStart());
  try {
    const res = await userRequest.put(`/api/subcat/${id}`, subcategory);
    dispatch(updateSubcategorySuccess(res.data));
  } catch (err) {
    dispatch(updateSubcategoryFailure(err));
  }
};
export const updateSubsubcategory = async (id, subsubcategory, dispatch) => {
  dispatch(updateSubsubcategoryStart());
  try {
    const res = await userRequest.put(`/api/subsubcat/${id}`, subsubcategory);
    dispatch(updateSubsubcategorySuccess(res.data));
  } catch (err) {
    dispatch(updateSubsubcategoryFailure(err));
  }
};
export const updateSlider = async (id, slider, dispatch) => {
  dispatch(updateSliderStart());
  try {
    const res = await userRequest.put(`/api/slider/${id}`, slider);
    dispatch(updateSliderSuccess(res.data));
  } catch (err) {
    dispatch(updateSliderFailure(err));
  }
};
export const updateContact = async (id, contact, dispatch) => {
  dispatch(updateContactStart());
  try {
    const res = await userRequest.put(`/api/contact/${id}`, contact);
    dispatch(updateContactSuccess(res.data));
  } catch (err) {
    dispatch(updateContactFailure(err));
  }
};
export const updateAbout = async (id, about, dispatch) => {
  dispatch(updateAboutStart());
  try {
    const res = await userRequest.put(`/api/about/${id}`, about);
    dispatch(updateAboutSuccess(res.data));
  } catch (err) {
    dispatch(updateAboutFailure(err));
  }
};
export const updateArticle = async (id, article, dispatch) => {
  dispatch(updateArticleStart());
  try {
    const res = await userRequest.put(`/api/article/${id}`, article);
    dispatch(updateArticleSuccess(res.data));
  } catch (err) {
    dispatch(updateArticleFailure(err));
  }
};
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/api/order/${id}`, order);
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure(err));
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/api/items/add`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};
export const addCategory = async (category, dispatch) => {
  dispatch(addCategoryStart());
  try {
    const res = await userRequest.post(`/api/cat/`, category);
    dispatch(addCategorySuccess(res.data));
  } catch (err) {
    dispatch(addCategoryFailure());
  }
};
export const addSubcategory = async (subcategory, dispatch) => {
  dispatch(addSubcategoryStart());
  try {
    const res = await userRequest.post(`/api/subcat/`, subcategory);
    dispatch(addSubcategorySuccess(res.data));
  } catch (err) {
    dispatch(addSubcategoryFailure());
  }
};
export const addSubsubcategory = async (subsubcategory, dispatch) => {
  dispatch(addSubsubcategoryStart());
  try {
    const res = await userRequest.post(`/api/subsubcat/`, subsubcategory);
    dispatch(addSubsubcategorySuccess(res.data));
  } catch (err) {
    dispatch(addSubsubcategoryFailure());
  }
};
export const addSlider = async (slider, dispatch) => {
  dispatch(addSliderStart());
  try {
    const res = await userRequest.post(`/api/slider/`, slider);
    dispatch(addSliderSuccess(res.data));
  } catch (err) {
    dispatch(addSliderFailure());
  }
};
export const addContact = async (contact, dispatch) => {
  dispatch(addContactStart());
  try {
    const res = await userRequest.post(`/api/contact/`, contact);
    dispatch(addContactSuccess(res.data));
  } catch (err) {
    dispatch(addContactFailure());
  }
};
export const addAbout = async (about, dispatch) => {
  dispatch(addAboutStart());
  try {
    const res = await userRequest.post(`/api/about/`, about);
    dispatch(addAboutSuccess(res.data));
  } catch (err) {
    dispatch(addAboutFailure());
  }
};
export const addArticle = async (article, dispatch) => {
  dispatch(addArticleStart());
  try {
    const res = await userRequest.post(`/api/article/`, article);
    dispatch(addArticleSuccess(res.data));
  } catch (err) {
    dispatch(addArticleFailure());
  }
};
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/api/order/`, order);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};
