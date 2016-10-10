(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['item'];
function ItemDetailController(item) {
  var ItemsList = this;
  ItemsList.items = item.data.menu_items;
}
})();
