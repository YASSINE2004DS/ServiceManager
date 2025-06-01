import swal          from 'sweetalert2'


   export const ConfirmeOperation = (
                                       titleMessage           , 
                                       titleReponse           , 
                                       handler        = ()=>{}, 
                                       idIntervention =null   ,
                                       timer = 2000           ,
                                       width = 600 
     ) => {

      swal.fire({
        title: `${titleMessage}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'darkred',
        cancelButtonColor: 'darkblue',
        confirmButtonText: 'Oui',
        width: width + 'px'

      }).then((result) => {
        if (result.isConfirmed) {
          
          {handler(idIntervention)}

          if(String(titleReponse).trim() != '')
          {
          swal.fire({
            title: titleReponse,
            icon: "success",
            showConfirmButton:false,
            width:  width + 'px' ,
            timer:timer
          });
        }
        }
      });
    }
   