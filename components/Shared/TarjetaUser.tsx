import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { HiOutlineUser as User } from "react-icons/hi";
import {ImSad2 as Sad} from 'react-icons/im';
import { FaSadCry as Triste} from 'react-icons/fa';
import { BiHappyAlt as Feliz} from 'react-icons/bi';
import { filterDuo, formatoPorcentaje, moneda } from "../../utils/utils";

export const TarjetaUser = ({admin}) => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    let ingreso = filterDuo(admin, 'si','+').reduce((acumulador, actual) => acumulador + actual.monto, 0)
    let egreso = filterDuo(admin, 'si','-').reduce((acumulador, actual) => acumulador + actual.monto, 0)
    let numero = formatoPorcentaje(egreso / ingreso);
    let ahorro = ingreso - egreso;
    
    return (
    <Grid item sx={{ 
        width: !mobile ? "420px" : '330px', 
        height: "100%", 
        borderRadius: "16px", 
        background: light ? "var(--ceroN)" : "var(--terciarioN)", 
        paddingBottom: "16px",
        }}>
        <Grid 
            container 
            item 
            sx={{ 
                background: "var(--segundario)", 
                borderRadius: "10px 10px 0px 0px", 
                padding: "10px", color: "var(--cero)", 
                alignItems: "center", 
                gap: "16px",
                }}>
                    <User size={25} /> Informacion de Ingresos
        </Grid>
            <Grid item sx={{ padding: "18px" }}>
                <Grid item container sx={{ justifyContent: "space-between" }}>
                    <Grid item sx={{ 
                        color: light ? "var(--terciario)" : "var(--cero3)", 
                        fontSize: "14.5px",
                        }}>
                            Ingreso: 
                            <Grid item sx={{
                                color: 'var(--activo)', 
                                fontWeight: "900", 
                                fontSize: "30px",
                                }}>
                                {moneda(ingreso)}
                            </Grid>
                    </Grid>
                        <Grid item sx={{ 
                            color: light ? "var(--terciario)" : "var(--cero3)", 
                            fontSize: "14.5px",
                            }}>
                            Egreso:
                            <Grid item sx={{ 
                                color: 'var(--danger)', fontWeight: "900", 
                                fontSize: "30px",
                                }}>
                                {moneda(egreso)} 
                                <Grid item 
                                    sx={{ 
                                        display:'flex',
                                        justifyContent:'end',
                                        color: 'var(--porcent)', 
                                        fontWeight: "500", 
                                        fontSize: "12px",
                                        }}>
                                        {numero}
                                </Grid>
                            </Grid>
                        </Grid>
                </Grid>
                    <Grid item sx={{ 
                        color: light ? "var(--terciario)" : "var(--cero3)", 
                        fontSize: "14.5px",
                        }}>
                        Ahorro
                    </Grid>
                    <Grid 
                        item  
                        container 
                        alignItems={'center'} 
                        gap={1} 
                        sx={{ 
                            color: ahorro <= 10000 
                            ? ahorro < 5000 
                            ? 'var(--danger)' 
                            : "var(--hazard)" 
                            : 'var(--activo)', 
                            fontSize: "16px", 
                            fontWeight: "900"
                            }}>
                        {moneda(ahorro)}
                        {ahorro  <= 10000 
                        ? ahorro < 5000 
                        ? <Triste size={20}/> 
                        : <Sad size={20}/> 
                        : <Feliz size={20}/>
                        }
                    </Grid>
            </Grid>
    </Grid>
    );
};
