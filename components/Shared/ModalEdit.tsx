import { Grid } from "@mui/material";
import Context from "../../context/contextPrincipal";
import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from "@mui/material/TextField";
import { MdPostAdd as Idd } from "react-icons/md";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    };

export const ModalEdit =({
    open, 
    setOpen,
    admin, 
    })=>{
    const [light] = useContext(Context);
    const handleClose = () => setOpen(false);
    const [form , setForm] = useState({detalleARS: admin.detalleARS, monto: admin.monto, tipo: admin.tipo});

    const changeForm = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'Monto' ? parseInt(e.target.value) : e.target.value
        })
    }
    
    return(
        <Grid 
            item 
            container 
            justifyContent={"space-between"} 
            sx={{
                color: light ? "var(--terciario)" : "var(--cero3)", 
                fontSize: "14.5px",
                }}>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                <Grid>Proximamente podras editar</Grid>
                    <FormControl variant="filled" sx={{ m: 0, minWidth: 155, height:'50px', marginBottom:'10px'}}>
                <InputLabel style={{ color: light ? "var(--terciario)" : "var(--cero3)" }}>
                        Ingreso
                </InputLabel>
                    <Select value={form.tipo} onChange={changeForm}>
                        <MenuItem style={{ display: "flex" }} value={'+'}>+</MenuItem>
                        <MenuItem style={{ display: "flex" }} value={'-'}>-</MenuItem>
                    </Select>
                </FormControl>
                    <TextField 
                    label="Detalle" 
                    value={form.detalleARS} 
                    variant="filled" 
                    autoComplete="false"
                    onChange={changeForm}
                    helperText="Es requerido el detalle"
                    sx={{
                        width:'100%',
                        "& .MuiFormLabel-root": {color: light ? "var(--terciario)" : "var(--cero3)",},
                        "& .MuiInputBase-root": {color: light ? "var(--terciario)" : "var(--cero3)",},
                        "& .MuiFormHelperText-root": {color: light ? "var(--terciario)" : "var(--cero3)",},
                        }}
                />
                <TextField 
                    label="Monto" 
                    value={Number(form.monto)} 
                    type="number" 
                    variant="filled"
                    onChange={changeForm}
                    InputLabelProps={{shrink: true,}}
                    autoComplete='false'
                    sx={{
                        "& .MuiFormLabel-root": {color: light ? "var(--terciario)" : "var(--cero3)",},
                        "& .MuiInputBase-root": {color: light ? "var(--terciario)" : "var(--cero3)",},
                        }} 
                />
                <Grid 
                    item 
                    container 
                    mt={2}
                    sx={{ 
                        background: "var(--primario)", 
                        width: "70px", 
                        height: "30px", 
                        borderRadius: "8px", 
                        cursor: "pointer", 
                        marginLeft: "10px",
                        }}>
                    <Idd style={{ 
                        cursor: "pointer", 
                        padding: "2px", 
                        marginLeft: "18px", 
                        color: "white",
                        }} size={30}/>
                </Grid>
                    </Box>
                </Modal>
        </Grid>
    )
}