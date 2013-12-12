angular.module('app').service 'ProfileService', [
  '$filter'
  '$rootScope'
  'StoreService'
  (
    $filter
    $rootScope
    StoreService
  ) ->
    @createProfile = (profile) ->
      profiles = @getProfiles()

      # generate new id
      slug = StoreService.generateSlug profile.id, profile.name, profiles

      # add profile to list
      new_profile =
        id: slug
        name: profile.name
        description: profile.description
        gender: profile.gender

      profiles.push new_profile

      # save profiles
      StoreService.set 'profiles', profiles

      $rootScope.$broadcast 'profile-create'

      return new_profile

    @editProfile = (profile) ->
      profiles = @getProfiles()

      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, profile.id

      # generate new id
      slug = StoreService.generateSlug profile.id, profile.name, profiles

      # update id if name has changed
      profile.id = slug if profile.id != slug

      # update profile with new information
      profiles[profile_index] = profile

      # save profiles
      StoreService.set 'profiles', profiles

      $rootScope.$broadcast 'profile-edit'

      return profile

    @deleteProfile = (profile) ->
      @deleteProfileById profile.id

    @deleteProfileById = (id) ->
      profiles = @getProfiles()

      ids = _.pluck profiles, 'id'
      profile_index = _.indexOf ids, id

      # remove profile
      profiles.splice profile_index, 1

      # save profiles
      StoreService.set 'profiles', profiles

      $rootScope.$broadcast 'profile-delete'

      return profiles

    @getProfileById = (id) ->
      profiles = @getProfiles()

      _.findWhere profiles,
        id: id

    @getProfiles = ->
      profiles = StoreService.get 'profiles'

      return profiles || []

    @getProfilesSorted = (sort = '') ->
      $filter('orderBy') @getProfiles(), sort

    return @
]
