import { Grid, useMediaQuery } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { BiCommentDetail as Comen } from 'react-icons/bi';
import { EstrellaDisable } from "./Start";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { useAuth0 } from "@auth0/auth0-react";
import moment from 'moment';
import { MdOutlineDeleteOutline as Dele } from "react-icons/md";
import Swal from "sweetalert2";
import { delete_Calificacion } from "../../lib/calificacion";
moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })

export const Comentario =({calificacion})=>{
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { user, getAccessTokenSilently } = useAuth0();
    const administrador = user.sub === 'linkedin|hZJgKWBXCL';
    

    const alertaDelete =()=>{
        Swal.fire({
            title: 'Estas seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#256d85',
            cancelButtonColor: '#b74848',
            cancelButtonText:'Calcelar',
            confirmButtonText: '¡Sí, Eliminar!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'Su archivo ha sido eliminado.',
                    'success'
                    )
                    const token = await getAccessTokenSilently();
                    await delete_Calificacion(calificacion._id, token) 
            }
        })
    }

    return(
        <Grid sx={{
            minWidth: '300px',
            width: !mobile ? '600px': '380px',
            height: "100%", 
            borderRadius: "16px", 
            background: light ? "var(--ceroN)" : "var(--terciarioN)", 
            paddingBottom:'16px',
            }}>
            <Grid item sx={{
                display:'flex',
                flexDirection:!mobile ?'row' : 'row',
                background: "var(--segundario)", 
                borderRadius: "10px 10px 0px 0px", 
                padding: "10px", 
                color: "var(--cero)", 
                alignItems: "center", 
                gap: "16px",
                }}>
                {!mobile? <>
                <Grid container alignItems={'center'} gap={1} fontSize={'12px'}>
                    <Avatar alt={user?.name ?? ''} src={user?.picture ?? ''} sx={{ width: '30px', height: '30px' }} />
                    {'Anónimo'}
                    <Comen size={15} />
                </Grid>
                <EstrellaDisable valor={calificacion.valor} />
                <Grid container justifyContent={'end'}>
                {administrador ?  <Dele onClick={alertaDelete} size={20} style={{ cursor: 'pointer', color: "var(--ceroN)", }} /> : null }
                </Grid>
                    </>
                :
                <Grid  sx={{display:'flex' , alignItems:'center', justifyContent:'space-between', gap:'12px'}} >
                <Grid sx={{display: 'flex', alignItems:'center' , gap:'5px' , fontSize:'12px'}}>
                    <Avatar alt={user?.name ?? ''} src={user?.picture ?? ''} sx={{ width: '30px', height: '30px' }} />
                    {'Anónimo'}
                    <Comen size={15} />
                </Grid>
                <Grid sx={{display:'flex'}}>
                    <EstrellaDisable valor={calificacion.valor} />
                </Grid>
                {administrador ? <Grid sx={{display:'flex'}}>
                        <Dele onClick={alertaDelete} size={20} style={{ cursor: 'pointer', color: "var(--ceroN)", }} /> 
                    </Grid> : null} 
                </Grid>}
            </Grid>
            <Grid sx={{padding:'10px',color: light ? "var(--terciario)" : "var(--cero3)"}}>
            <Grid sx={{color: light ? "var(--cero2)" : "var(--cero3)", fontSize:'12px'}}>creado el {moment(calificacion.createdAt).format(`Do MMMM YYYY, h:mm:ss a`)}</Grid>
            {calificacion.comentario}
            </Grid>
        </Grid>
    )
}