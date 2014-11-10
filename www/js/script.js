
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

