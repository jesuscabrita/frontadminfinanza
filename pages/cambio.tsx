import { Grid, useMediaQuery } from "@mui/material";
import { useContext } from "react";
import { CambioDivisa } from "../components/Shared/CambioDivisa";
import Context from "../context/contextPrincipal";
import { RiExchangeDollarLine as Circle } from "react-icons/ri";
import { useAdmin } from "../hooks/useAdmin";
import { SkeletonesCambio } from "../components/Shared/Skeleton";

const Cambio = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { data: adminis, mutate } = useAdmin();
    return (
    <>
    {!mobile ? 
        <Grid item sx={{height:'100vh', width:'100%'}}>
            <Grid container item sx={{
                fontSize:'25px',
                alignItems:'center',
                justifyContent:'center',
                color:light ? "var(--zero)" : "var(--ceroN)",
                gap:'10px',
                borderBottom:`1px solid ${light ? "var(--zero)" : "var(--ceroN)" } `,
                paddingBottom:'10px',
                width:'91%',
                marginLeft:'30px'
                }}>
                Cambio<Circle size={20} />
            </Grid>
            <Grid item sx={{
                    marginTop:'20px',
                    display:'flex', 
                    justifyContent:'center', 
                    gap:'30px',
                    }}>
                    {adminis ? <CambioDivisa venta value_sell /> : <SkeletonesCambio/>}
            </Grid>
        </Grid>
    :    
        <Grid container item sx={{
                height: '110vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px'
                }}>
            <Grid container item sx={{
                fontSize:'25px',
                alignItems:'center',
                justifyContent:'center',
                color:light ? "var(--zero)" : "var(--ceroN)",
                gap:'10px',
                borderBottom:`1px solid ${light ? "var(--zero)" : "var(--ceroN)" } `,
                paddingBottom:'10px',
                width:'91%',
                marginLeft:'30px'
                }}>
                Cambio<Circle size={20} />
            </Grid>
            <Grid item sx={{
                    marginTop:'20px',
                    display:'flex', 
                    justifyContent:'center', 
                    gap:'30px',
                    }}>
                    {adminis ? <CambioDivisa venta value_sell /> : <SkeletonesCambio/>}
            </Grid>
        </Grid>
        }
        </>
    );
};
export default Cambio;