'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap']).
  controller('AppCtrl', function ($scope, socket) {

    socket.emit('user:connected', {'name': prompt("Please enter user name", "Bob")});

    socket.on('send:name', function (data) {
      $scope.name = data;
    });


  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  }).
  controller('ChatCtrl', function($scope, socket) {
    $scope.messages =[];
    socket.on('message', function(envelope) {
      $scope.messages.push(envelope);
    });
  }).
  controller('MessageCtrl', function($scope, socket) {
    console.log('Message Controller');
    $scope.sendMessage = function() {
      var message = $scope.message;
      $scope.message = "";
      console.log(message);
      socket.emit('message', message);
    }
  });
