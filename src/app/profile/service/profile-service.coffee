angular.module('app').service 'ProfileService', [
  'StoreService'
  (
    StoreService
  ) ->
    @createProfile = (profile) ->
      profiles = @getProfiles()

      # generate new id
      slug = StoreService.generateSlug profile.name

      # add profile to list
      new_profile =
        id: slug
        name: profile.name
        description: profile.description
        gender: profile.gender

      profiles.push new_profile

      StoreService.set 'profiles', profiles

      return new_profile

    @editProfile = (new_profile) ->
      profile = {}

      old_profile = @getProfileById new_profile.id

      _.extend profile, old_profile, new_profile

      profiles = @getProfiles()
      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, profile.id

      profiles[profile_index] = profile

      StoreService.set 'profiles', profiles

      return profile

    @deleteProfile = (profile) ->
      @deleteProfileById profile.id

      profiles = @getProfiles()
      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, profile.id

      profiles.splice profile_index, 1

      StoreService.set 'profiles', profiles

      return profiles

    @deleteProfileById = (id) ->
      profile = @getProfileById()

    @getProfileById = (id) ->
      profiles = @getProfiles()

      _.findWhere profiles,
        id: id

    @getProfiles = ->
      profiles = StoreService.get 'profiles'

      return profiles || []

    return @
]
