angular.module('app').controller 'ProfileShowController', [
  '$routeParams'
  '$scope'
  'EnumFactory'
  'ProfileService'
  (
    $routeParams
    $scope
    EnumFactory
    ProfileService
  ) ->
    $scope.enum = EnumFactory
    $scope.profile = ProfileService.getProfileById $routeParams.id

    # Note: this gets fired on page load and on every property change
    # the newSizes and oldSizes are always the same. possible bug?
    $scope.$watchCollection 'profile.sizes', _.debounce (newSizes, oldSizes) ->
      ProfileService.editProfile $scope.profile
    , 300
]
