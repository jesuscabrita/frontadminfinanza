import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useMediaQuery } from "@mui/material";

export const Skeletones =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return(
        <Box sx={{ width: !mobile ? '97%' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
    </Box>
    )
}

export const SkeletonesOne =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return(
        <Box sx={{ width: !mobile ? '420px' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'70px',marginBottom:'-50px'}} />
            <Skeleton animation="wave" sx={{height:'220px',marginBottom:'-35px'}} />
    </Box>
    )
}
export const SkeletonesNoti =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return(
        <>
        <Box sx={{ width: !mobile ? '95%' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'70px',marginBottom:!mobile ?'-70px' :'-120px'}} />
            <Skeleton animation="wave" sx={{height:!mobile ? '310px':'670px',marginBottom:!mobile ? '-35px': '-80px'}} />
        </Box>
        <Box mt={-7} sx={{ width: !mobile ? '95%' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'70px',marginBottom:!mobile ?'-70px' :'-120px'}} />
            <Skeleton animation="wave" sx={{height:!mobile ? '310px':'670px',marginBottom:!mobile ? '-35px': '-80px'}} />
        </Box>
        </>
    )
}
export const SkeletonesForm =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return(
        <Box sx={{ width:!mobile ? '600px' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
    </Box>
    )
}
export const SkeletonesCambio =()=>{
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    return(
        <Box sx={{ width:!mobile ? '600px' : '330px' }}>
            <Skeleton animation='wave' sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
            <Skeleton animation="wave" sx={{height:'100px',marginBottom:'-35px'}} />
    </Box>
    )
}