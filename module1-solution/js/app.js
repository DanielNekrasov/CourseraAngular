//var arrayOfStrings = stringToSplit.split(separator);
(function () {
  'use strict'
angular.module("LunchCheck",[])
  
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){
    $scope.Checker = function(){
      var NumberOfItems = 0;

      if ($scope.menu){
        var ArrayOfitems = $scope.menu.split(',');
        for (var i = 0; i<ArrayOfitems.length; i++){
          if (ArrayOfitems[i].trim()){
            NumberOfItems++;
          }
        };

       if(NumberOfItems<=3){
          $scope.message="Enjoy!";
          $scope.color="greenText";
        } else {
          $scope.message="Too much!";
          $scope.color="greenText";
        }
      }

      else{
        $scope.message="Please enter data first";  
        $scope.color="redText";
      }
     

 
    }


  }




})();

