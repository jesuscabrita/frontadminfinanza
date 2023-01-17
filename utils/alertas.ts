import Swal from "sweetalert2";

export const alertaSubmit = (submit)=>{ 
    const Toast = Swal.mixin ({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: { popup: 'colored-toast'},
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
        }) 
            if(submit){
                Toast.fire({
                icon: 'success',
                title: 'Nuevo Ingreso'
                })
            } else{
                Toast.fire({
                icon: 'error',
                title: 'Error'
                })
            }
    }