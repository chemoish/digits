angular.module('app').controller 'ProfileEditController', [
  '$location'
  '$routeParams'
  '$scope'
  'ProfileService'
  (
    $location
    $routeParams
    $scope
    ProfileService
  ) ->
    $scope.isProfileAddFormSubmitted = false
    $scope.profile = ProfileService.getProfileById $routeParams.id

    $scope.deleteProfile = ->
      ProfileService.deleteProfile $scope.profile

      # navigate to home
      $location.path "/"

    $scope.hasFieldError = (field) ->
      return $scope.isProfileAddFormSubmitted && $scope.profile_add_form[field].$error.required

    $scope.saveProfile = ->
      $scope.isProfileAddFormSubmitted = true

      return unless $scope.profile_add_form.$valid

      # update profile
      ProfileService.editProfile $scope.profile
]
