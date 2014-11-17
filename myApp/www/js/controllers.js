angular.module('starter.controllers', [])

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
})

.controller('AppCtrl', function($scope, $location, $ionicModal, $timeout, Friends, Camera) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.playlistModel = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.playlistModel.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.playlistModel.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.playlistModel.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.friends = Friends.all();
  $scope.getPhoto = function() {
    console.log('Getting camera');
   
    Camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
      $scope.lastPhoto = imageURI;
      
    }, function(err) {
      console.err(err);
    }, { 
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true 
    });

    $location.path('/app/preview');
    /*
    navigator.camera.getPicture(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
    }, { 
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
    */
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 },
    { title: 'Oliver', id: 7 },
    { title: 'Queen', id: 8 },
    { title: 'Kricksus', id: 9 },
    { title: 'Ganicuss', id: 10 },
    { title: 'Spartacus', id: 11 },
    { title: 'John', id: 12 },
    { title: 'Marcus', id: 13 },
    { title: 'Ceasur', id: 14 },
    { title: 'Lithiya', id: 15 },
    { title: 'Walter', id: 16 },
    { title: 'Capua', id: 17 },
    { title: 'Pompay', id: 18 },
    { title: 'Rome', id: 19 },
    { title: 'Spartans', id: 20 }
  ];


})

.controller('PlaylistCtrl', ['$scope', '$filter', '$stateParams', function($scope, $filter, $stateParams) {
  var playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 },
    { title: 'Oliver', id: 7 },
    { title: 'Queen', id: 8 },
    { title: 'Kricksus', id: 9 },
    { title: 'Ganicuss', id: 10 },
    { title: 'Spartacus', id: 11 },
    { title: 'John', id: 12 },
    { title: 'Marcus', id: 13 },
    { title: 'Ceasur', id: 14 },
    { title: 'Lithiya', id: 15 },
    { title: 'Walter', id: 16 },
    { title: 'Capua', id: 17 },
    { title: 'Pompay', id: 18 },
    { title: 'Rome', id: 19 },
    { title: 'Spartans', id: 20 }
  ];


  $scope.playlist = $filter('getById')(playlists, $stateParams.playlistId);
  console.log($scope.playlist);
  
 
}]);


