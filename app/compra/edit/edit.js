var miControlador = miModulo.controller(
    "compraEditController",

    function ($scope, $http, $routeParams, promesasService, auth,level) {
        $scope.sessionLevel = level.data.message;
        if (auth.data.status != 200) {
            $location.path('/login');
        } else {
            $scope.authStatus = auth.data.status;
            $scope.authUsername = auth.data.message;
        }

        $scope.id = $routeParams.id;
        $scope.controller = "compraEditController";
        $scope.fallo = false;
        $scope.hecho = false;
        $scope.falloMensaje = "";
        $scope.fecha = new Date();


        promesasService.ajaxGet('compra', $routeParams.id)
            .then(function (response) {
                $scope.id = response.data.message.id;
                $scope.cantidad = response.data.message.cantidad;
                $scope.producto_obj = response.data.message.producto_obj.descripcion;
                $scope.factura_obj = response.data.message.factura_obj.id;
            }, function () {
                $scope.fallo = true;
            })

        $scope.modificar = function () {

            const datos = {
                id: $routeParams.id,
                cantidad: $scope.cantidad,
                producto_obj: $scope.producto_obj.descripcion,
                factura_obj: $scope.producto_obj.id,
            }
            var jsonToSend = {
                data: JSON.stringify(datos)
            };

            $http.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
            promesasService.ajaxUpdate('compra', { params: jsonToSend })
                .then(function (response) {
                    if (response.data.status != 200) {
                        $scope.fallo = true;
                        $scope.falloMensaje = response.data.message;
                    } else {
                        $scope.fallo = false;
                        $scope.hecho = true;
                    }
                }, function (error) {
                    $scope.hecho = true;
                    $scope.fallo = true;
                    $scope.falloMensaje = error.message + " " + error.stack;
                });
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.reset = function () {
            promesasService.ajaxGet('compra', $routeParams.id)
                .then(function (response) {
                    $scope.id = response.data.message.id;
                    $scope.cantidad = response.data.message.cantidad;
                    $scope.producto_obj = response.data.message.producto_obj.descripcion;
                    $scope.factura_obj = response.data.message.factura_obj.id;
                }, function (error) {
                    $scope.fallo = true;
                });
        }

        $scope.cerrar = function () {
            $location.path('/home/10/1');
        };

        $scope.reset();

    }

)