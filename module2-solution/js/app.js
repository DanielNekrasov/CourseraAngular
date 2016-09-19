(function(){
  'use strict';
  angular.module('ShoppingListCheckOff', [])

  .controller('ToBuyShoppingController', ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject=['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var tobuy = this;
    tobuy.list = ShoppingListCheckOffService.itemsToBuy;
    tobuy.ItemIsBougth = function(Index){
      ShoppingListCheckOffService.Bought(Index);
    };

  };


  AlreadyBoughtShoppingController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
    var bought = this;
    bought.list = ShoppingListCheckOffService.BoughtItems;

  };


  function ShoppingListCheckOffService() {
    var service = this;

    service.itemsToBuy = [{ name: "rye bread", quantity: 1 },
                      { name: "cucumbers", quantity: 5 },
                      { name: "carrot", quantity: 10 },
                      { name: "tomatoes", quantity: 6 },
                      { name: "yogurt", quantity: 2 },
                      { name: "cookies", quantity: 57 }];
    service.BoughtItems = [];

    service.Bought = function(index){
      var item = service.itemsToBuy[index];
      //remove that item from the "to buy" array
      service.itemsToBuy.splice(index, 1);
      //pushe it to the "bought" array
      service.BoughtItems.push(item);
    };
  };


})();
