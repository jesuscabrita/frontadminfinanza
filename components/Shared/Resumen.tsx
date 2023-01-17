import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Grid } from '@mui/material';
import { filterDuo } from '../../utils/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export const Resumen =({admin})=>{
    let ingreso = filterDuo(admin, 'si','+').reduce((acumulador, actual) => acumulador + actual.monto, 0)
    let egreso = filterDuo(admin, 'si','-').reduce((acumulador, actual) => acumulador + actual.monto, 0)
    
    const data = {
        labels: ['Ingreso', 'Egreso'],
        datasets: [
        {
            label: '# of Votes',
            data: [ingreso,egreso ],
            backgroundColor: [
            'rgba(75, 192, 106, 0.2)',
            'rgba(253, 69, 69, 0.2)',
            ],
            borderColor: [ 
            '#4bc078',
            '#fe4a4a',
            ],
            borderWidth: 1,
        },
        ],
    };
    return(
        <Grid sx={{height:'200px', width:'290px'}}>
            <Doughnut data={data} />
        </Grid>
    )
}