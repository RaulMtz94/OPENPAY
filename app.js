//Requires importacion de librerias
var express = require('express');
var mongoose = require('mongoose');
var Openpay = require('openpay');
//---------------------------------


//inicializar variables
var app = express();
var openpay = new Openpay('msqeybbovhfpnnmlwmsw' , 'sk_28490bdf2d2c4fc3a6ca7f7ef0f95bf8' , false); 


//Dar de alta nuevo cliente relacionado con la SK


var newCustomer = {
    "name":"John",
    "email":"johndoe@example.com",
    "last_name":"Doe",
    "address":{
      "city":"Queretaro",
      "state":"Queretaro",
      "line1":"Calle Morelos no 10",
      "line2":"col. san pablo",
      "postal_code":"76000",
      "country_code":"MX"
    },
    "phone_number":"44209087654"
  };
  
//Generar el usuario   
  openpay.customers.create(newCustomer, function(error, body) {
      error;    // null if no error occurred (status code != 200||201||204)
      body;     // contains the object returned if no error occurred (status code == 200||201||204)
    });

  //CONSULTAR UN USUARIO
function searchUser(){
    openpay.customers.get('angu3zgcs9c2ltcyuuww', function(error, customer) {
        // console.log(customer);
      });
}
searchUser();
//-----------------------------------
//LISTAR USUARIOS DE OPENPAY
function listUsers(searchParams){
    openpay.customers.list(searchParams, function(error, list) {
      //  console.log(list);
      });
}
listUsers();
//-----------------------------------
//CREAR UNA NUEVA TARJETA A CLIENTE
//recibe como parametro el ID del cliente al que se asigna la tarjeta 
var cardRequest = {
    'card_number':'4111111111111111',
    'holder_name':'Juan Perez Ramirez',
    'expiration_year':'20',
    'expiration_month':'12',
    'cvv2':'110',
    'device_session_id':'kR1MiQhz2otdIuUlQkbEyitIqVMiI16f'
 };
 
 openpay.customers.cards.create('a9pvykxz4g5rg0fplze0', cardRequest, function(error, card)  {
    // console.log(card);  
 });
//-------------------------------------
//----REALIZAR PAGO A CLIENTE DADO DE ALTA ----

function payoutbyID(idUser){
    var payoutRequest = {
        'method': 'bank_account',
        'destination_id': 'b3d54sd3mdjf75udjfvoc',
        'amount': 10.50,
        'description': 'Retiro de saldo semanal',
        'order_id': 'oid-00021'
    };
    
    openpay.customers.payouts.create(idUser, payoutRequest, function(error, payout) {
     // console.log(payout);
    });
}
//-------------------------------------
//------REALIZAR PAGO A CUENTA BANCARIA

 function payoutbyCB(idUser){
    var payoutRequest = {
        'method':'bank_account',
        'bank_account':{
           'clabe':'012298026516924616',
           'holder_name':'Mi empresa'
        },
        'amount':10.50,
        'description':'Retiro de saldo semanal',
        'order_id':'oid-1110011'
     };
     
     openpay.customers.payouts.create(idUser, payoutRequest, function(error, payout) {
       console.log(payout);
     });
 }
//-------------------------------------
//CONEXION A LA BASE DE DATOS
mongoose.connection.openUri('mongodb://raul:raulmtz1@ds111993.mlab.com:11993/evotecbd' , (err , res)=>{
    //if(err) throw err;
  if(err){
console.log("Error de conexion a la base de datos");
  };
    console.log('Base de datos MongoDB : \x1b[32m%s\x1b[0m' , 'Online');
});




//Rutas
app.get('/', (req , res , next) =>{
    res.status(200).json({
        ok : true ,
        mensaje : 'Peticion Realizada Correctamente'
    });
});



//Escuchar peticiones
app.listen(3000 , () => {
    console.log('Express server puerto 3000 : \x1b[32m%s\x1b[0m' , 'Online');
});