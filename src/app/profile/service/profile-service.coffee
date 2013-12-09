angular.module('app').service 'ProfileService', [
  '$filter'
  (
    $filter
  ) ->
    getProfiles = ->
      # get profiles
      json_profiles = localStorage.getItem 'profiles'

      # convert from json
      profiles = JSON.parse json_profiles

    saveProfiles = (profiles) ->
      # convert to json
      json_profiles = JSON.stringify profiles

      # store profile
      localStorage.setItem 'profiles', json_profiles

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

      saveProfiles profiles

      return profile

    @editProfile = (new_profile) ->
      profile = {}

      old_profile = @getProfileById new_profile.id

      _.extend profile, old_profile, new_profile

      profiles = @getProfiles()
      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, profile.id

      profiles[profile_index] = profile

      saveProfiles profiles

      return profile

    @deleteProfile = (profile) ->
      @deleteProfileById profile.id

      profiles = @getProfiles()
      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, profile.id

      delete profiles[profile_index]

      saveProfiles profiles

      return profiles

    @deleteProfileById = (id) ->
      profile = @getProfileById()

    @getProfileById = (id) ->
      profiles = @getProfiles()

      _.findWhere profiles,
        id: parseInt id

    @getProfiles = ->
      profiles = getProfiles()

      return profiles || []

    return @
]
