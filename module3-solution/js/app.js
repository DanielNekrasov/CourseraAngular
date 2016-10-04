(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('APIBasePath', "//davids-restaurant.herokuapp.com/menu_items.json");


function FoundItems(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope:{
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true,
      link: FoundItemsDirectiveLink
    }
    return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;
  list.isAnythingFound = function(){
    if ((list.items!==undefined) && (list.items.length === 0)) {
      return true;
    }
  }
};

function FoundItemsDirectiveLink(scope, element, attrs, controller){
  console.log("Link scope is: ", scope);
  console.log("Controller instance is: ", controller);
  console.log("Element is: ", element);

  scope.$watch('list.isAnythingFound()', function(newValue, oldValue){
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);

    if (newValue === true) {
      displayCookieWarning();
    }
    else {
      removeCookieWarning();
    }

  });

  function displayCookieWarning() {
    var warningElem = element.find("div.error");
    console.log(warningElem);
    warningElem.css('display', 'block');
  }


  function removeCookieWarning() {
    var warningElem = element.find("div.error");
    warningElem.css('display', 'none');
  }
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  list.searchTerm = "";

  list.narrowItDown = function(){
      MenuSearchService.getMatchedMenuItems(list.searchTerm).
      then(function(response){
        list.items = response;
      })
      .catch(function (error) {
        console.log('something goes wrong');
      })
  };

  list.removeItem = function(itemIndex){
    list.items.splice(itemIndex, 1)
  }

}

MenuSearchService.$inject = ['$http','APIBasePath'];

function MenuSearchService($http, APIBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: (APIBasePath )})
      .then(function (response) {
        // process the result and only keep items that match
        var allItems = response.data.menu_items;
        var foundItems = [];

        if (searchTerm.length == 0) {
            allItems = [];
        } else {
          for (var i = 0; i < allItems.length; i++) {
              var str = allItems[i].description;

              if (str.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                  foundItems.push(allItems[i]);
              }
          } //for
        }

        return foundItems;
      })
      .catch(function (error) {
              console.log("error in service method");
      });
  }; //End service
};



})();
