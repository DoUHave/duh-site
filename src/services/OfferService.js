import axios from "axios";
import Constant from "../util/Constant";
import UserService from "./UserService";
import { handle403Errors } from "../util/helper";

/**
 * Offer service
 * Contains specific offer related functions and/or API requests
 * @author dassiorleando
 */
const OfferService = {
  /**
   * Loads the item's offers
   * @returns A promise that resolves to the item offers list
   */
  postOffer: function(offer) {
    return new Promise(async (resolve, reject) => {
      if (!offer || !offer.itemId)
        return reject(new Error("Invalid data provided"));
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        const { data } = await axios.post(
          `${Constant.API_ENDPOINT}/offers`,
          offer,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data && data.createdItem);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
  updateOffer: function(offer) {
    return new Promise(async (resolve, reject) => {
      if (!offer.offerId) return reject(new Error("Invalid data provided"));
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        const { data } = await axios.patch(
          `${Constant.API_ENDPOINT}/offers/offer/${offer.offerId}`,
          offer,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data && data.message);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Loads the item's offers
   * @returns A promise that resolves to the item offers list
   */
  getItemOffers: function(itemId, forUser = "0") {
    return new Promise(async (resolve, reject) => {
      if (!itemId) return reject(new Error("No item id provided"));
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/offers/item/${itemId}?forUser=${forUser}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data && data.items);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
  /**
   * Loads the all item's offers of user
   * @returns A promise that resolves to the item offers list
   */
  getItemsOffers: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        if (userInfo && userInfo.userId) {
          const { data } = await axios.get(
            `${Constant.API_ENDPOINT}/offers/itemowner/${userInfo.userId}`,
            { headers: { Authorization: `Bearer ${userInfo.token}` } }
          );

          resolve(data);
        }
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
  /**
   * Loads the user's offers or items he offered to
   * @param string loadItemsOnly To load only the items or the full offers list
   * @returns A promise that resolves to the items/offers list
   */
  getMyOffers: function(loadItemsOnly = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = UserService.getUserSessionDetails() || {};
        const userId = userInfo.userId || userInfo._id;
        const { data } = await axios.get(
          `${
            Constant.API_ENDPOINT
          }/offers/myoffers/${userId}?loadItemsOnly=${loadItemsOnly}`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data && data.items);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
};

export default OfferService;
