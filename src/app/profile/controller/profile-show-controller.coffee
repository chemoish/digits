angular.module('app').controller 'ProfileShowController', [
  '$routeParams'
  '$scope'
  'ProfileService'
  (
    $routeParams
    $scope
    ProfileService
  ) ->
    $scope.profile = ProfileService.getProfileById $routeParams.id
]
