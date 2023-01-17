import { Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { FcReadingEbook as Creator } from 'react-icons/fc';
import { IoBusinessOutline as Buss } from 'react-icons/io5';
import { TbHandClick as Click } from 'react-icons/tb'
import moment from 'moment';

export const NoticiaTarjeta =({data})=>{
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true })
    
    return(
        <Grid item sx={{
            width: !mobile ? "95%" : '330px', 
            height: !mobile ? "100%" : '550px', 
            borderRadius: "16px", 
            background: light ? "var(--ceroN)" : "var(--terciarioN)", 
            marginTop:'10px',
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
                {data?.title.length > 90 ?  data?.title.slice(0,-20)+ '...' : data?.title}
                </Grid>
        <Grid item sx={{wordBreak:'break-word', display:'flex', flexDirection: mobile ? 'column':'row'}}>
            <img 
            src={data?.urlToImage ? data?.urlToImage :'https://i.ytimg.com/vi/PG1tUVv8XWQ/maxresdefault.jpg'} 
            alt={data?.description } 
            style={{height:'100%', width:'370px', borderRadius: "0px 0px 0px 10px" }} 
            onError={ev => ev.target }
            />
            <Grid 
                sx={{
                    color: light ? "var(--zero)" : "var(--ceroN)",
                    padding:'10px',
                    display:'flex',
                    flexDirection:'column'
                }}>
                <Grid mb={1}>{data?.content}</Grid>
                <Grid sx={{
                        display:'flex', 
                        alignItems:'center', 
                        gap:'8px'
                        }}>
                        <Creator size={22}/>
                        {data?.author === null 
                        ? data?.source?.name 
                        : data?.author}
                </Grid>
                <Grid sx={{
                        display:'flex', 
                        alignItems:'center', 
                        gap:'8px', 
                        fontWeight:'600'
                        }}>
                        <Buss size={22}/>
                        {data?.source?.name}
                </Grid>
                <a
                    target="_blank"
                    href={data?.url}
                    style={{
                    display:'flex', 
                    alignItems:'center', 
                    gap:'8px',
                    fontSize:'16px',
                    color:light ? "var(--terciario)" : "var(--cero3)"
                    }}>
                    <Click size={18}/>
                    ir a la info
                </a>
                <Grid sx={{
                    fontSize:'14px',
                    color:light ? "var(--terciario)" : "var(--cero3)"
                    }}>
                    {moment(data?.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    )
}