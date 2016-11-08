import Ember from 'ember';

export default Ember.Route.extend({
  addInterests:[],
  model(params){
    return Ember.RSVP.hash({
      user: this.store.findRecord('user', params.user_id),
      interests: this.store.findAll('interest')
    });
  },
  actions:{
    createEvent(params){
      var newEvent = this.store.createRecord('event', params);
      var user = params.host;
      console.log(newEvent);
      user.get('hosted').addObject(newEvent);
      var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + params.zip;
      var location = Ember.$.getJSON(url).then(function(response) {
        newEvent.set('lat', response.results[0].geometry.location.lat);
        newEvent.set('lng', response.results[0].geometry.location.lng);
        newEvent.save().then(function() {
          return user.save();
        });
        this.transitionTo('/user/' + user.id, user);
      });
    },
    addInterests(_userID, _addInterests, _removeInterests){

      var storage = this.store;

      var user;
      var toAdd = _addInterests;
      var toRemove = _removeInterests;

      storage.findRecord("user", _userID).then(function(response) {
        user = response;
        // user.set("interests",)
      }).then(function() {
        toAdd.forEach(function(interest) {
          console.log("in")
          interest.get("users").addObject(user);
          user.get("interests").addObject(interest);
        })
        toRemove.forEach(function(interest) {
          interest.get("users").removeObject(user);
          user.get("interests").removeObject(interest);
        })
      }).then(function() {
        user.save().then(function() {
          toAdd.forEach(function(interest) {
            interest.save();
          });
        })
      })
    },
    togglebutton(_interest, _interestID){
      if(!($("#" + _interestID).hasClass("basic"))){
        $("#" + _interestID).addClass("basic");
        this.addInterests.splice(this.addInterests.indexOf(_interest),1);
      } else {
        this.addInterests.push(_interest);
        console.log(this.addInterests);
        $("#" + _interestID).removeClass("basic");
      }
    }
  }
});
