var miControlador = miModulo.controller(
    "carritoRemoveController",

    function ($scope, $routeParams, $location, promesasService,auth) {
        
          
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }


        $scope.id = $routeParams.id;
        $scope.controller = "carritoRemoveController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";

       

          promesasService.ajaxGet('post', $routeParams.id)
          .then(function (response) {
              $scope.id = response.data.message.id;
              $scope.titulo = response.data.message.titulo;
              $scope.cuerpo = response.data.message.cuerpo;
              $scope.etiquetas = response.data.message.etiquetas;
          }, function () {
              $scope.fallo = true;
          })

        $scope.remove = function () {

            promesasService.ajaxRemove('post', $routeParams.id)
            .then(function (response) {
                if (response.data.status != 200) {
                    $scope.fallo = true;
                    $scope.falloMensaje = response.data.message;
                } else {
                    $scope.fallo = false;
                    $scope.hecho=true;
                }
            }, function (error) {
                $scope.hecho = true;
                $scope.fallo = true;
                $scope.falloMensaje = error.message + " " + error.stack;
            });
        }
        $scope.volver = function () {
            window.history.back();
        };

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };
    }
)
