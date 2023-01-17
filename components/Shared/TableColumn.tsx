import { Grid, useMediaQuery } from "@mui/material";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { adminis } from "../../hooks/useAdmin";
import { MdOutlineDeleteOutline as Dele } from "react-icons/md";
import { AiTwotoneEdit as Editar } from 'react-icons/ai';
import { delete_Admin, edit_Admin } from "../../lib/admin";
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { filterTipo, formatoPorcentaje, moneda } from '../../utils/utils';
import { GiWallet as Wallet } from 'react-icons/gi';
import Swal from "sweetalert2";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { RiSubtractFill as Subs } from "react-icons/ri";
import { IoIosAddCircleOutline as Plus } from "react-icons/io";
import { FiAlertCircle as Pendiente } from 'react-icons/fi';
import { FiAlertTriangle as NO } from 'react-icons/fi';
import { MdAddTask as Pago } from "react-icons/md";
import { ModalEdit } from "./ModalEdit";
interface AdminProps {
    admin: adminis;
    opera;
}
export const TableColum: React.FC<AdminProps> =({admin,opera})=>{
    const { getAccessTokenSilently } = useAuth0();
    const [light] = useContext(Context);
    const [open, setOpen] = useState(false);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

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
                    await delete_Admin(admin._id, token) 
            }
        })
    }

    const alertaEstadoCobro =()=>{
        Swal.fire({
            title: '¿Ya cobraste este Ingreso?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
            }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Ingreso Cobrado!', '', 'success')
                const token = await getAccessTokenSilently();
                await edit_Admin({
                detalleARS: admin.detalleARS,
                monto: admin.monto,
                pago:'no',
                tipo: admin.tipo,
                }, token)
            } else if (result.isDenied) {
                Swal.fire('Los cambios no se guardaron', '', 'info')
            }
            })
    }

    const alertaEstadoPago =()=>{
        Swal.fire({
            title: '¿Ya pagaste?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            }
            }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Pagado!', '', 'success')
                const token = await getAccessTokenSilently();
                await edit_Admin({
                detalleARS: admin.detalleARS,
                monto: admin.monto,
                pago:'no',
                tipo: admin.tipo,
                }, token)
            } else if (result.isDenied) {
                Swal.fire('Los cambios no se guardaron', '', 'info')
            }
            })
    }

    let egreso = filterTipo(opera, '-').reduce((acumulador, actual) => acumulador + actual.monto, 0)

    return(
    <TableRow role="checkbox" 
        tabIndex={-1} 
        key={admin._id} 
        sx={{
            background: light ? 'var()': 'var(--dark)',
            }}>
        <TableCell>
            <Grid sx={{
                display:'flex',gap:'10px',
                color:light ? "var(--zero)" : "var(--ceroN)",
                }}>
                {admin.tipo === "+" 
                    ? <Plus size={23} style={{ color: "var(--activo)" }} />
                    : <Subs size={23} style={{ color: "var(--danger)" }} />} 
                {admin.detalleARS}</Grid></TableCell>
            <TableCell>
                <Grid sx={{
                    display:'flex', 
                    alignItems:'center', 
                    gap:'10px',
                    color: admin.tipo === '+' ? "var(--activo)" : "var(--danger)",
                    fontWeight: "700"
                    }}>
                    {moneda(admin.monto)} 
                    {admin.tipo === '-' 
                    ?   <Grid item 
                            sx={{ 
                            marginLeft: "2px", 
                            color: "var(--porcent)", 
                            fontWeight: "500", 
                            fontSize: "12px",
                            }}>
                            {formatoPorcentaje(admin.monto/egreso)}
                        </Grid> 
                    : null}
                </Grid>
            </TableCell>
            <TableCell align="right" sx={{color:light ? "var(--zero)" : "var(--ceroN)",}}>ARS</TableCell>
            <TableCell align="left">
                {admin.tipo === '+' && admin.pago === 'si' ? 
                <Grid container
                    sx={{
                    background:'var(--activo)', 
                    justifyContent:'center',
                    alignItems:'center' ,
                    height:'100%',
                    width:'50%', 
                    marginLeft:!mobile ? '150px': '50px',
                    borderRadius:'10px',
                    padding:'5px',
                    gap:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                        Cobrado<Wallet size={20}/>
                </Grid> : null}
                {admin.tipo === '+' && admin.pago === 'no' ? 
                <Grid container onClick={alertaEstadoCobro}
                    sx={{
                    background:'var(--hazard)', 
                    justifyContent:'center',
                    alignItems:'center' ,
                    height:'100%',
                    width:'50%', 
                    marginLeft:!mobile ? '150px': '50px',
                    borderRadius:'10px',
                    padding:'5px',
                    gap:'10px',
                    cursor:'pointer',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                        Pendiente<Pendiente size={20}/>
                </Grid> : null}
                {admin.tipo === '-' && admin.pago === 'no' ? 
                <Grid container onClick={alertaEstadoPago}
                    sx={{
                    background:'var(--danger)', 
                    justifyContent:'center',
                    alignItems:'center' ,
                    height:'100%',
                    width:'50%', 
                    marginLeft:!mobile ? '150px': '50px',
                    borderRadius:'10px',
                    padding:'5px',
                    gap:'10px',
                    cursor:'pointer',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                        NO pago<NO size={20}/>
                </Grid> : null}
                {admin.tipo === '-' && admin.pago === 'si' ? 
                <Grid container 
                    sx={{
                    background:'var(--primario)', 
                    justifyContent:'center',
                    alignItems:'center' ,
                    height:'100%',
                    width:'50%', 
                    marginLeft:!mobile ? '150px': '50px',
                    borderRadius:'10px',
                    padding:'5px',
                    gap:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                        Pagado<Pago size={20}/>
                </Grid> : null}
            </TableCell>
            <TableCell align="right">
                <Grid 
                    sx={{
                        display:'flex',
                        alignItems:'center' , 
                        gap:'10px',
                        justifyContent:'end' 
                        }}>
                        <Editar 
                            size={20}
                            onClick={() => setOpen(true)} 
                            style={{
                                cursor:'pointer',
                                color:light ? "var(--zero)" : "var(--ceroN)",
                                }}/>
                        <Dele 
                            size={20} 
                            onClick={alertaDelete} 
                            style={{
                                cursor:'pointer',
                                color:light ? "var(--zero)" : "var(--ceroN)",
                                }}/>
                </Grid>
            </TableCell>
            {open && 
                <ModalEdit 
                    open={open} 
                    setOpen={setOpen}
                    admin={admin}
                    />}
    </TableRow>
        
    )
}