/**
 * Helper functions
 * @author dassiorleando
 */
import axios from 'axios';
import UserService from '../services/UserService.js';
import Constant from '../util/Constant.js';
import { deleteFromStorage } from '../util/storage.js';

/**
 * Get the ago time for a specific date
 * @param {*} date The targetted date 
 */
export function timeSince (date) {
  date = new Date(date);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " yrs";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " mths";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " dys";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hrs";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " mins";
  }
  const inSeconds = Math.floor(seconds);
  return (inSeconds < 0 ? 0 : inSeconds) + " secs";
}

/**
 * Handle 403 errors.
 * @author dassiorleando
 */
export function handle403Errors(error) {
  const errorStatus = error && error.response && error.response.status;
  const errorIsString = typeof error === 'string' || error instanceof String;
  
  if ((errorIsString && error.indexOf('403') !== -1) || errorStatus === 403) {
    deleteFromStorage();
  }
}

/**
 * Parse a link to get its SEO details.
 * @param {*} url The targetted link.
 */
export function parseLink(url) {
  return new Promise(async (resolve, reject) => {
    if (!url) return reject(new Error('No url provided'));
    try {
      const userInfo = UserService.getUserSessionDetails() || {};
      const { data } = await axios.get(`${Constant.API_ENDPOINT}/parseLink?url=${url}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
      resolve(data);
    } catch (error) {
      handle403Errors(error);
      reject(error);
    }
  });
}

/**
 * Get a url's query strings.
 * @param {*} name The key to look for
 * @param {*} url The url to use (optional), but default it's the current page.
 * @returns 
 */
export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
