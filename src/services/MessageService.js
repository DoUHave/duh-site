import axios from 'axios';
import Constant from '../util/Constant.js';
import { handle403Errors } from '../util/helper.js';

/**
 * Message service
 * @author dassiorleando
 */
const MessageService = {
  
  /**
   * Gets a room last message
   * @param {*} roomId The room id
   * @returns A promise that resolves to the last message
   */
  getLastMessage: function (roomId) {
    return new Promise(async (resolve, reject) => {
      if (!roomId) return reject(new Error('No room id provided'));
      try {
        const { data } = await axios.get(`${Constant.MESSAGE_ENDPOINT}/lastMessage/${roomId}`);
        resolve(data && data.data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },
  
  /**
   * Gets a room messages
   * 
   * @param {*} roomId The room id
   * @param {*} lastEvaluatedKey The last evaluated key, for pagination
   * @returns A promise that resolves to the room messages list (paginated)
   */
  getMessages: function (roomId, lastEvaluatedKey) {
    return new Promise(async (resolve, reject) => {
      if (!roomId) return reject(new Error('No room id provided'));
      try {
        const queryStrings = lastEvaluatedKey ? `?lastEvaluatedKey=${lastEvaluatedKey}` : '';
        const { data } = await axios.get(`${Constant.MESSAGE_ENDPOINT}/messages/${roomId}${queryStrings}`);
        resolve(data && data.data);
      } catch (error) {
        handle403Errors(error);
        reject(error);
      }
    });
  },

}

export default MessageService;
