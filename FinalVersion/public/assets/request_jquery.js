$(document).ready(function(){

  $('form').on('submit', function(){
    
      swal({
        title: "File Uploaded",
        text: "The file has been uploaded!",
        type: "success",
        confirmButtonText: 'Great!'
      });

      return false;

  });

});