import Ember from 'ember';

export default Ember.Route.extend({
  addAttended: [],
  model(params){
    return Ember.RSVP.hash({
      event: this.store.findRecord("event", params.event_id),
      users: this.store.findAll('user')
      });
  },
  actions:{
    addInvited(event){
      // var event = this.get("model.event");
      var userID = $("#user-dropdown").val();
      console.log(event.get("name"));
      console.log(userID);

      var storage = this.store;

      storage.findRecord("user", userID).then(function(response) {
        response.get('invitedTo').addObject(event);
        event.get('invited').addObject(response);

        response.save().then(function() {
          return event.save();
        })
      })
    },
    eventOccurred(event){
      console.log(this.addAttended);
      event.occurred = true;
      this.addAttended.forEach(function(user) {
        event.get("attended").addObject(user);

        user.get("attended").then(function(response) {
          response.addObject(event);
          response.save();
          event.save();
        })
      })
    },
    togglebutton(_invited, _invitedID){
      //
      if(!($("#" + _invitedID).hasClass("basic"))){
        $("#" + _invitedID).addClass("basic");
        this.addAttended.splice(this.addAttended.indexOf(_invited),1);
      } else {
        this.addAttended.push(_invited);
        console.log(this.addAttended);
        $("#" + _invitedID).removeClass("basic");
      }
    }
  }
});
