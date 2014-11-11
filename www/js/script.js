
var AFV = {};

AFV.token = '';
AFV.user = '';
AFV.email = '';
AFV.server = 'https://afv-close-beta.herokuapp.com/';
AFV.srrs = AFV.server + 'sharedService/ssrs';
AFV.afvrs = AFV.server + 'afvServices/afvrs';


AFV.init = (function() {
    //In case something needed! 
});

AFV.deleteGasto = (function(prespuestoId, categoriaId, gastoId) {
    var data = {};
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + prespuestoId + '/categorias/' + categoriaId + '/gastos/delete/' + gastoId;
    var response = AFV.sendDataSync(url, data, 'POST');
    console.log('deleteGasto ', response);
    if (response) {
        return true;
    } else {
        return false;
    }

});

AFV.createGasto = (function(data, prespuestoId, categoriaId) {
    if (data) {
        var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + prespuestoId + '/categorias/' + categoriaId + '/gastos/add';
        var response = AFV.sendDataSync(url, data, 'POST');
        console.log('createGasto ', response);
        if (response) {
            return true;
        } else {
            return false;
        }
    }
});

AFV.deleteCategoria = (function(prespuestoId, categoriaId) {
    var data = {};
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + prespuestoId + '/categorias/delete/' + categoriaId;
    var response = AFV.sendDataSync(url, data, 'POST');
    console.log('deleteCategoria ', response);
    if (response) {
        return true;
    } else {
        return false;
    }

});

AFV.createCategoria = (function(data, prespuestoId) {
    if (data) {
        var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + prespuestoId + '/categorias/add';
        var response = AFV.sendDataSync(url, data, 'POST');
        console.log('createCategoria ', response);
        if (response) {
            return true;
        } else {
            return false;
        }
    }
});

AFV.deletePresupuesto = (function(prespuestoId) {
    var data = {};
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/delete/' + prespuestoId;
    var response = AFV.sendDataSync(url, data, 'POST');
    console.log('deletePresupuesto', response);
    if (response) {
        return true;
    } else {
        return false;
    }

});

AFV.createPresupuesto = (function(data) {
    if (data) {
        var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/add';
        var response = AFV.sendDataSync(url, data, 'POST');
        console.log('createPresupuesto ', response);
        if (response) {
            return true;
        } else {
            return false;
        }
    }
});


AFV.createAccount = (function(data) {
    if (data.password === data.passwordConfirm) {
        var url = AFV.srrs + '/create_account';
        var response = AFV.sendDataSync(url, data, 'POST');
        console.log('createAccount ', response);
        if (response) {
            return {"email": response.user.correo, "password": data.password};
        } else {
            return false;
        }
    }
});

AFV.login = (function(data) {
    var url = AFV.srrs + '/login';
    var response = AFV.sendDataSync(url, data, 'POST');
    console.log('login ', response);
    if (response) {

        AFV.email = response.email;
        AFV.token = response.token;
        AFV.user = response.user;
        return true;
    } else {
        return false;
    }
});

AFV.checkSession = (function($state) {
    if (!AFV.email || !AFV.token || !AFV.user) {
        $state.go("app.login");
    }
});

AFV.getUser = (function() {
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token;
    return AFV.getData(url);
});

AFV.getPresupuestos = (function() {
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos';
    return AFV.getData(url).presupuestos;
});

AFV.getPresupuesto = (function(presupuestoId) {
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + presupuestoId;
    return AFV.getData(url).presupuesto;
});

AFV.getCategoria = (function(presupuestoId, categoriaId) {
    var url = AFV.afvrs + '/' + AFV.user + '/' + AFV.token + '/presupuestos/' + presupuestoId + '/categorias/' + categoriaId;
    return AFV.getData(url).categoria;
});

AFV.sendData = (function(url, data) {
    var response;
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        crossDomain: true,
        dataType: "json",
        success: function(data, status, jqXHR) {
            response = data.responseObjects;
        },
        error: function(jqXHR, status) {
            console.log('faild', status.code);
            console.log(jqXHR);
        }
    });

    return response;
});

AFV.sendDataSync = (function(url, data, type) {
    var response;
    $.ajax({
        type: type,
        url: url,
        data: data,
        crossDomain: true,
        dataType: "json",
        async: false,
        success: function(data, status, jqXHR) {
            if (data.codeResponse === '000') {
                response = data.responseObjects;
            }
        },
        error: function(jqXHR, status) {
            console.log('faild', status.code);
            console.log(jqXHR);
        }
    });

    return response;
});

AFV.getData = (function(url) {
    var response;
    $.ajax({
        type: 'GET',
        url: url,
        crossDomain: true,
        dataType: "json",
        async: false,
        success: function(data, status, jqXHR) {
            if (data.codeResponse === '000') {
                response = data.responseObjects;
            }
        },
        error: function(jqXHR, status) {
            console.log('faild', status.code);
            console.log(jqXHR);
        }
    });

    return response;
});

