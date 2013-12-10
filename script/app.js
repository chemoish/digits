(function() {
  angular.module('app', ['ngRoute'], function($routeProvider, $locationProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    }).when('/add-profile', {
      templateUrl: 'profile/profile-add.html',
      controller: 'ProfileAddController'
    }).when('/edit-profile/:id', {
      templateUrl: 'profile/profile-edit.html',
      controller: 'ProfileEditController'
    }).when('/profile/:id', {
      templateUrl: 'profile/profile-detail.html',
      controller: 'ProfileDetailController'
    }).otherwise({
      redirectTo: '/'
    });
  });

  $(document).foundation();

}).call(this);

(function() {
  angular.module('app').controller('HomeController', ['$scope', function($scope) {}]);

}).call(this);

(function() {
  angular.module('app').controller('navigationController', [
    '$filter', '$scope', 'ProfileService', function($filter, $scope, ProfileService) {
      return $scope.profiles = $filter('orderBy')(ProfileService.getProfiles(), 'name');
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileAddController', [
    '$location', '$scope', 'ProfileService', function($location, $scope, ProfileService) {
      $scope.isProfileAddFormSubmitted = false;
      $scope.profile = null;
      $scope.hasFieldError = function(field) {
        return $scope.isProfileAddFormSubmitted && $scope.profile_add_form[field].$error.required;
      };
      return $scope.saveProfile = function() {
        var profile;
        $scope.isProfileAddFormSubmitted = true;
        if (!$scope.profile_add_form.$valid) {
          return;
        }
        profile = ProfileService.createProfile($scope.profile);
        $scope.profile = null;
        return $location.path("/profile/" + profile.id);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileDetailController', [
    '$routeParams', '$scope', 'ProfileService', function($routeParams, $scope, ProfileService) {
      return $scope.profile = ProfileService.getProfileById($routeParams.id);
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileEditController', [
    '$location', '$routeParams', '$scope', 'ProfileService', function($location, $routeParams, $scope, ProfileService) {
      $scope.isProfileAddFormSubmitted = false;
      $scope.profile = ProfileService.getProfileById($routeParams.id);
      $scope.deleteProfile = function() {
        ProfileService.deleteProfile($scope.profile);
        return $location.path("/");
      };
      $scope.hasFieldError = function(field) {
        return $scope.isProfileAddFormSubmitted && $scope.profile_add_form[field].$error.required;
      };
      return $scope.saveProfile = function() {
        $scope.isProfileAddFormSubmitted = true;
        if (!$scope.profile_add_form.$valid) {
          return;
        }
        return ProfileService.editProfile($scope.profile);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('app').service('ProfileService', [
    'StoreService', function(StoreService) {
      this.createProfile = function(profile) {
        var new_profile, profiles, slug;
        profiles = this.getProfiles();
        slug = StoreService.generateSlug(profile.name);
        new_profile = {
          id: slug,
          name: profile.name,
          description: profile.description,
          gender: profile.gender
        };
        profiles.push(new_profile);
        StoreService.set('profiles', profiles);
        return new_profile;
      };
      this.editProfile = function(new_profile) {
        var ids, old_profile, profile, profile_index, profiles;
        profile = {};
        old_profile = this.getProfileById(new_profile.id);
        _.extend(profile, old_profile, new_profile);
        profiles = this.getProfiles();
        ids = _.pluck(profiles, 'id');
        profile_index = _.indexOf(ids, profile.id);
        profiles[profile_index] = profile;
        StoreService.set('profiles', profiles);
        return profile;
      };
      this.deleteProfile = function(profile) {
        var ids, profile_index, profiles;
        this.deleteProfileById(profile.id);
        profiles = this.getProfiles();
        ids = _.pluck(profiles, 'id');
        profile_index = _.indexOf(ids, profile.id);
        profiles.splice(profile_index, 1);
        StoreService.set('profiles', profiles);
        return profiles;
      };
      this.deleteProfileById = function(id) {
        var profile;
        return profile = this.getProfileById();
      };
      this.getProfileById = function(id) {
        var profiles;
        profiles = this.getProfiles();
        return _.findWhere(profiles, {
          id: id
        });
      };
      this.getProfiles = function() {
        var profiles;
        profiles = StoreService.get('profiles');
        return profiles || [];
      };
      return this;
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('HeaderController', [
    '$scope', function($scope) {
      return $scope.title = 'Size Me Up';
    }
  ]);

}).call(this);

(function() {
  angular.module('app').service('StoreService', [
    function() {
      this.generateSlug = function(name, collection) {
        var ids, slug, version, _ref;
        slug = this.slugify(name);
        ids = _.pluck(collection, 'id');
        while (_.contains(ids, slug)) {
          version = (_ref = slug.match(/-([1-9]+)$/)) != null ? _ref[0] : void 0;
          slug.replace(/-([1-9]+)$/, '');
          if (version != null) {
            slug += "-" + version;
          } else {
            slug += '-1';
          }
        }
        return slug;
      };
      this.get = function(key) {
        var json;
        json = localStorage.getItem(key);
        return JSON.parse(json);
      };
      this.set = function(key, value) {
        var json;
        json = JSON.stringify(value);
        return localStorage.setItem(key, json);
      };
      this.slugify = function(string) {
        return string.trim().toLowerCase().replace(' ', '-');
      };
      return this;
    }
  ]);

}).call(this);

angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('home/home.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-12 columns\">\n" +
    "    <h1>Getting Started</h1>\n" +
    "    <p>Some text explaining wtf this is</p>\n" +
    "    <div style=\"height: 200px; background-color: #666\">img or something</div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <section class=\"panel\">\n" +
    "      <h2>Section 1</h2>\n" +
    "      <p>Section Content</p>\n" +
    "      <ul>\n" +
    "        <li><i class=\"fa fa-mobile\"></i>&nbsp;\n" +
    "          Mobile compatible\n" +
    "        </li>\n" +
    "        <li><i class=\"fa fa-desktop\"></i>&nbsp;\n" +
    "          Desktop compatible\n" +
    "        </li>\n" +
    "        <li><i class=\"fa fa-book\"></i>&nbsp;\n" +
    "          Man's best friend\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <section class=\"panel\">\n" +
    "      <h2>Section 2</h2>\n" +
    "      <p>Section Content</p>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <section class=\"panel\">\n" +
    "      <h2>Section 3</h2>\n" +
    "      <p>Section Content</p>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('navigation/_navigation.html',
    "\n" +
    "<div ng-controller=\"navigationController\" class=\"nav\">\n" +
    "  <aside class=\"left-off-canvas-menu\">\n" +
    "    <ul class=\"off-canvas-list\">\n" +
    "      <li><a href=\"#\"><i class=\"fa fa-home\"></i>&nbsp;\n" +
    "          Home</a></li>\n" +
    "      <li><a href=\"#add-profile\"><i class=\"fa fa-plus-square\"></i>&nbsp;\n" +
    "          Profile</a></li>\n" +
    "      <li>\n" +
    "        <label>Profiles</label>\n" +
    "      </li>\n" +
    "      <li ng-repeat=\"profile in profiles\"><a href=\"#profile/{{profile.id}}\"><i ng-class=\"{'fa-female': profile.gender == 'female', 'fa-male': profile.gender == 'male'}\" class=\"fa\"></i>&nbsp;\n" +
    "          {{profile.name}}</a></li>\n" +
    "    </ul>\n" +
    "  </aside>\n" +
    "</div>"
  );


  $templateCache.put('profile/profile-add.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-12 columns\">\n" +
    "    <h1>Add Profile</h1>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <div style=\"height: 200px; background-color: #666\">img or something</div>\n" +
    "  </div>\n" +
    "  <div class=\"small-8 columns\">\n" +
    "    <form id=\"profile_add_form\" name=\"profile_add_form\" novalidate=\"novalidate\" ng-submit=\"saveProfile()\">\n" +
    "      <div class=\"row\">\n" +
    "        <div ng-class=\"{'error': hasFieldError('name')}\" class=\"small-12 columns\">\n" +
    "          <label for=\"name\">Name <small>required</small></label>\n" +
    "          <input id=\"profile_add_name\" name=\"name\" placeholder=\"Name\" required=\"required\" type=\"text\" ng-model=\"profile.name\"/><small ng-show=\"hasFieldError('name')\" class=\"error\">Please enter a name</small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label for=\"profile_add_description\">Note</label>\n" +
    "          <textarea id=\"profile_add_description\" name=\"profile_add_description\" placeholder=\"Description\" ng-model=\"profile.description\"></textarea>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label>Gender <small>required</small></label>\n" +
    "          <input id=\"profile_add_gender_male\" name=\"gender\" required=\"required\" type=\"radio\" value=\"male\" ng-model=\"profile.gender\"/>\n" +
    "          <label for=\"profile_add_gender_male\" ng-class=\"{'error': hasFieldError('gender')}\">Male</label>\n" +
    "          <input id=\"profile_add_gender_female\" name=\"gender\" required=\"required\" type=\"radio\" value=\"female\" ng-model=\"profile.gender\"/>\n" +
    "          <label for=\"profile_add_gender_female\" ng-class=\"{'error': hasFieldError('gender')}\">Female</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <button type=\"submit\" class=\"button tiny\">Save</button>\n" +
    "          <button type=\"reset\" class=\"button secondary tiny\">Reset</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('profile/profile-detail.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-12 columns\"><a href=\"#edit-profile/{{profile.id}}\" class=\"button tiny right\">Edit</a>\n" +
    "    <h1>Profile <small>{{profile.name}}</small></h1>\n" +
    "    <div class=\"panel\">\n" +
    "      <p>{{profile.description}}</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-6 columns\">\n" +
    "    <label>\n" +
    "      Jacket size\n" +
    "      &nbsp;<small>(also includes overcoats and raincoat)</small>\n" +
    "    </label>\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "    <label>\n" +
    "      Shirt size\n" +
    "      &nbsp;<small>(also includes sweater and polo)</small>\n" +
    "    </label>\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "    <div ng-switch=\"profile.gender\">\n" +
    "      <div ng-switch-when=\"male\">\n" +
    "        <label>Chest</label>\n" +
    "        <input type=\"text\" placeholder=\"Chest\"/>\n" +
    "      </div>\n" +
    "      <div ng-switch-when=\"female\">\n" +
    "        <label>Bust</label>\n" +
    "        <input type=\"text\" placeholder=\"Bust\"/>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <label>Waist</label>\n" +
    "    <input type=\"text\" placeholder=\"Waist\"/>\n" +
    "    <label>Inseam</label>\n" +
    "    <input type=\"text\" placeholder=\"Inseam\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-6 columns\">\n" +
    "    <label>Shoe</label>\n" +
    "    <input type=\"text\" placeholder=\"Shoe\"/>\n" +
    "    <label>Hat</label>\n" +
    "    <input type=\"text\" placeholder=\"Hat\"/>\n" +
    "    <label>Gloves</label>\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "    <label>Ring</label>\n" +
    "    <input type=\"text\" placeholder=\"Ring\"/>\n" +
    "    <label>Bracelet</label>\n" +
    "    <input type=\"text\" placeholder=\"Bracelet\"/>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('profile/profile-edit.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-12 columns\">\n" +
    "    <button ng-click=\"deleteProfile()\" class=\"button alert tiny right\">Delete</button>\n" +
    "    <h1>Edit Profile <small>{{profile.name}}</small></h1>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <div style=\"height: 200px; background-color: #666\">img or something</div>\n" +
    "  </div>\n" +
    "  <div class=\"small-8 columns\">\n" +
    "    <form id=\"profile_add_form\" name=\"profile_add_form\" novalidate=\"novalidate\" ng-submit=\"saveProfile()\">\n" +
    "      <div class=\"row\">\n" +
    "        <div ng-class=\"{'error': hasFieldError('name')}\" class=\"small-12 columns\">\n" +
    "          <label for=\"name\">Name <small>required</small></label>\n" +
    "          <input id=\"profile_add_name\" name=\"name\" placeholder=\"Name\" required=\"required\" type=\"text\" ng-model=\"profile.name\"/><small ng-show=\"hasFieldError('name')\" class=\"error\">Please enter a name</small>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label for=\"profile_add_description\">Description</label>\n" +
    "          <textarea id=\"profile_add_description\" name=\"profile_add_description\" placeholder=\"Description\" ng-model=\"profile.description\"></textarea>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label>Gender <small>required</small></label>\n" +
    "          <input id=\"profile_add_gender_male\" name=\"gender\" required=\"required\" type=\"radio\" value=\"male\" ng-model=\"profile.gender\"/>\n" +
    "          <label for=\"profile_add_gender_male\" ng-class=\"{'error': hasFieldError('gender')}\">Male</label>\n" +
    "          <input id=\"profile_add_gender_female\" name=\"gender\" required=\"required\" type=\"radio\" value=\"female\" ng-model=\"profile.gender\"/>\n" +
    "          <label for=\"profile_add_gender_female\" ng-class=\"{'error': hasFieldError('gender')}\">Female</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <button type=\"submit\" class=\"button tiny\">Save</button><a href=\"#profile/{{profile.id}}\" class=\"button secondary tiny\">Cancel</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('shared/layout/main/_footer.html',
    "\n" +
    "<footer>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"small-9 columns\">\n" +
    "      <ul class=\"inline-list\">\n" +
    "        <li>Size Me Up</li>\n" +
    "        <li><a href=\"#\">Home</a></li>\n" +
    "        <li><a href=\"#\">About</a></li>\n" +
    "      </ul>\n" +
    "      <p>&copy; 2014 Size Me Up</p>\n" +
    "    </div>\n" +
    "    <div class=\"small-3 columns\">\n" +
    "      <ul class=\"inline-list\">\n" +
    "        <li><a href=\"#\"><i class=\"fa fa-facebook-square\"></i></a></li>\n" +
    "        <li><a href=\"#\"><i class=\"fa fa-twitter-square\"></i></a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>"
  );


  $templateCache.put('shared/layout/main/_header.html',
    "\n" +
    "<header ng-controller=\"HeaderController\">\n" +
    "  <nav class=\"tab-bar\">\n" +
    "    <section class=\"left-small\"><a class=\"left-off-canvas-toggle menu-icon\"><span></span></a></section>\n" +
    "    <section class=\"right tab-bar-section\">\n" +
    "      <h1><a id=\"brand\" href=\"/\">{{title}}</a></h1>\n" +
    "    </section>\n" +
    "  </nav>\n" +
    "</header>"
  );

}]);
