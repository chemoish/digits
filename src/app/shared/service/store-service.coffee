angular.module('app').service 'StoreService', [
  ->
    @generateSlug = (name, collection) ->
      slug = @slugify name

      ids = _.pluck collection, 'id'

      while (_.contains ids, slug)
        version = slug.match(/-([1-9]+)$/)?[0]

        slug.replace(/-([1-9]+)$/, '')

        if version?
          slug += "-#{version}"
        else
          slug += '-1'

      return slug

    @get = (key) ->
      # get profiles
      json = localStorage.getItem key

      # convert from json
      return JSON.parse json

    @set = (key, value) ->
      # convert to json
      json = JSON.stringify value

      # store profile
      localStorage.setItem key, json

    @slugify = (string) ->
      string.trim().toLowerCase().replace ' ', '-'

    return @
]
