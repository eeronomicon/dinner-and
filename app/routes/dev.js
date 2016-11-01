import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return Ember.RSVP.hash({
      users: this.store.findAll('user'),
      interests: this.store.findAll('interest')
    });
  },
  actions: {
    createUser(){
      var params = {
        name: $("#name").val(),
        age: parseInt($("#age").val()),
        zip: parseInt($("#zip").val()),
        about: $("#about").val(),
        avatar: $("#avatar").val(),
      };
      var newUser = this.store.createRecord('user', params);
      newUser.save();
    },
    createInterest(){
      var mature;
      if($("#mature").val() === "True"){
        mature = true;
      } else {
        mature = false;
      }

      var params = {
        name: $("#i-name").val(),
        mature: mature
      };

      var newInterest = this.store.createRecord('interest', params);
      newInterest.save();

    },
    updateInterest(userID, interestID){
      console.log(userID);
      console.log(interestID);

      var storage = this.store;

      var user;
      var interest;
      storage.findRecord("user", userID).then(function(response) {
        user = response;
        console.log(user.get("name"));
      }).then(function() {
        storage.findRecord("interest", interestID).then(function(response) {
          interest = response;
          console.log(interest.get("name"));
        }).then(function() {
          user.get('interests').addObject(interest);
          interest.get('users').addObject(user);

          user.save().then(function() {
            return interest.save();
          })
        })
      })



      // .then(function(response) {
      //
      //
      //   user.get('interests').addObject(interest);
      //   interest.get('users').addObject(user);
      //   // user.save().then(function() {
      //
      //   })
      // })

      // var interest = this.store.findRecord("interest", interestID);
      //
      // console.log(user);
      // console.log(interest);

      // user.get('interests').addObject(interest);
    }
  }
});