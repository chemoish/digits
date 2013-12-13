(function(){angular.module("app",["ngRoute"],function(a){return a.when("/",{templateUrl:"home/home.html",controller:"HomeController"}).when("/add-profile",{templateUrl:"profile/profile-add.html",controller:"ProfileAddController"}).when("/edit-profile/:id",{templateUrl:"profile/profile-edit.html",controller:"ProfileEditController"}).when("/profile/:id",{templateUrl:"profile/profile-show.html",controller:"ProfileShowController"}).otherwise({redirectTo:"/"})}),$(document).foundation()}).call(this),function(){angular.module("app").controller("HomeController",["$scope",function(){}])}.call(this),function(){angular.module("app").controller("HeaderController",["$scope",function(a){return a.title="Digits"}])}.call(this),function(){angular.module("app").controller("navigationController",["$filter","$scope","ProfileService",function(a,b,c){return b.profiles=c.getProfilesSorted("name"),b.$on("profile-create",function(){return b.profiles=c.getProfilesSorted("name")}),b.$on("profile-delete",function(){return b.profiles=c.getProfilesSorted("name")}),b.$on("profile-edit",function(){return b.profiles=c.getProfilesSorted("name")})}])}.call(this),function(){angular.module("app").controller("ProfileAddController",["$location","$scope","ProfileService",function(a,b,c){return b.isProfileAddFormSubmitted=!1,b.profile=null,b.hasFieldError=function(a){return b.isProfileAddFormSubmitted&&b.profile_add_form[a].$error.required},b.saveProfile=function(){var d;return b.isProfileAddFormSubmitted=!0,b.profile_add_form.$valid?(d=c.createProfile(b.profile),b.profile=null,a.path("/profile/"+d.id)):void 0}}])}.call(this),function(){angular.module("app").controller("ProfileEditController",["$location","$routeParams","$scope","ProfileService",function(a,b,c,d){return c.isProfileEditFormSubmitted=!1,c.profile=d.getProfileById(b.id),c.deleteProfile=function(){return d.deleteProfile(c.profile),a.path("/")},c.hasFieldError=function(a){return c.isProfileEditFormSubmitted&&c.profile_edit_form[a].$error.required},c.saveProfile=function(){var b;return c.isProfileEditFormSubmitted=!0,c.profile_edit_form.$valid?(b=d.editProfile(c.profile),a.path("/edit-profile/"+b.id)):void 0}}])}.call(this),function(){angular.module("app").controller("ProfileShowController",["$routeParams","$scope","EnumFactory","ProfileService",function(a,b,c,d){return b["enum"]=c,b.profile=d.getProfileById(a.id),b.$watchCollection("profile.sizes",_.debounce(function(){return d.editProfile(b.profile)},300))}])}.call(this),function(){angular.module("app").service("ProfileService",["$filter","$rootScope","StoreService",function(a,b,c){return this.createProfile=function(a){var d,e,f;return e=this.getProfiles(),f=c.generateSlug(a.id,a.name,e),d={id:f,name:a.name,description:a.description,gender:a.gender},e.push(d),c.set("profiles",e),b.$broadcast("profile-create"),d},this.editProfile=function(a){var d,e,f,g;return f=this.getProfiles(),d=_.pluck(f,"id"),e=_.indexOf(d,a.id),g=c.generateSlug(a.id,a.name,f),a.id!==g&&(a.id=g),f[e]=a,c.set("profiles",f),b.$broadcast("profile-edit"),a},this.deleteProfile=function(a){return this.deleteProfileById(a.id)},this.deleteProfileById=function(a){var d,e,f;return f=this.getProfiles(),d=_.pluck(f,"id"),e=_.indexOf(d,a),f.splice(e,1),c.set("profiles",f),b.$broadcast("profile-delete"),f},this.getProfileById=function(a){var b;return b=this.getProfiles(),_.findWhere(b,{id:a})},this.getProfiles=function(){var a;return a=c.get("profiles"),a||[]},this.getProfilesSorted=function(b){return null==b&&(b=""),a("orderBy")(this.getProfiles(),b)},this}])}.call(this),function(){angular.module("app").factory("EnumFactory",function(){var a;return a={},a.SIZE={XSMALL:"XS",SMALL:"S",MEDIUM:"M",LARGE:"L",XLARGE:"XL",XXLARGE:"XXL"},a.SIZES=[a.SIZE.XSMALL,a.SIZE.SMALL,a.SIZE.MEDIUM,a.SIZE.LARGE,a.SIZE.XLARGE,a.SIZE.XXLARGE],a})}.call(this),function(){angular.module("app").service("StoreService",[function(){return this.generateSlug=function(a,b,c){var d,e,f,g;for(e=this.slugify(b),d=_.pluck(c,"id");a!==e&&_.contains(d,e);)f=null!=(g=e.match(/-([1-9]+)$/))?g[1]:void 0,null!=f?(f=parseInt(f)+1,e=e.replace(/-([1-9]+)$/,f)):e+="-1";return e},this.get=function(a){var b;return b=localStorage.getItem(a),JSON.parse(b)},this.set=function(a,b){var c;return c=JSON.stringify(b),localStorage.setItem(a,c)},this.slugify=function(a){return a.trim().toLowerCase().replace(" ","-")},this}])}.call(this),angular.module("app").run(["$templateCache",function(a){"use strict";a.put("home/home.html",'<div class="row"><div class="columns"><div class="slat intro"><h2>Gimme yo digits!</h2><p class="subtitle">Manage the sizes of all your loved ones, effortlessly, through one simple app.</p></div></div></div><div class="row"><div class="large-4 columns"><div class="babble babble-faux-img">shopping<br />\nmade easy!</div></div><div class="large-4 columns"><section class="panel babble"><h2>Features</h2><p class="subtitle">Truely a man\'s best friend&hellip;</p><ul class="square"><li>Create profiles for all of your friends</li><li>Update sizes extremely quickly</li><li>Peace of mind</li><li>Absolutely Free</li></ul></section></div><div class="large-4 columns"><section class="panel babble"><h2>Compatibility</h2><p class="subtitle">Works on&hellip;</p><ul class="square"><li><i class="fa fa-mobile"></i>&nbsp;\nMobile</li><li><i class="fa fa-desktop"></i>&nbsp;\nDesktop</li></ul></section></div></div>'),a.put("layout/main/_footer.html",'<footer><div class="row"><div class="columns"><ul class="inline-list"><li>Digits</li><li><a href="#">Home</a></li></ul><p class="copyright">&copy; 2014 Digits</p></div></div></footer>'),a.put("layout/main/_header.html",'<header ng-controller="HeaderController"><div class="brand"><a href="#" class="logo"><i class="fa fa-lightbulb-o"></i><h1>Digits</h1><p class="subtitle">Taking the guesswork out of shopping.</p></a></div></header>'),a.put("navigation/_navigation.html",'<div ng-controller="navigationController" class="nav"><nav data-topbar="data-topbar" class="top-bar hide-for-small-only"><div class="top-bar-section"><ul class="right"><li class="divider"></li><li class="has-dropdown not-click"><a>Profiles</a><ul class="dropdown"><li><a href="#add-profile"><i class="fa fa-plus-square"></i>&nbsp;\nProfile</a></li><li ng-repeat="profile in profiles"><a href="#profile/{{profile.id}}"><i ng-class="{\'fa-female\': profile.gender == \'female\', \'fa-male\': profile.gender == \'male\'}" class="fa"></i>&nbsp;\n{{profile.name}}</a></li></ul></li></ul><ul class="left"><li><a href="#"><i class="fa fa-home"></i>&nbsp;\nHome</a></li></ul></div></nav><nav class="tab-bar hide-for-medium-up"><section class="left-small"><a class="left-off-canvas-toggle menu-icon"><span></span></a></section><section class="middle tab-bar-section">Menu</section></nav><div class="nav"><aside class="left-off-canvas-menu"><ul class="off-canvas-list"><li><a href="#"><i class="fa fa-home"></i>&nbsp;\nHome</a></li><li><a href="#add-profile"><i class="fa fa-plus-square"></i>&nbsp;\nProfile</a></li><li><label>Profiles</label></li><li ng-repeat="profile in profiles"><a href="#profile/{{profile.id}}"><i ng-class="{\'fa-female\': profile.gender == \'female\', \'fa-male\': profile.gender == \'male\'}" class="fa"></i>&nbsp;\n{{profile.name}}</a></li></ul></aside></div></div>'),a.put("profile/profile-add.html",'<div class="row"><div class="columns"><div class="slat"><h2>Add Profile</h2></div></div></div><form id="profile_add_form" name="profile_add_form" novalidate="novalidate" ng-submit="saveProfile()"><div class="row"><div ng-class="{\'error\': hasFieldError(\'name\')}" class="columns"><label for="profile_add_name">Name <small>required</small></label><input id="profile_add_name" name="name" placeholder="Name" required="required" type="text" ng-model="profile.name"/><small ng-show="hasFieldError(\'name\')" class="error">Please enter a name</small></div></div><div class="row"><div class="columns"><label for="profile_add_description">Note</label><textarea id="profile_add_description" name="description" placeholder="Description" ng-model="profile.description"></textarea></div></div><div class="row"><div class="columns"><label>Gender <small>required</small></label><input id="profile_add_gender_male" name="gender" required="required" type="radio" value="male" ng-model="profile.gender"/><label for="profile_add_gender_male" ng-class="{\'error\': hasFieldError(\'gender\')}">Male</label><input id="profile_add_gender_female" name="gender" required="required" type="radio" value="female" ng-model="profile.gender"/><label for="profile_add_gender_female" ng-class="{\'error\': hasFieldError(\'gender\')}">Female</label></div></div><div class="row"><div class="columns"><button type="submit" class="button tiny">Save</button><button type="reset" class="button secondary tiny">Reset</button></div></div></form>'),a.put("profile/profile-edit.html",'<div class="row"><div class="columns"><div class="slat"><h2>Edit Profile <small>{{profile.name}}</small></h2></div></div></div><form id="profile_edit_form" name="profile_edit_form" novalidate="novalidate" ng-submit="saveProfile()"><div class="row"><div ng-class="{\'error\': hasFieldError(\'name\')}" class="columns"><label for="profile_edit_name">Name <small>required</small></label><input id="profile_edit_name" name="name" placeholder="Name" required="required" type="text" ng-model="profile.name"/><small ng-show="hasFieldError(\'name\')" class="error">Please enter a name</small></div></div><div class="row"><div class="columns"><label for="profile_edit_description">Note</label><textarea id="profile_edit_description" name="description" placeholder="Description" ng-model="profile.description"></textarea></div></div><div class="row"><div class="columns"><label>Gender <small>required</small></label><input id="profile_add_gender_male" name="gender" required="required" type="radio" value="male" ng-model="profile.gender"/><label for="profile_add_gender_male" ng-class="{\'error\': hasFieldError(\'gender\')}">Male</label><input id="profile_add_gender_female" name="gender" required="required" type="radio" value="female" ng-model="profile.gender"/><label for="profile_add_gender_female" ng-class="{\'error\': hasFieldError(\'gender\')}">Female</label></div></div><div class="row"><div class="columns actions"><button type="submit" class="button tiny">Save</button><a href="#profile/{{profile.id}}" class="button secondary tiny">Cancel</a><button ng-click="deleteProfile()" class="button alert tiny right">Delete</button></div></div></form>'),a.put("profile/profile-show.html",'<div class="row"><div class="columns"><div class="slat"><h2>Profile <small><a href="#edit-profile/{{profile.id}}">{{profile.name}}</a></small></h2><p class="subtitle">All changes are automagically saved!</p><blockquote>{{profile.description || \'&hellip;\' }} <cite>You</cite></blockquote></div></div></div><form id="profile_show_form" name="profile_show_form" novalidate="novalidate"><div class="row"><div class="columns"><label for="profile_show_jacket">Jacket size\n&nbsp;<small>(also includes overcoats and raincoat)</small></label><select id="profile_show_jacket" name="jacket" ng-model="profile.sizes.jacket" ng-options="size for size in enum.SIZES"><option value="">Select a size</option></select><label for="profile_show_shirt">Shirt size\n&nbsp;<small>(also includes sweater and polo)</small></label><select id="profile_show_shirt" name="shirt" ng-model="profile.sizes.shirt" ng-options="size for size in enum.SIZES"><option value="">Select a size</option></select><div ng-switch="profile.gender"><div ng-switch-when="male"><label for="profile_show_chest">Chest</label><input id="profile_show_chest" name="chest" placeholder="Chest" type="text" ng-model="profile.sizes.chest"/></div><div ng-switch-when="female"><label for="profile_show_bust">Bust</label><input id="profile_show_bust" name="bust" placeholder="Bust" type="text" ng-model="profile.sizes.bust"/></div></div><label for="profile_show_waist">Waist</label><input id="profile_show_waist" name="waist" placeholder="Waist" type="text" ng-model="profile.sizes.waist"/><label for="profile_show_inseam">Inseam</label><input id="profile_show_inseam" name="inseam" placeholder="Inseam" type="text" ng-model="profile.sizes.inseam"/><label for="profile_show_shoe">Shoe</label><input id="profile_show_shoe" name="shoe" placeholder="Shoe" type="text" ng-model="profile.sizes.shoe"/><label for="profile_show_hat">Hat</label><input id="profile_show_hat" name="hat" placeholder="Hat" type="text" ng-model="profile.sizes.hat"/><label for="profile_show_glove">Gloves</label><select id="profile_show_glove" name="profile_show_glove" ng-model="profile.sizes.glove" ng-options="size for size in enum.SIZES"><option value="">Select a size</option></select><label for="profile_show_ring">Ring</label><input id="profile_show_ring" name="ring" placeholder="Ring" type="text" ng-model="profile.sizes.ring"/><label for="profile_show_bracelet">Bracelet</label><input id="profile_show_bracelet" name="bracelet" placeholder="Bracelet" type="text" ng-model="profile.sizes.bracelet"/></div></div></form>')}]);