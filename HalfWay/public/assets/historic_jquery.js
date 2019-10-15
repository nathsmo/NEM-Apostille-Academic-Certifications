$(document).ready(function(){

    $('form').on('submit', function(){
  
      
        var _id= $('form').find('input[name="_id"]');
        var list = {_id: _id.val()}
  
        $.ajax({
          type: 'POST',
          url: '/sign',
          data: list,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });

  });