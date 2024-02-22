import { get, post } from "./request";

let liveapi = `https://api.mentoga.com/api`; //live
let staggingapi = `https://colonyfoods.ae/c2-app/public/api/v1`; //stagging

let liveimg = `https://api.mentoga.com`; //live
let staggingimg = `https://stgapiv2.mentoga.com`; //stagging

export const BASE_URL = staggingapi; //staging
export const BASE_URL_FOR_IMAGES = liveimg;

export const API_URLS = {
  login: `${BASE_URL}/login`,
  signup: `${BASE_URL}/register`,
  ocr: `${BASE_URL}/ocr`,
  getUserProfile: `${BASE_URL}/account/get-profile`,
  getProfile: `${BASE_URL}/user-details`,

  forgetPass: `${BASE_URL}/forget_password`,
  verifyOtp: `${BASE_URL}/verify_otp`,
  resetPass: `${BASE_URL}/reset_password`,
  appsetting: `${BASE_URL}/app-setting`,
  merchantOnboarding: `${BASE_URL}/merchant/onboarding`,
  popularProducts: `${BASE_URL}/popular_products`,
  categories: `${BASE_URL}/categories`,
  sub_categories: `${BASE_URL}/sub_categories`,
  toggleFavorite: `${BASE_URL}/favorite`,
  getFavorite: `${BASE_URL}/favorites`,
  search: `${BASE_URL}/search`,
  suggestion: `${BASE_URL}/suggestion/`,
  

 
};
//auth
const login = (data) => post(API_URLS.login, data);
const signup = (data) => post(API_URLS.signup, data);
const ocr = (data) => post(API_URLS.ocr, data);
const forgetPass = (data) => post(API_URLS.forgetPass, data);
const verifyOtp = (data) => post(API_URLS.verifyOtp, data);
const resetPass = (data) => post(API_URLS.resetPass, data);
const appsetting = (data) => get(API_URLS.appsetting);
const getProfile = (data) => get(API_URLS.getProfile);
const merchantOnboarding = (data) => post(API_URLS.merchantOnboarding,data);

const getUserProfile = (data) => post(API_URLS.getUserProfile, data);
const popularProducts = (data) => get(API_URLS.popularProducts+data);
const categories = (data) => get(API_URLS.categories);
const sub_categories = (data) => get(API_URLS.sub_categories);
const toggleFavorite = (data) => post(API_URLS.toggleFavorite,data);
const getFavorite = (data) => get(API_URLS.getFavorite+data);
const search = (data) => post(API_URLS.search,data);
const suggestion = (data) => get(API_URLS.suggestion+data);

const API_CALLS = {
  login,
  signup,
  ocr,
  forgetPass,
  verifyOtp,
  resetPass,
  appsetting,
  getUserProfile,
  merchantOnboarding,
  popularProducts,
  categories,
  sub_categories,
  getProfile,
  toggleFavorite,
  getFavorite,
  search,
  suggestion
};
export default API_CALLS;
