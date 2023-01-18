import { Grid, useMediaQuery } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { useQuery } from "react-query";
import { useDolar } from "../../service/dolar";
import { AiOutlineDollarCircle as Dolar } from "react-icons/ai";

export const Tarjeta = ({ compra, venta, ofiCompra, ofiVenta }) => {
    const [light] = useContext(Context);
    const [money, setMoney] = useState([]);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { isLoading } = useQuery(["/v2/latest"], useDolar, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setMoney(data);
        },
    });

    return (
    <Grid sx={{
            minWidth: '300px',
            width: !mobile ? '400px': '380px',
            height: "100%", 
            borderRadius: "16px", 
            background: 'var(--hazard)', 
            paddingBottom:'16px',
            }}>
            <Grid container item sx={{
                background: "var(--segundario)", 
                borderRadius: "10px 10px 0px 0px", 
                padding: "10px", 
                color: "var(--cero)", 
                alignItems: "center", 
                gap: "16px",
                }}>
                <Dolar size={25} /> Dolar
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'14px',
                    marginLeft:'15px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Dolar Blue Venta
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000",
                    fontSize:'50px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={38} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)", marginLeft:'35px' }}/>) 
                    : (venta)}
                </Grid>
            </Grid>

        <Grid item sx={{display:'flex', justifyContent:'space-around'}}>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Dolar Blue Compra
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000",
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--activo)",
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (compra)}
                </Grid>
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Dolar oficial venta
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000", 
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--activo)",
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (ofiVenta)}
                    </Grid>
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Dolar oficial compra
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000", 
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--activo)", 
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (ofiCompra)}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    );
};
