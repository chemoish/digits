angular.module('app').service 'ProfileService', [
  '$filter'
  (
    $filter
  ) ->
    @createProfile = (profile) ->
      profiles = @getProfiles()

      # get max id
      max_id = _.max(_.pluck(profiles, 'id'))

      # generate new id
      new_id = if max_id is Number.NEGATIVE_INFINITY then 1 else max_id + 1

      # add profile to list
      profile =
        id: new_id
        name: profile.name
        description: profile.description
        gender: profile.gender

      profiles.push profile

      # convert to json
      json_profiles = JSON.stringify profiles

      # store profile
      localStorage.setItem 'profiles', json_profiles

      return profile

    @editProfile = (profile) ->
      console.log 'edit profile', profile

    @deleteProfileById = (id) ->
      console.log 'delete profile', id

    @getProfileById = (id) ->
      console.log 'get profile by id', id

    @getProfiles = ->
      console.log 'get profiles~'

      # get profiles
      json_profiles = localStorage.getItem('profiles')

      # convert from json
      profiles = JSON.parse(json_profiles)

      return profiles || []

    return @
]
