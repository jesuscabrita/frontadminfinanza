import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../context/contextPrincipal";
import { BsFillBookmarkHeartFill as Calif } from "react-icons/bs";
import { Estrellas } from "../components/Shared/Start";
import { TextareaAutosize } from "@material-ui/core";
import { MdPostAdd as Idd } from "react-icons/md";
import { Comentario } from "../components/Shared/TarjetaComentario";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle as User } from 'react-icons/fa';
import { useCalificacion } from "../hooks/useCalificacion";
import { create_Calificacion } from "../lib/calificacion";
import { filterArrayComen, goToPage, next, previous } from "../utils/utils";
import { Paginacion } from "../components/Shared/Pagination";
import Swal from "sweetalert2";
import { SkeletonesOne } from "../components/Shared/Skeleton";

const Calificacion = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { loginWithRedirect, user, isLoading, getAccessTokenSilently } = useAuth0();
    const { data: calific, mutate } = useCalificacion();
    const [comentario, setComentario] = useState('');
    const [valor, setValor] = useState(3);
    const [page, setPage]= useState(1);
    const [current, setCurrent]= useState(0);

    const handleChange = (event) => {
        setComentario(event.target.value);
    };

    const alertaCalifica = async(submit)=>{
        if(submit){
            Swal.fire({
                icon: 'success',
                title: 'Nueva calificación'
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error'
                })
        }
    }

    const submitCalific = async (e)=>{
        e.preventDefault();
        const token = await getAccessTokenSilently();
        await create_Calificacion({
            comentario,
            valor,
            imagen: user?.picture,
            name: user?.name,
        }, token)
        alertaCalifica(create_Calificacion)
        setComentario('')
        setValor(3)
    }

    return (
    <>
    {!mobile ?  
        <Grid item sx={{height:'100vh', width:'100%',padding:'20px'}}>
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
                Calificacion<Calif size={20} />
            </Grid>
            <Grid item sx={{
                    marginTop:'10px',
                    display:'flex', 
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center', 
                    gap:'30px',
                    }}>
                    {user ? <>
                            <Estrellas
                            setValue={setValor}
                            value={valor}
                            />
                            <TextareaAutosize
                                value={comentario}
                                onChange={handleChange}
                                style={{
                                    width: '50%',
                                    height: '100px',
                                    background: light ? 'var(--ceroN)' : 'var(--dark)',
                                    border: `1px solid ${light ? "var(--zero)" : "var(--ceroN)"} `,
                                    color: light ? "var(--zero)" : "var(--ceroN)",
                                }} />
                    <Grid item container mt={-3}
                    onClick={submitCalific} 
                    sx={{ 
                        background: "var(--primario)", 
                        width: "70px", 
                        height: "30px", 
                        borderRadius: "8px", 
                        cursor: "pointer",
                        }}>
                    <Idd style={{ 
                        cursor: "pointer", 
                        padding: "2px", 
                        marginLeft: "18px", 
                        color: "white",
                        }} size={30}/>
                </Grid> 
                </>
                :   <Grid container item sx={{
                        fontSize: '25px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: light ? "var(--zero)" : "var(--ceroN)",
                        flexDirection: 'column',
                        }}>
                        {'Para calificarnos'}
                        <Grid item sx={{ fontSize: '18px' }}>debe iniciar sesion</Grid>
                        <Grid
                            onClick={() => loginWithRedirect()}
                            sx={{ cursor: 'pointer' }}>
                            <User size={60} />
                        </Grid>
                    </Grid>}
                    {calific ? filterArrayComen(current,'', calific, 2).map((e)=>(
                        <Comentario calificacion={e}/>
                    )): <SkeletonesOne/>}
                    <Paginacion
                    count={Math.round(calific?.filter(info=> info.comentario.includes('')).length / 2)}
                    hidden
                    onChange={e => goToPage(setPage, setCurrent, e.target.innerText, 2)}
                    buttonNext={()=> next(setPage, page, '', setCurrent, current, calific, 2)}
                    buttonPrevious={()=> previous(setPage, page, setCurrent, current,2)}
                    page={page}
                    end
                    />
                </Grid>
        </Grid>
    : 
        <Grid container item sx={{
            height: '190vh',
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
                Calificacion<Calif size={20} />
            </Grid>

            <Grid item sx={{
                    marginTop:'10px',
                    display:'flex', 
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center', 
                    gap:'30px',
                    }}>
                {user ? <>        
                        <Estrellas
                        setValue={setValor}
                        value={valor}
                        />
                    <TextareaAutosize
                        value={comentario}
                        onChange={handleChange}
                        style={{
                            width: !mobile ? '50%' : '380px',
                            height:!mobile ? '100px' : '200px',
                            background: light ? 'var(--ceroN)':'var(--dark)',
                            border:`1px solid ${light ? "var(--zero)" : "var(--ceroN)" } `,
                            color:light ? "var(--zero)" : "var(--ceroN)",
                        }}
                    />
                    <Grid item container mt={-3}
                    onClick={submitCalific} 
                    sx={{ 
                        background: "var(--primario)", 
                        width: "70px", 
                        height: "30px", 
                        borderRadius: "8px", 
                        cursor: "pointer",
                        }}>
                    <Idd style={{ 
                        cursor: "pointer", 
                        padding: "2px", 
                        marginLeft: "18px", 
                        color: "white",
                        }} size={30}/>
                </Grid>
                </>
                :   <Grid container item sx={{
                        fontSize: '25px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: light ? "var(--zero)" : "var(--ceroN)",
                        flexDirection: 'column',
                        }}>
                        {'Para calificarnos'}
                        <Grid item sx={{ fontSize: '18px' }}>debe iniciar sesion</Grid>
                        <Grid
                            onClick={() => loginWithRedirect()}
                            sx={{ cursor: 'pointer' }}>
                            <User size={60} />
                        </Grid>
                    </Grid>} 
                    {calific ? filterArrayComen(current,'', calific, 2).map((e)=>(
                        <Comentario calificacion={e}/>
                    )): <SkeletonesOne/>}
                    <Paginacion
                    count={Math.round(calific?.filter(info=> info.comentario.includes('')).length / 2)}
                    hidden
                    onChange={e => goToPage(setPage, setCurrent, e.target.innerText, 2)}
                    buttonNext={()=> next(setPage, page, '', setCurrent, current, calific, 2)}
                    buttonPrevious={()=> previous(setPage, page, setCurrent, current,2)}
                    page={page}
                    end
                    />
                </Grid>

        </Grid>
    }
        </>
    );
};
export default Calificacion;