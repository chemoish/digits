angular.module 'app', ['ngRoute'], ($routeProvider, $locationProvider) ->
  $routeProvider.
    when('/'
      templateUrl: 'home/home.html'
      controller: 'HomeController'
    ).
    when('/add-profile'
      templateUrl: 'profile/profile-add.html'
      controller: 'ProfileAddController'
    ).
    when('/edit-profile/:id'
      templateUrl: 'profile/profile-edit.html'
      controller: 'ProfileEditController'
    ).
    when('/profile/:id'
      templateUrl: 'profile/profile-detail.html'
      controller: 'ProfileDetailController'
    ).
    otherwise(
      redirectTo: '/'
    )

  # $locationProvider.html5Mode true

$(document).foundation()
