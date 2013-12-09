angular.module('app').controller 'navigationController', [
  '$filter'
  '$scope'
  'ProfileService'
  (
    $filter
    $scope
    ProfileService
  ) ->
    $scope.profiles = $filter('orderBy')(ProfileService.getProfiles(), 'name')
]
