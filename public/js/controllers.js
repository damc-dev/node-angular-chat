'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.emit('user:connected', {'name': prompt("Please enter user name", "Bob")});
    socket.on('send:name', function (data) {
      $scope.name = data;
    });
  }).
  controller('ChatCtrl', ['$scope', 'socket', '$location', '$anchorScroll', function($scope, socket, $location, $anchorScroll) {
    $scope.messages =[];
    socket.on('message', function(envelope) {
      $scope.messages.push(envelope);
      $location.hash('bottom');
      $anchorScroll.yOffset=64;
      $anchorScroll();
    });
  }]).
  controller('MessageCtrl', function($scope, socket) {
    console.log('Message Controller');
    $scope.sendMessage = function() {
      var message = $scope.message;
      $scope.message = "";
      console.log(message);
      socket.emit('message', message);
    }
  });
