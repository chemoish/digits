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
      templateUrl: 'profile/profile-show.html',
      controller: 'ProfileShowController'
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
  angular.module('app').controller('HeaderController', [
    '$scope', function($scope) {
      return $scope.title = 'Digits';
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('navigationController', [
    '$filter', '$scope', 'ProfileService', function($filter, $scope, ProfileService) {
      $scope.profiles = ProfileService.getProfilesSorted('name');
      $scope.$on('profile-create', function() {
        return $scope.profiles = ProfileService.getProfilesSorted('name');
      });
      $scope.$on('profile-delete', function() {
        return $scope.profiles = ProfileService.getProfilesSorted('name');
      });
      return $scope.$on('profile-edit', function() {
        return $scope.profiles = ProfileService.getProfilesSorted('name');
      });
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
  angular.module('app').controller('ProfileEditController', [
    '$location', '$routeParams', '$scope', 'ProfileService', function($location, $routeParams, $scope, ProfileService) {
      $scope.isProfileEditFormSubmitted = false;
      $scope.profile = ProfileService.getProfileById($routeParams.id);
      $scope.deleteProfile = function() {
        ProfileService.deleteProfile($scope.profile);
        return $location.path("/");
      };
      $scope.hasFieldError = function(field) {
        return $scope.isProfileEditFormSubmitted && $scope.profile_edit_form[field].$error.required;
      };
      return $scope.saveProfile = function() {
        var profile;
        $scope.isProfileEditFormSubmitted = true;
        if (!$scope.profile_edit_form.$valid) {
          return;
        }
        profile = ProfileService.editProfile($scope.profile);
        return $location.path("/edit-profile/" + profile.id);
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileShowController', [
    '$routeParams', '$scope', 'EnumFactory', 'ProfileService', function($routeParams, $scope, EnumFactory, ProfileService) {
      $scope["enum"] = EnumFactory;
      $scope.profile = ProfileService.getProfileById($routeParams.id);
      return $scope.$watchCollection('profile.sizes', _.debounce(function(newSizes, oldSizes) {
        return ProfileService.editProfile($scope.profile);
      }, 300));
    }
  ]);

}).call(this);

(function() {
  angular.module('app').service('ProfileService', [
    '$filter', '$rootScope', 'StoreService', function($filter, $rootScope, StoreService) {
      this.createProfile = function(profile) {
        var new_profile, profiles, slug;
        profiles = this.getProfiles();
        slug = StoreService.generateSlug(profile.id, profile.name, profiles);
        new_profile = {
          id: slug,
          name: profile.name,
          description: profile.description,
          gender: profile.gender
        };
        profiles.push(new_profile);
        StoreService.set('profiles', profiles);
        $rootScope.$broadcast('profile-create');
        return new_profile;
      };
      this.editProfile = function(profile) {
        var ids, profile_index, profiles, slug;
        profiles = this.getProfiles();
        ids = _.pluck(profiles, 'id');
        profile_index = _.indexOf(ids, profile.id);
        slug = StoreService.generateSlug(profile.id, profile.name, profiles);
        if (profile.id !== slug) {
          profile.id = slug;
        }
        profiles[profile_index] = profile;
        StoreService.set('profiles', profiles);
        $rootScope.$broadcast('profile-edit');
        return profile;
      };
      this.deleteProfile = function(profile) {
        return this.deleteProfileById(profile.id);
      };
      this.deleteProfileById = function(id) {
        var ids, profile_index, profiles;
        profiles = this.getProfiles();
        ids = _.pluck(profiles, 'id');
        profile_index = _.indexOf(ids, id);
        profiles.splice(profile_index, 1);
        StoreService.set('profiles', profiles);
        $rootScope.$broadcast('profile-delete');
        return profiles;
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
      this.getProfilesSorted = function(sort) {
        if (sort == null) {
          sort = '';
        }
        return $filter('orderBy')(this.getProfiles(), sort);
      };
      return this;
    }
  ]);

}).call(this);

(function() {
  angular.module('app').factory('EnumFactory', function() {
    var enums;
    enums = {};
    enums['SIZE'] = {
      XSMALL: "XS",
      SMALL: "S",
      MEDIUM: "M",
      LARGE: "L",
      XLARGE: "XL",
      XXLARGE: "XXL"
    };
    enums['SIZES'] = [enums.SIZE.XSMALL, enums.SIZE.SMALL, enums.SIZE.MEDIUM, enums.SIZE.LARGE, enums.SIZE.XLARGE, enums.SIZE.XXLARGE];
    return enums;
  });

}).call(this);

(function() {
  angular.module('app').service('StoreService', [
    function() {
      this.generateSlug = function(id, name, collection) {
        var ids, slug, version, _ref;
        slug = this.slugify(name);
        ids = _.pluck(collection, 'id');
        while (id !== slug && _.contains(ids, slug)) {
          version = (_ref = slug.match(/-([1-9]+)$/)) != null ? _ref[1] : void 0;
          if (version != null) {
            version = parseInt(version) + 1;
            slug = slug.replace(/-([1-9]+)$/, version);
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
    "  <div class=\"columns\">\n" +
    "    <div class=\"slat intro\">\n" +
    "      <h2>Gimme yo digits!</h2>\n" +
    "      <p class=\"subtitle\">Manage the sizes of all your loved ones, effortlessly, through one simple app.</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"large-4 columns\">\n" +
    "    <div class=\"babble babble-faux-img\">\n" +
    "      shopping<br />\n" +
    "      made easy!\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"large-4 columns\">\n" +
    "    <section class=\"panel babble\">\n" +
    "      <h2>Features</h2>\n" +
    "      <p class=\"subtitle\">Truely a man's best friend&hellip;</p>\n" +
    "      <ul class=\"square\">\n" +
    "        <li>Create profiles for all of your friends</li>\n" +
    "        <li>Update sizes extremely quickly</li>\n" +
    "        <li>Peace of mind</li>\n" +
    "        <li>Absolutely Free</li>\n" +
    "      </ul>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "  <div class=\"large-4 columns\">\n" +
    "    <section class=\"panel babble\">\n" +
    "      <h2>Compatibility</h2>\n" +
    "      <p class=\"subtitle\">Works on&hellip;</p>\n" +
    "      <ul class=\"square\">\n" +
    "        <li><i class=\"fa fa-mobile\"></i>&nbsp;\n" +
    "          Mobile\n" +
    "        </li>\n" +
    "        <li><i class=\"fa fa-desktop\"></i>&nbsp;\n" +
    "          Desktop\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('layout/main/_footer.html',
    "\n" +
    "<footer>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <ul class=\"inline-list\">\n" +
    "        <li>Digits</li>\n" +
    "        <li><a href=\"#\">Home</a></li>\n" +
    "      </ul>\n" +
    "      <p class=\"copyright\">&copy; 2014 Digits</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</footer>"
  );


  $templateCache.put('layout/main/_header.html',
    "\n" +
    "<header ng-controller=\"HeaderController\">\n" +
    "  <div class=\"brand\"><a href=\"#\" class=\"logo\"><i class=\"fa fa-lightbulb-o\"></i>\n" +
    "      <h1>Digits</h1>\n" +
    "      <p class=\"subtitle\">Taking the guesswork out of shopping.</p></a></div>\n" +
    "</header>"
  );


  $templateCache.put('navigation/_navigation.html',
    "\n" +
    "<div ng-controller=\"navigationController\" class=\"nav\">\n" +
    "  <nav data-topbar=\"data-topbar\" class=\"top-bar hide-for-small-only\">\n" +
    "    <div class=\"top-bar-section\">\n" +
    "      <ul class=\"right\">\n" +
    "        <li class=\"divider\"></li>\n" +
    "        <li class=\"has-dropdown not-click\"><a>Profiles</a>\n" +
    "          <ul class=\"dropdown\">\n" +
    "            <li><a href=\"#add-profile\"><i class=\"fa fa-plus-square\"></i>&nbsp;\n" +
    "                Profile</a></li>\n" +
    "            <li ng-repeat=\"profile in profiles\"><a href=\"#profile/{{profile.id}}\"><i ng-class=\"{'fa-female': profile.gender == 'female', 'fa-male': profile.gender == 'male'}\" class=\"fa\"></i>&nbsp;\n" +
    "                {{profile.name}}</a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <ul class=\"left\">\n" +
    "        <li><a href=\"#\"><i class=\"fa fa-home\"></i>&nbsp;\n" +
    "            Home</a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "  </nav>\n" +
    "  <nav class=\"tab-bar hide-for-medium-up\">\n" +
    "    <section class=\"left-small\"><a class=\"left-off-canvas-toggle menu-icon\"><span></span></a></section>\n" +
    "    <section class=\"middle tab-bar-section\">Menu</section>\n" +
    "  </nav>\n" +
    "  <div class=\"nav\">\n" +
    "    <aside class=\"left-off-canvas-menu\">\n" +
    "      <ul class=\"off-canvas-list\">\n" +
    "        <li><a href=\"#\"><i class=\"fa fa-home\"></i>&nbsp;\n" +
    "            Home</a></li>\n" +
    "        <li><a href=\"#add-profile\"><i class=\"fa fa-plus-square\"></i>&nbsp;\n" +
    "            Profile</a></li>\n" +
    "        <li>\n" +
    "          <label>Profiles</label>\n" +
    "        </li>\n" +
    "        <li ng-repeat=\"profile in profiles\"><a href=\"#profile/{{profile.id}}\"><i ng-class=\"{'fa-female': profile.gender == 'female', 'fa-male': profile.gender == 'male'}\" class=\"fa\"></i>&nbsp;\n" +
    "            {{profile.name}}</a></li>\n" +
    "      </ul>\n" +
    "    </aside>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('profile/profile-add.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"columns\">\n" +
    "    <div class=\"slat\">\n" +
    "      <h2>Add Profile</h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<form id=\"profile_add_form\" name=\"profile_add_form\" novalidate=\"novalidate\" ng-submit=\"saveProfile()\">\n" +
    "  <div class=\"row\">\n" +
    "    <div ng-class=\"{'error': hasFieldError('name')}\" class=\"columns\">\n" +
    "      <label for=\"profile_add_name\">Name <small>required</small></label>\n" +
    "      <input id=\"profile_add_name\" name=\"name\" placeholder=\"Name\" required=\"required\" type=\"text\" ng-model=\"profile.name\"/><small ng-show=\"hasFieldError('name')\" class=\"error\">Please enter a name</small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <label for=\"profile_add_description\">Note</label>\n" +
    "      <textarea id=\"profile_add_description\" name=\"description\" placeholder=\"Description\" ng-model=\"profile.description\"></textarea>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <label>Gender <small>required</small></label>\n" +
    "      <input id=\"profile_add_gender_male\" name=\"gender\" required=\"required\" type=\"radio\" value=\"male\" ng-model=\"profile.gender\"/>\n" +
    "      <label for=\"profile_add_gender_male\" ng-class=\"{'error': hasFieldError('gender')}\">Male</label>\n" +
    "      <input id=\"profile_add_gender_female\" name=\"gender\" required=\"required\" type=\"radio\" value=\"female\" ng-model=\"profile.gender\"/>\n" +
    "      <label for=\"profile_add_gender_female\" ng-class=\"{'error': hasFieldError('gender')}\">Female</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <button type=\"submit\" class=\"button tiny\">Save</button>\n" +
    "      <button type=\"reset\" class=\"button secondary tiny\">Reset</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );


  $templateCache.put('profile/profile-edit.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"columns\">\n" +
    "    <div class=\"slat\">\n" +
    "      <h2>Edit Profile <small>{{profile.name}}</small></h2>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<form id=\"profile_edit_form\" name=\"profile_edit_form\" novalidate=\"novalidate\" ng-submit=\"saveProfile()\">\n" +
    "  <div class=\"row\">\n" +
    "    <div ng-class=\"{'error': hasFieldError('name')}\" class=\"columns\">\n" +
    "      <label for=\"profile_edit_name\">Name <small>required</small></label>\n" +
    "      <input id=\"profile_edit_name\" name=\"name\" placeholder=\"Name\" required=\"required\" type=\"text\" ng-model=\"profile.name\"/><small ng-show=\"hasFieldError('name')\" class=\"error\">Please enter a name</small>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <label for=\"profile_edit_description\">Note</label>\n" +
    "      <textarea id=\"profile_edit_description\" name=\"description\" placeholder=\"Description\" ng-model=\"profile.description\"></textarea>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <label>Gender <small>required</small></label>\n" +
    "      <input id=\"profile_add_gender_male\" name=\"gender\" required=\"required\" type=\"radio\" value=\"male\" ng-model=\"profile.gender\"/>\n" +
    "      <label for=\"profile_add_gender_male\" ng-class=\"{'error': hasFieldError('gender')}\">Male</label>\n" +
    "      <input id=\"profile_add_gender_female\" name=\"gender\" required=\"required\" type=\"radio\" value=\"female\" ng-model=\"profile.gender\"/>\n" +
    "      <label for=\"profile_add_gender_female\" ng-class=\"{'error': hasFieldError('gender')}\">Female</label>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns actions\">\n" +
    "      <button type=\"submit\" class=\"button tiny\">Save</button><a href=\"#profile/{{profile.id}}\" class=\"button secondary tiny\">Cancel</a>\n" +
    "      <button ng-click=\"deleteProfile()\" class=\"button alert tiny right\">Delete</button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );


  $templateCache.put('profile/profile-show.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"columns\">\n" +
    "    <div class=\"slat\">\n" +
    "      <h2>Profile <small><a href=\"#edit-profile/{{profile.id}}\">{{profile.name}}</a></small></h2>\n" +
    "      <p class=\"subtitle\">All changes are automagically saved!</p>\n" +
    "      <blockquote>{{profile.description || '&hellip;' }} <cite>You</cite></blockquote>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<form id=\"profile_show_form\" name=\"profile_show_form\" novalidate=\"novalidate\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"columns\">\n" +
    "      <label for=\"profile_show_jacket\">\n" +
    "        Jacket size\n" +
    "        &nbsp;<small>(also includes overcoats and raincoat)</small>\n" +
    "      </label>\n" +
    "      <select id=\"profile_show_jacket\" name=\"jacket\" ng-model=\"profile.sizes.jacket\" ng-options=\"size for size in enum.SIZES\">\n" +
    "        <option value=\"\">Select a size</option>\n" +
    "      </select>\n" +
    "      <label for=\"profile_show_shirt\">\n" +
    "        Shirt size\n" +
    "        &nbsp;<small>(also includes sweater and polo)</small>\n" +
    "      </label>\n" +
    "      <select id=\"profile_show_shirt\" name=\"shirt\" ng-model=\"profile.sizes.shirt\" ng-options=\"size for size in enum.SIZES\">\n" +
    "        <option value=\"\">Select a size</option>\n" +
    "      </select>\n" +
    "      <div ng-switch=\"profile.gender\">\n" +
    "        <div ng-switch-when=\"male\">\n" +
    "          <label for=\"profile_show_chest\">Chest</label>\n" +
    "          <input id=\"profile_show_chest\" name=\"chest\" placeholder=\"Chest\" type=\"text\" ng-model=\"profile.sizes.chest\"/>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"female\">\n" +
    "          <label for=\"profile_show_bust\">Bust</label>\n" +
    "          <input id=\"profile_show_bust\" name=\"bust\" placeholder=\"Bust\" type=\"text\" ng-model=\"profile.sizes.bust\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <label for=\"profile_show_waist\">Waist</label>\n" +
    "      <input id=\"profile_show_waist\" name=\"waist\" placeholder=\"Waist\" type=\"text\" ng-model=\"profile.sizes.waist\"/>\n" +
    "      <label for=\"profile_show_inseam\">Inseam</label>\n" +
    "      <input id=\"profile_show_inseam\" name=\"inseam\" placeholder=\"Inseam\" type=\"text\" ng-model=\"profile.sizes.inseam\"/>\n" +
    "      <label for=\"profile_show_shoe\">Shoe</label>\n" +
    "      <input id=\"profile_show_shoe\" name=\"shoe\" placeholder=\"Shoe\" type=\"text\" ng-model=\"profile.sizes.shoe\"/>\n" +
    "      <label for=\"profile_show_hat\">Hat</label>\n" +
    "      <input id=\"profile_show_hat\" name=\"hat\" placeholder=\"Hat\" type=\"text\" ng-model=\"profile.sizes.hat\"/>\n" +
    "      <label for=\"profile_show_glove\">Gloves</label>\n" +
    "      <select id=\"profile_show_glove\" name=\"profile_show_glove\" ng-model=\"profile.sizes.glove\" ng-options=\"size for size in enum.SIZES\">\n" +
    "        <option value=\"\">Select a size</option>\n" +
    "      </select>\n" +
    "      <label for=\"profile_show_ring\">Ring</label>\n" +
    "      <input id=\"profile_show_ring\" name=\"ring\" placeholder=\"Ring\" type=\"text\" ng-model=\"profile.sizes.ring\"/>\n" +
    "      <label for=\"profile_show_bracelet\">Bracelet</label>\n" +
    "      <input id=\"profile_show_bracelet\" name=\"bracelet\" placeholder=\"Bracelet\" type=\"text\" ng-model=\"profile.sizes.bracelet\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</form>"
  );

}]);
