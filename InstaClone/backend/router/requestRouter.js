const { sendRequest, acceptRequest, deleteRequest, pendingRequest, getAllFollowers, getAllFollowing, removeFollowing, removeFollower, cancelRequest, getSuggestions } = require("../controller/requestConroller");

const requestRouter = require("express").Router() ;

requestRouter.route("").post(sendRequest).delete(cancelRequest) ;
requestRouter.route("/accept").post(acceptRequest).delete(deleteRequest) ;
requestRouter.route("/pending/:id").get(pendingRequest) ;
requestRouter.route("/followers/:id").get(getAllFollowers).delete(removeFollower) ;
requestRouter.route("/following/:id").get(getAllFollowing).delete(removeFollowing) ;
requestRouter.route("/suggestions/:id").get(getSuggestions) ;


module.exports = requestRouter ;