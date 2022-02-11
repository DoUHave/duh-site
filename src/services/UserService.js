import axios from "axios";
import { BehaviorSubject } from "rxjs";
import Constant from "../util/Constant";
import { handle403Errors } from "../util/helper";
import ItemService from "./ItemService";

const userBehaviorObject = new BehaviorSubject(null);

/**
 * User service.
 * Containing specific users related functions and/or API requests.
 * @author dassiorleando
 */
const UserService = {
  /**
   * Get the current user behavior object
   */
  getUserBehaviorObject: function() {
    return userBehaviorObject;
  },

  /**
   * Sets the user details in the local storage
   */
  setUser: function(user) {
    if (user && user.userId) {
      ItemService.getSavedItems(user.userId);
      
      userBehaviorObject.next(user);

      localStorage.setItem("current-user", JSON.stringify(user));
    }
  },

  /**
   * Deletes the current user session details
   */
  deleteUserSession: function() {
    userBehaviorObject.next(null);
    localStorage.removeItem("current-user");
  },

  /**
   * Gets the user session details
   */
  getUserSessionDetails: function() {
    const userDetails = localStorage.getItem("current-user");
    return JSON.parse(userDetails || null);
  },

  /**
   * Checks if the user is connected or not
   */
  isConnected: function() {
    const currentUser = this.getUserSessionDetails();
    if (currentUser) return true;
    return false;
  },

  /**
   * Sending a password reset email for a specific user (initiating the forgot password logic).
   * @param {*} email The targeted user's email.
   * @returns {Promise<*>}
   */
  sendPwdResetEmail: function(email) {
    return new Promise(async (resolve, reject) => {
      if (!email) return reject({ message: "Invalid email provided!" }); // Validation

      try {
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/user/forgotPassword?userEmail=${email}`
        );
        resolve(data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Sends email confirmation email to an existing user.
   * @param {*} email The targeted user's email.
   * @returns {Promise<*>}
   */
  sendEmailConfirmationEmail: function() {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = this.getUserSessionDetails() || {};
        const { data } = await axios.get(
          `${Constant.API_ENDPOINT}/user/sendConfirmationEmail`,
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        resolve(data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

  /**
   * Sets the new password (next step once the fogot password process has been initiated).
   * @param {*} pwdResetToken The password reset token.
   * @param {*} newPassword   The new password to define for the user.
   * @returns {Promise<*>}
   */
  setNewPwd: function(pwdResetToken, newPassword) {
    return new Promise(async (resolve, reject) => {
      if (!pwdResetToken || !newPassword)
        return reject({
          message: "Invalid reset token and/or password provided!",
        }); // Validations

      try {
        const { data } = await axios.post(
          `${Constant.API_ENDPOINT}/user/forgotPassword`,
          { pwdResetToken, newPassword }
        );
        resolve(data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
};

export default UserService;
