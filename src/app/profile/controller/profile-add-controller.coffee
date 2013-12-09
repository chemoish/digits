angular.module('app').controller 'ProfileAddController', [
  '$location'
  '$scope'
  'ProfileService'
  (
    $location
    $scope
    ProfileService
  ) ->
    $scope.isProfileAddFormSubmitted = false
    $scope.profile = null

    $scope.hasFieldError = (field) ->
      return $scope.isProfileAddFormSubmitted && $scope.profile_add_form[field].$error.required

    $scope.saveProfile = ->
      $scope.isProfileAddFormSubmitted = true

      return unless $scope.profile_add_form.$valid

      # add profile
      profile = ProfileService.createProfile $scope.profile

      # clear profile
      $scope.profile = null

      # navigate to profile
      $location.path "/profile/#{profile.id}"
]
