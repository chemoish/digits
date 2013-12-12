angular.module('app').controller 'navigationController', [
  '$filter'
  '$scope'
  'ProfileService'
  (
    $filter
    $scope
    ProfileService
  ) ->
    $scope.profiles = ProfileService.getProfilesSorted 'name'

    $scope.$on 'profile-create', ->
      $scope.profiles = ProfileService.getProfilesSorted 'name'

    $scope.$on 'profile-delete', ->
      $scope.profiles = ProfileService.getProfilesSorted 'name'

    $scope.$on 'profile-edit', ->
      $scope.profiles = ProfileService.getProfilesSorted 'name'
]
