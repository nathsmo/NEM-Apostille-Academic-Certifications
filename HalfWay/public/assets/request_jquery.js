$(document).ready(function(){

  $('form').submit(function(){
      console.log('inside submit');
    
      var nombre = $('form').find('input[name="nombre"]');
      var apellido = $('form').find('input[name="apellido"]');
 

list = {nombre: nombre.val(), apellido: apellido.val(),myFile: myFile}

      $.ajax({
        type: 'POST',
        url: '/request',
        data: list,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

});