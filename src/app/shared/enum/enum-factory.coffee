angular.module('app').factory 'EnumFactory', ->
  enums = {}

  enums['SIZE'] =
    XSMALL:  "XS"
    SMALL:   "S"
    MEDIUM:  "M"
    LARGE:   "L"
    XLARGE:  "XL"
    XXLARGE: "XXL"

  enums['SIZES'] = [
    enums.SIZE.XSMALL
    enums.SIZE.SMALL
    enums.SIZE.MEDIUM
    enums.SIZE.LARGE
    enums.SIZE.XLARGE
    enums.SIZE.XXLARGE
  ]

  return enums
