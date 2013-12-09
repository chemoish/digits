angular.module('app').controller 'ProfileDetailController', [
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
