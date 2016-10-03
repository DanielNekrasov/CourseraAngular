(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems);

function FoundItems(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope:{
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    }
    return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;

};

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var list = this;

  list.searchTerm = "";

  list.narrowItDown = function(){
   MenuSearchService.getMatchedMenuItems(list.searchTerm);
   list.items = MenuSearchService.getItems();
   list.finding = true;
  };

  list.removeItem = function(itemIndex){
    MenuSearchService.removeItem(itemIndex);
    console.log(list.items);
  };
}

MenuSearchService.$inject = ['$http'];

function MenuSearchService($http){
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm){
    foundItems = [];
    if (searchTerm !== ""){
      var response = $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });

      response.then(function(result) {
        var Items = result.data.menu_items;
        for (var i = 0; i < Items.length-1; i++) {
          if (Items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
            foundItems.push(Items[i]);
          };
        }
      })
    }

  };

  service.getItems = function(){
    return foundItems;
  };

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
};



})();
