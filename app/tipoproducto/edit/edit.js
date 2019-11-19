'use strict';
var miControlador = miModulo.controller('tipousuarioUpdateController',
    function ($scope, $http, $routeParams, $anchorScroll) {
        $anchorScroll();
        
        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.desc = response.data.message.desc;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.editar = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                if ($scope.status === 200) {
                    $scope.formulario = false;
                    $scope.botones = false;
                    $scope.correcto = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };
    }
);