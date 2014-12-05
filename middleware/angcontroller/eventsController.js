 
  

    //define angular controller
    //Note :  $scope is injected into the page, which serves as an interface between view and model
   
 feedbackApp.controller('eventsController', function($scope,$http,$rootScope){
        

        $scope.feedbackEvent = CKaizen._classEvent();  
       

        $scope.$on('SELECTED_PARTICIPANT',function(event, user){
          console.dir(user);
          $scope.feedbackEvent.participants.push(user);
          
        });

        $scope.addEvent = function(){
          var data =   JSON.stringify($scope.feedbackEvent);
          //var data = $scope.feedbackEvent;
          alert(data);
          var res = $http.post('http://localhost:8080/event',data);
          res.success(function(data,status,headers,config){
            $scope.message = JSON.stringify(data);
            
          });
        res.error(function(data, status, headers, config) {
            $scope.message = JSON.stringify(data);
        });      
        };
        
    }); 
