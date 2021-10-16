angular.module('Demo', ['dropDownList'])
    .controller('DemoController', function ($scope, $http, $timeout, $q) {

        function calculateAge(dateString){
            var today = new Date();
            var birthdate = new Date(dateString);
            var age = today.getFullYear() - birthdate.getFullYear();
            var m = today.getMonth() - birthdate.getMonth();

            if (m<0 || (m===0 && today.getDate()< birthdate.getDate())){
                age--;

            }
            var age = age*365 + (today.getDay() - birthdate.getDay());

            return age;
        }


        $http.get('http://localhost:3000/getAllTitles').
        then(function(response) {
            var range = [];
            for(var i=1; i<=response.data.length; i++)
            {
                range.push({ id: response.data[i-1], name: response.data[i-1] });
            }
            $scope.states = range;
        });

        $scope.radioChange = function (s) {
            var oapiedata = [];
            var oabardata = [];
            if(s == 'overAll'){
                $scope.overAllSelected = true;
                $scope.singleArticleSelected = false;
                $http.get('http://localhost:3000/getArticleWithMostRevisions/').
                then(function(response) {
                    $scope.mostarticle = response.data[0];
                    $scope.mostarticletwo = response.data[1];
                })
                $http.get('http://localhost:3000/getArticleWithLeastRevisions/').
                then(function(response) {
                        $scope.leastarticle = response.data[0];
                        $scope.leastarticletwo = response.data[2];
                    }
                )
                $http.get('http://localhost:3000/getArticleWithHighestHistory/').
                then(function(response) {
                        $scope.highhistory = response.data[0];
                        $scope.highhistorytwo = response.data[1];



                        $scope.highage = calculateAge(response.data[0].time1);
                        $scope.highagetwo = calculateAge(response.data[1].time1);
                    }
                )
                $http.get('http://localhost:3000/getArticleWithLowestHistory/').
                then(function(response) {
                        $scope.leasthistory = response.data[0];
                        $scope.leasthistorytwo = response.data[1];


                        $scope.leastage = calculateAge(response.data[0].time2);
                        $scope.leastagetwo = calculateAge(response.data[1].time2);
                    }
                )

                $http.get('http://localhost:3000/getArticleWithSmallestgroupReguser/').
                then(function(response) {
                        $scope.smallestgroup = response.data[0];
                    }
                )

                $http.get('http://localhost:3000/getArticleWithLargestgroupReguser/').
                then(function(response) {
                        $scope.largestgroup = response.data[0];
                    }
                )


                $http.get('http://localhost:3000/getRevCountForAnon/').
                then(function(response) {

                    for(var i=0; i<response.data.length; i++){
                        oapiedata.push(response.data[i].countPA);
                    }
                    new Chart(document.getElementById("oapiechart"), {
                        type: 'pie',
                        data: {
                            labels: ["Anon User", "Reg User",],
                            datasets: [
                                {
                                    label: "Revision number distribution by user type",
                                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                                    data: oapiedata
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Revision number distribution by user type',
                                responsive: false,
                                maintainAspectRatio: false
                            }
                        }
                    });
                });

                $http.get('http://localhost:3000/getRevCountForAnonBar/').
                then(function(response) {

                    for(var i=0; i<response.data.length; i++){
                        oabardata.push(response.data[i].countBC);
                    }
                    new Chart(document.getElementById("oabarchart"), {
                        type: 'bar',
                        data: {
                            labels: ["Anon User", "Reg User"],
                            datasets: [
                                {
                                    label: "Revision number distribution by user type",
                                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                                    data: oabardata
                                }
                            ]
                        },
                        options: {
                            title: {
                                display: true,
                                text: 'Revision number distribution by user type',
                                responsive: false,
                                maintainAspectRatio: false
                            }
                        }
                    });
                });

            }

            if(s == 'singleArticle') {
                $scope.overAllSelected = false;
                $scope.singleArticleSelected = true;
            }
        };

        var userList = [];
        var titleAndUsers = '';

        $scope.change = function(s) {
            //titleAndUsers = s.state+'~';
            $http.get('http://localhost:3000/getTop5EditorsForArticles/'+s.state).
            then(function(res) {
                $scope.users = res.data;
                userList = res.data;
                //	for (var i=0; userList.length; i++){
                //		titleAndUsers = titleAndUsers + '~' + userList[i];
                //	}
            });

            $http.get('http://localhost:3000/getArticleDetails/'+s.state).
            then(function(response) {
                $scope.articleSelected = 'truthy';
                $scope.revisionCount = response.data;
            });

            $http.get('http://localhost:3000/getRevisionsByYear/'+s.titleAndUsers).
            then(function(response) {
                $scope.articleSelected = 'truthy';
                $scope.revisionCount = response.data;
            });


        };
    });

