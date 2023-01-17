import Pagination from '@mui/material/Pagination'
import { useContext } from 'react';
import Context from '../../context/contextPrincipal';
import { Grid } from "@mui/material";

export const Paginacion =({count, page, hidden = false, buttonPrevious, buttonNext, onChange, end})=>{
    const [light] = useContext(Context);
    return(
        <Grid container mr={end ? 8 : 0 } sx={{justifyContent: end ? 'end' : ''}}>
            <button
                style={{
                        borderRadius: '3px 3px 7px 3px',
                        border: 'none',
                        minWidth: '15px',
                        minHeight: '16px',
                        background: light? 'var(--cero3)': 'var(--ceroN)',
                        cursor: 'pointer',
                    }}
                onClick={buttonPrevious}>
                {'<'}
            </button>
            <Pagination
                count={ count }
                onChange={onChange}
                hidePrevButton = { hidden }
                hideNextButton = { hidden }
                page={ page }
                sx={{
                    padding:'0 8px',
                    '& div':{color: light ? 'var(--zero)' : 'var(--cero)',},
                    '& button':{
                        color: light ? 'var(--zero)' : 'var(--cero)',
                        minWidth: '20px',
                        height:'20px'
                    },
                    '& button.Mui-selected':{
                        color: light ? 'var(--cero3)' : 'var(--zero)',
                        backgroundColor: light ?'var(--zero)' : 'var(--cero3)',
                        borderRadius:'8px'
                    },
                    '& button.Mui-selected:hover':{
                        color: 'var(--ceroN)',
                        backgroundColor: light ?'var(--segundario)' : 'var(--cero3)'
                    }
                }}
            />
            <button
                style={{
                    borderRadius: '3px 3px 7px 3px',
                    border: 'none',
                    minWidth: '15px',
                    minHeight: '16px',
                    background: light ? 'var(--cero3)': 'var(--ceroN)',
                    cursor: 'pointer',
                }}
                onClick={buttonNext}>
                {'>'}
            </button>      
        </Grid>
    )
}