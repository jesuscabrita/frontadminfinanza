import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MdPostAdd as Idd } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { create_Admin } from "../../lib/admin";
import { alertaSubmit } from "../../utils/alertas";

export const Form = () => {
    const [light] = useContext(Context);
    const [tipo, setTipo] = useState("");
    const [detalleARS, setDetalle] =useState('');
    const [monto, setMonto] =useState(0);
    const { getAccessTokenSilently } = useAuth0();
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });

    const handleChange = (event: SelectChangeEvent) => {
        setTipo(event.target.value);
    };

    const submit = async (e)=>{
        e.preventDefault();
        const token = await getAccessTokenSilently();
        await create_Admin({
            detalleARS,
            monto,
            tipo,
            pago: "no"
        }, token)
        alertaSubmit(create_Admin)
        setDetalle('')
        setTipo('')
        setMonto(0)
    }

    return (
        <Grid sx={{
            width: !mobile ? '600px' : '380px',
            height: "100%", 
            borderRadius: "16px",  
            paddingBottom:'16px',
            display:'flex',
            flexDirection:'column',
            gap:'10px'
            }}>
                <Grid>
            <FormControl variant="filled" sx={{ m: 0, minWidth: 155, height:'50px'}}>
                <InputLabel style={{ color: light ? "var(--terciario)" : "var(--cero3)" }}>
                        Ingreso
                </InputLabel>
                    <Select value={tipo} onChange={handleChange}>
                        <MenuItem style={{ display: "flex" }} value={'+'}>+</MenuItem>
                        <MenuItem style={{ display: "flex" }} value={'-'}>-</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <TextField 
                    label="Detalle" 
                    value={detalleARS} 
                    variant="filled" 
                    autoComplete="false"
                    onChange={(e)=>setDetalle(e.target.value)}
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
                    value={Number(monto)} 
                    type="number" 
                    variant="filled"
                    onChange={(e)=>setMonto(parseInt(e.target.value))}
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
                    onClick={submit} 
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
            </Grid>
    );
};
