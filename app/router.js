import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('user', {path: '/user/:user_id'});
  this.route('events');
  this.route('event', {path: '/event/:event_id'});
  this.route('dev');
  this.route('users');
  this.route('useredit', {path: '/useredit/:user_id'});
});

export default Router;
