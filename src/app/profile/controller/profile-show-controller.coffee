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

    $scope.$watchCollection 'profile.sizes', _.debounce (newSizes, oldSizes) ->
      console.log 'fire'

      return unless _.isEqual newSizes, oldSizes

      ProfileService.editProfile $scope.profile
    , 300
]
