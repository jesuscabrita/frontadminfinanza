import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../context/contextPrincipal";
import { AiOutlineNotification as Noti } from "react-icons/ai";
import { NoticiaTarjeta } from "../components/Shared/NoticiaTarjeta";
import { useQuery } from "react-query";
import { useNoticias } from "../service/noticias";
import { filterArray, goToPage, next, previous } from "../utils/utils";
import { Paginacion } from "../components/Shared/Pagination";
import { SkeletonesNoti } from "../components/Shared/Skeleton";

export const Noticias = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [noticia, setNoticia] = useState([]);
    const [page, setPage]= useState(1);
    const [current, setCurrent]= useState(0);
    const cantidad = 2;
    
    useQuery([""], useNoticias, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setNoticia(data.articles);
        },
    });

    return (
    <>
    {!mobile ? 
        <Grid item sx={{height:'100vh', width:'100%', padding:'10px'}}>
            <Grid container item sx={{
                fontSize:'25px',
                alignItems:'center',
                justifyContent:'center',
                color:light ? "var(--zero)" : "var(--ceroN)",
                gap:'10px',
                borderBottom:`1px solid ${light ? "var(--zero)" : "var(--ceroN)" } `,
                width:'91%',
                marginLeft:'30px'
                }}>
                Noticias Globales<Noti size={20} />
            </Grid>
            <Grid mt={1}>
                {noticia ?  filterArray(current,'', noticia, cantidad).map((noti)=>{
                    return(                                                  
                            <NoticiaTarjeta data={noti}/>
                    )
                }) : <SkeletonesNoti/>}
            </Grid>
            <Grid mt={2} sx={{display:'flex'}}>
                <Paginacion
                count={Math.round(noticia.filter(info=> info.title.includes('')).length / 2)}
                hidden
                onChange={e => goToPage(setPage, setCurrent, e.target.innerText, cantidad)}
                buttonNext={()=> next(setPage, page, '', setCurrent, current, noticia, cantidad)}
                buttonPrevious={()=> previous(setPage, page, setCurrent, current,cantidad)}
                page={page}
                end
                />
            </Grid>
        </Grid>
    : 
    <Grid container item sx={{
        height: '200vh',
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
                width:'91%',
                marginLeft:'30px'
                }}>
                Noticias Globales<Noti size={20} />
        </Grid>
        <Grid mt={1}>
                {noticia ? filterArray(current,'', noticia,cantidad ).map((noti)=>{
                    return(                                                  
                            <NoticiaTarjeta data={noti}/>
                    )
                }): <SkeletonesNoti/>}
            </Grid>
            <Grid mt={2} sx={{display:'flex'}}>
                <Paginacion
                count={Math.round(noticia.filter(info=> info.title.includes('')).length / 2)}
                hidden
                onChange={e => goToPage(setPage, setCurrent, e.target.innerText, cantidad)}
                buttonNext={()=> next(setPage, page, '', setCurrent, current, noticia, cantidad)}
                buttonPrevious={()=> previous(setPage, page, setCurrent, current,cantidad)}
                page={page}
                end={false}
                />
            </Grid>    
    </Grid>
    }
    </>
    );
};
export default Noticias;