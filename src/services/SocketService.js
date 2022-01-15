/**
 * Socket service
 * @author dassiorleando
 */
 import { BehaviorSubject } from "rxjs";
 import Constant from "../util/Constant";
 import UserService from "./UserService";
 
 const socketBehaviorObject = new BehaviorSubject(null);
 
 /**
  * SocketService
  * @author dassiorleando
  */
 const SocketService = {
   /**
    * Get the socket client behavior object
    */
   getSocketBehaviorObject: function() {
     return socketBehaviorObject;
   },
 
   /**
    * Socket connection, it connects the user to the socket endpoint
    * TOOD: use this socket lib to benefit from callback while sending message https://github.com/aidv/websockets-callback
    * @param * userInfo The user info
    */
   connect: function(userInfo) {
     const { token } = userInfo || {};
     const self = this;
 
     if (!Constant.SOCKET_ENDPOINT) {
       return;
     }
 
     if (token) {
       const socket = new WebSocket(
         `${Constant.SOCKET_ENDPOINT}/?token=${token}`
       );
       // Connection opened
       socket.onopen = function(event) {
         const openedDate = new Date();
         socketBehaviorObject.next(socket);
       };
       socketBehaviorObject.next(socket);
 
       // Listen for messages
       socket.onmessage = function(event) {
         try {
           let message = JSON.parse(event.data || "{}");
         } catch (error) {}
       };
 
       // automatically reconnect after socket closed
       socket.onclose = function(event) {
         const closedDate = new Date();
 
         setTimeout(function() {
           self.connect(userInfo);
         }, 1000);
       };
 
       // close socket when an error occurred
       socket.onerror = function(err) {
         console.error(
           "Socket encountered error: ",
           err.message,
           "Closing socket"
         );
         socket.close();
       };
     }
   },
 };
 
 // Once we set the user info we connect the socket
 UserService.getUserBehaviorObject().subscribe((userInfo) => {
   SocketService.connect(userInfo);
 });
 
 export default SocketService;
 