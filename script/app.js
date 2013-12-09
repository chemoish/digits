(function() {
  angular.module('app', ['ngRoute'], function($routeProvider, $locationProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'home/home.html',
      controller: 'HomeController'
    }).when('/add-profile', {
      templateUrl: 'profile/profile-add.html',
      controller: 'ProfileAddController'
    }).when('/profile/:profileId', {
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
    '$scope', function($scope) {
      return $scope.profiles = [
        {
          id: 1,
          gender: 'female',
          name: 'Spouse'
        }, {
          id: 2,
          gender: 'female',
          name: 'Mom'
        }, {
          id: 3,
          gender: 'male',
          name: 'Dad'
        }
      ];
    }
  ]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileAddController', ['$scope', function($scope) {}]);

}).call(this);

(function() {
  angular.module('app').controller('ProfileDetailController', ['$scope', function($scope) {}]);

}).call(this);

(function() {
  angular.module('app').controller('HeaderController', [
    '$scope', function($scope) {
      return $scope.title = 'Size Me Up';
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
    "    <div class=\"panel\">\n" +
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
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"small-8 columns\">\n" +
    "    <form id=\"profile_add_form\" name=\"profile_add_form\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label for=\"profile_add_name\">Name <small>required</small></label>\n" +
    "          <input id=\"profile_add_name\" name=\"profile_add_name\" placeholder=\"Name\" type=\"text\"/>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label for=\"profile_add_description\">Description</label>\n" +
    "          <textarea id=\"profile_add_description\" name=\"profile_add_description\" placeholder=\"Description\"></textarea>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <label>Gender <small>required</small></label>\n" +
    "          <input id=\"profile_add_gender_male\" name=\"profile_add_gender\" type=\"radio\" value=\"male\"/>\n" +
    "          <label for=\"profile_add_gender_male\">Male</label>\n" +
    "          <input id=\"profile_add_gender_female\" name=\"profile_add_gender\" type=\"radio\" value=\"female\"/>\n" +
    "          <label for=\"profile_add_gender_female\">Female</label>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"small-12 columns\">\n" +
    "          <button type=\"submit\" class=\"button tiny\">Save</button>\n" +
    "          <button type=\"submit\" class=\"button secondary tiny\">Cancel</button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('profile/profile-detail.html',
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-12 columns\">\n" +
    "    <h1>Profile <small>Spouse</small></h1>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Overall</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\"></div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Bust</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Bust\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Waist</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Waist\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Hip</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Hip\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Inseam</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Inseam\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Height</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Height\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Ring</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Ring\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Bracelet</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Bracelet\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <label class=\"right inline\">Shoe</label>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <input type=\"text\" placeholder=\"Shoe\"/>\n" +
    "  </div>\n" +
    "  <div class=\"small-4 columns\">\n" +
    "    <select>\n" +
    "      <option value=\"small\">S</option>\n" +
    "      <option value=\"medium\">M</option>\n" +
    "    </select>\n" +
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
