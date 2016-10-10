(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('categories', {
    url:'/categories',
    templateUrl: 'src/menuapp/templates/categoriesview.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      items:['MenuDataService', function (MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('items', {
    url:'/items/{short_name}',
    templateUrl:'src/menuapp/templates/items-view.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve:{
      item:['$stateParams', 'MenuDataService',
            function($stateParams, MenuDataService){
              console.log($stateParams.short_name);
              return MenuDataService.getItemsForCategory($stateParams.short_name)
            }]
    }
  }) // END of states
}

})();
