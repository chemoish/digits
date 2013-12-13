angular.module 'app', ['ngRoute'], [
  '$locationProvider'
  '$routeProvider'
  (
    $locationProvider
    $routeProvider
  ) ->
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
        templateUrl: 'profile/profile-show.html'
        controller: 'ProfileShowController'
      ).
      otherwise(
        redirectTo: '/'
      )

    # $locationProvider.html5Mode true
]

$(document).foundation()
