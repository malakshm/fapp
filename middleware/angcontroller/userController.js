 
  

    //define angular controller
    //Note :  $scope is injected into the page, which serves as an interface between view and model
   
 feedbackApp.controller('userController', function($scope,$http,$rootScope){

  function Phone(){
        this.mobile = '';
        this.landline = '';
        this.home = '';
        return this;
    }
    //define simple model object
    function User(){
        this.fName = '';
        this.lName = '';
        this.phone = '';
        return this;
    }
        var user = new User();
        var phone = new Phone();
        user.phone = phone;

        $scope.user = user;  // this is later used in the form controls for binding
        $scope.message = 'Yet to post data';
        $scope.listOfUsers = [];
        $scope.findUser = '';

        $scope.addToEvent = function(user){
          console.dir(user);
          $rootScope.$broadcast( 'SELECTED_PARTICIPANT', user);
        }

        $scope.findUserByFirstName = function(){
          var sUrl  = 'http://localhost:8080/users/' + $scope.findUser;
          var res = $http.get(sUrl);
          res.success(function(data,status,headers,config){
            $scope.listOfUsers = data;
          });
        res.error(function(data, status, headers, config) {
            $scope.message = JSON.stringify(data);
        }); 
        }
        //find all
        $scope.listAllUsers = function(){
        var res = $http.get('http://localhost:8080/users');
          res.success(function(data,status,headers,config){
            $scope.listOfUsers = data;
          });
        res.error(function(data, status, headers, config) {
            $scope.message = JSON.stringify(data);
        }); 
        }

        //add user
        $scope.addUser = function(){
          var data =   JSON.stringify(user);
          alert(data);
          var res = $http.post('http://localhost:8080/user',data);
          res.success(function(data,status,headers,config){
            $scope.message = JSON.stringify(data);
            
          });
        res.error(function(data, status, headers, config) {
            $scope.message = JSON.stringify(data);
        });      
        };
    }); 
