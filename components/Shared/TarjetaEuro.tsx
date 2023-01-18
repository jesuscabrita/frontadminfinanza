import { Grid, useMediaQuery } from "@mui/material"
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { AiOutlineEuroCircle as Euro } from 'react-icons/ai';
import { useQuery } from "react-query";
import { useEuro } from "../../service/euro";
import CircularProgress from "@material-ui/core/CircularProgress";

export const TarjetaEuro = ({ compraOficial, ventaOficial, ventaBlue, compraBlue  }) => {
    const [light] = useContext(Context);
    const [euro, setEuro] = useState([]);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { isLoading } = useQuery(["/v2/latest"], useEuro, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEuro(data);
        },
    });

    return (
    <Grid sx={{
            minWidth: '300px',
            width:!mobile ? '400px': '380px',
            height: "100%", 
            borderRadius: "16px", 
            background: 'var(--activo)', 
            paddingBottom:'16px'
            }}>
            <Grid container item sx={{
                background: "var(--segundario)", 
                borderRadius: "10px 10px 0px 0px", 
                padding: "10px", 
                color: "var(--cero)", 
                alignItems: "center", 
                gap: "16px",
                }}>
                <Euro size={25} /> Euro
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'14px',
                    marginLeft:'15px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Euro Blue venta
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
                    : (ventaBlue)}
                </Grid>
            </Grid>

            <Grid item sx={{display:'flex', justifyContent:'space-around'}}>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Euro Blue Compra
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000",
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--hazard)",
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (compraBlue)}
                </Grid>
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Euro oficial venta
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000", 
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--hazard)",
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (ventaOficial)}
                    </Grid>
            </Grid>
            <Grid item>
                <Grid item sx={{
                    fontSize:'11px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    }}>
                Euro oficial compra
                </Grid>
                <Grid item sx={{
                    fontWeight: "1000", 
                    fontSize:'14px',
                    marginLeft:'10px',
                    color: light ? "var(--zero)" : "var(--hazard)", 
                    }}> 
                    {isLoading 
                    ? (<CircularProgress 
                        size={25} 
                        style={{ color: light ? "var(--zero)" : "var(--ceroN)",marginLeft:'35px' }}/>) 
                    : (compraOficial)}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}