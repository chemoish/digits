angular.module('app').controller 'navigationController', [
  '$scope'
  (
    $scope
  ) ->
    $scope.profiles = [
      id:     1
      gender: 'female'
      name:   'Spouse'
    ,
      id:     2
      gender: 'female'
      name:   'Mom'
    ,
      id:     3
      gender: 'male'
      name:   'Dad'
    ]
]
