import axios from "axios";
import Constant from "../util/Constant";
import UserService from "./UserService";
import { BehaviorSubject } from "rxjs";
import { handle403Errors } from "../util/helper";

const searchBehaviorObject = new BehaviorSubject(null);
var cache = {
  savedItems: {}
};

/**
 * Item service
 * Contains specific item related functions and/or API requests
 * @author dassiorleando
 */
const ItemService = {
  /**
   * Get the socket client behavior object
   */
  getSearchBehaviorObject: function() {
    return searchBehaviorObject;
  },

  /**
   * Loads the item details by id
   * @returns A promise that resolves to the item found
   */
  findById: function(itemId) {
    return new Promise(async (resolve, reject) => {
      if (!itemId) return reject(new Error("No item id provided"));
      try {
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/items/item/${itemId}`
        );
        resolve(data && data.item);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Loads the items categorised or not, paginated query.
   * @param {string} category The category to look for, optional.
   * @param {string} lastId The last id coming from the previous query, useful for pagination.
   * @param {string} zipCode The zip code filter.
   * @param {string} distance The distance filter.
   * @param {string} limit The limit of data to send back, useful for pagination (30 by default).
   * @returns A promise that resolves to the items found.
   */
  getAllItems: function(
    category = "",
    lastId = "",
    zipCode = "",
    distance = "",
    limit = 10000
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/items?category=${
            category ? category : "all"
          }&lastId=${lastId}&zipCode=${zipCode}&distance=${distance}&limit=${limit}`
        );
        resolve(data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Loads the user's items
   * @returns A promise that resolves to the items found
   */
  getUserItems: function(userId) {
    return new Promise(async (resolve, reject) => {
      if (!userId) return reject(new Error("No user id provided"));
      try {
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/items/user/${userId}`
        );
        resolve(data && data.items);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Loads the user's saved items
   * @returns A promise that resolves to the user's saved items found
   */
  getSavedItems: function(userId) {
    return new Promise(async (resolve, reject) => {
      if (!userId) return reject(new Error("No user id provided"));

      try {
        if (Object.keys(cache.savedItems).length == 0 ){
          console.log('grabbing saved items');
          const userInfo = UserService.getUserSessionDetails() || {};
          const { data } = await axios.get(
            `${Constant.API_ENDPOINT}/savelist/${userId}`,
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
          );
          cache.savedItems = data;
        }

        resolve(cache.savedItems && cache.savedItems.items);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  resetSavedItemsCache: function() {
    console.log('Resetting saved item cache');
    cache.savedItems = {};
    console.log(cache);
  },

  /**
 * Checks to see if this item id is saved
 * @returns A promise that resolves to the user's saved items found
 */
  checkSavedItems: function(userId, itemId) {
    return new Promise(async (resolve, reject) => {
      if (!userId) return reject(new Error("Skipping saved items: No user id provided"));
      if (!itemId) return reject(new Error("Skipping saved items: No item id provided"));
      try {
        this.getSavedItems(userId).then( data => {
          if (data) {
            // check for items id
            let found = false;
            let index = 0;
  
            while (!found && index < data.length){
              if (data[index].itemId == itemId) found = true;
              index++;
            };
  
            resolve(found);
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Post a new item
   * @returns A promise that resolves to the user's saved items found
   */
  postItem: function(itemData) {
    return new Promise(async (resolve, reject) => {
      if (!itemData) return reject(new Error("No user id provided"));
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        const { data } = await axios.post(
          `${Constant.API_ENDPOINT}/items`,
          itemData,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
};

export default ItemService;
