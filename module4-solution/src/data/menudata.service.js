(function(){
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('APIBasePath', "https://davids-restaurant.herokuapp.com");


  MenuDataService.$inject = ['$http', 'APIBasePath'];
  function MenuDataService($http, APIBasePath){
    var service = this;

    service.getAllCategories = function(){
      var response = $http({
        method: "GET",
        url: (APIBasePath + "/categories.json")
      })
      .then(function(result){
        var items = result.data;
        return items;
      })
      .catch(function(error){
        console.log('error in service method');
      })
      return response;
    };

    service.getItemsForCategory = function(categoryShortName){
      var response = $http({
        method: "GET",
        url: (APIBasePath +"/menu_items.json"),
        params: {
          category: categoryShortName
        }
      });
      return response;
    };

  }

})();
