import { useAuth0 } from "@auth0/auth0-react";
import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Tarjeta } from "../components/Shared/Tarjeta";
import { TarjetaEuro } from "../components/Shared/TarjetaEuro";
import { useDolar } from "../service/dolar";
import { useEuro } from "../service/euro";
import { useNoticias } from "../service/noticias";
import { moneda } from "../utils/utils";
import { MdWavingHand as Saludo } from 'react-icons/md';
import Context from "../context/contextPrincipal";
import moment from 'moment';
import {BsClipboardData as Datas } from 'react-icons/bs'
import { Resumen } from "../components/Shared/Resumen";
import { useAdmin } from "../hooks/useAdmin";
import { AiOutlineFileSearch as Buscar } from 'react-icons/ai';
moment.defineLocale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
    })

const Index = ({ last_update , value_buy, value_sell,}) => {
    const [money, setMoney] = useState({last_update, value_sell, value_buy });
    const [fecha, setFecha] = useState({last_update });
    const [oficial, setOficial] = useState({ value_sell, value_buy });
    const [euroOficial, setEuroOficial] = useState({ value_sell, value_buy });
    const [euroBlue, setEuroBlue] = useState({ value_sell, value_buy });
    const [noticia, setNoticia] = useState([]);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { user } = useAuth0();
    const [light] = useContext(Context);
    const { data: adminis, mutate} = useAdmin();

    useQuery(["/v2/latest"], useDolar, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setMoney(data.blue);
            setOficial(data.oficial);
            setFecha(data);
        },
    });

    useQuery(["/v2/latest"], useEuro, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEuroOficial(data.oficial_euro);
            setEuroBlue(data.blue_euro);
        },
    });
    
    useQuery([""], useNoticias, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setNoticia(data.articles);
        },
    });
    
    return (
    <>
        {!mobile
        ?   <Grid item sx={{height:'100vh', width:'100%'}}>
                {user ? 
                <Grid container sx={{
                    fontSize:'25px',
                    alignItems:'center',
                    justifyContent:'center',
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    marginTop:'10px'
                    }}>
                    Hola Bienvenido {user?.name}!<Saludo/>
                </Grid> 
                : null } 
                <Grid item sx={{
                    display:'flex',
                    flexDirection:'column', 
                    alignItems:'center',
                    justifyContent:'center', 
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    fontSize:'17px',
                    }}>
                    <Grid item>Fecha del Mercado Argentino.</Grid>
                    <Grid item>{moment(fecha.last_update).format('MMMM Do YYYY, h:mm:ss a')}</Grid>
                </Grid>
                <Grid sx={{
                    display:'flex', 
                    flexDirection:'row',
                    justifyContent:'center', 
                    gap:'30px',
                    marginTop:'18px'
                    }}>
                    <Tarjeta
                    compra={moneda(money.value_buy)}
                    venta={moneda(money.value_sell)}
                    ofiCompra={moneda(oficial.value_buy)}
                    ofiVenta={moneda(oficial.value_sell)}
                    />
                    <TarjetaEuro
                    compraBlue={moneda(euroBlue.value_buy)}
                    ventaBlue={moneda(euroBlue.value_sell)}
                    compraOficial={moneda(euroOficial.value_buy)}
                    ventaOficial={moneda(euroOficial.value_sell)}
                    />
                </Grid>
                <Grid item sx={{
                    display:'flex',
                    flexDirection:'row', 
                    alignItems:'center',
                    justifyContent:'center', 
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    fontSize:'20px',
                    marginTop:'20px',
                    gap:'10px'
                    }}>
                    <Grid item>Resumen.</Grid>
                    <Datas/>
                </Grid>
                {adminis 
                ? <Grid item sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center', 
                        }}>
                        <Resumen admin={adminis}/>
                    </Grid> 
                : <Grid item sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center', 
                        color: light ? "var(--zero)" : "var(--ceroN)",
                        marginTop:'50px'
                        }}>
                        {'No tiene datos en el resumen...'}
                        <Buscar size={65}/>
                    </Grid>}
                    
            </Grid>
        : 
                <Grid container item sx={{
                height:'150vh', 
                width:'100%', 
                display:'flex', 
                flexDirection:'column', 
                alignItems:'center',
                padding:'15px' 
                }} >
                {user ? 
                <Grid container sx={{
                    fontSize:'20px',
                    alignItems:'center',
                    justifyContent:'center',
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    marginTop:'10px'
                    }}>
                    Hola Bienvenido {user?.name}!<Saludo/>
                </Grid> 
                : null }
                <Grid item sx={{
                    display:'flex',
                    flexDirection:'column', 
                    alignItems:'center',
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    fontSize:'14px',
                    }}>
                    <Grid item>Fecha del Mercado Argentino</Grid>
                    <Grid item>{moment(fecha.last_update).format('MMMM Do YYYY, h:mm:ss a')}</Grid>
                </Grid> 
                <Grid sx={{
                    display:'flex', 
                    flexDirection:'column',
                    justifyContent:'center', 
                    gap:'30px',
                    marginTop:'18px'
                    }}>
                    <Tarjeta
                    compra={moneda(money.value_buy)}
                    venta={moneda(money.value_sell)}
                    ofiCompra={moneda(oficial.value_buy)}
                    ofiVenta={moneda(oficial.value_sell)}
                    />
                    <TarjetaEuro
                    compraBlue={moneda(euroBlue.value_buy)}
                    ventaBlue={moneda(euroBlue.value_sell)}
                    compraOficial={moneda(euroOficial.value_buy)}
                    ventaOficial={moneda(euroOficial.value_sell)}
                    />
                </Grid>
                <Grid item sx={{
                    display:'flex',
                    flexDirection:'row', 
                    alignItems:'center',
                    justifyContent:'center', 
                    color:light ? "var(--zero)" : "var(--ceroN)",
                    fontSize:'20px',
                    marginTop:'20px',
                    gap:'10px'
                    }}>
                    <Grid item>Resumen</Grid>
                    <Datas/>
                </Grid>
                {adminis 
                ? <Grid item sx={{
                        display:'flex',
                        alignItems:'center',
                        justifyContent:'center', 
                        }}>
                        <Resumen admin={adminis}/>
                    </Grid> 
                : <Grid item sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center', 
                        color: light ? "var(--zero)" : "var(--ceroN)",
                        marginTop:'50px'
                        }}>
                        {'No tiene datos en el resumen...'}
                        <Buscar size={65}/>
                    </Grid>}
            </Grid>
            
        }
    </>
    );
};
export default Index;
