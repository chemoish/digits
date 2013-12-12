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
    $scope.isProfileEditFormSubmitted = false
    $scope.profile = ProfileService.getProfileById $routeParams.id

    $scope.deleteProfile = ->
      ProfileService.deleteProfile $scope.profile

      # navigate to home
      $location.path "/"

    $scope.hasFieldError = (field) ->
      return $scope.isProfileEditFormSubmitted && $scope.profile_edit_form[field].$error.required

    $scope.saveProfile = ->
      $scope.isProfileEditFormSubmitted = true

      return unless $scope.profile_edit_form.$valid

      # update profile
      profile = ProfileService.editProfile $scope.profile

      # navigate to edit profile
      $location.path "/edit-profile/#{profile.id}"
]
