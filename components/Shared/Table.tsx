import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { useAdmin } from "../../hooks/useAdmin";
import { useAuth0 } from "@auth0/auth0-react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableColum } from "./TableColumn";

export const Tables = () => {
    const [light] = useContext(Context);
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const { data: adminis, mutate } = useAdmin();
    interface Column {
        id: 'Ingreso / Egreso' | 'Monto' | 'Moneda' | 'Estatus' | 'Accion';
        label: string;
        minWidth?: number;
        align?: 'right';
        }

    const columns: readonly Column[] = [
        { id: 'Ingreso / Egreso', label: 'Ingreso / Egreso', minWidth:!mobile ? 300 : 190 },
        { id: 'Monto', label: 'Monto', minWidth:!mobile ? 80 : 40 },
        { id: 'Moneda', label: 'Moneda', minWidth:!mobile ? 100 : 20, align: 'right',},
        { id: 'Estatus', label: 'Estatus', minWidth:!mobile ? 200 : 250, align: 'right',},
        { id: 'Accion', label: 'Accion', minWidth:!mobile ? 150 : 100, align: 'right',},
        ];

    return (
    <Paper sx={{ width: !mobile ? '100%': '380px', overflow: 'hidden', marginTop:'10px' }}>
        <TableContainer sx={{ maxHeight: !mobile ? 285 : 500 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ 
                            minWidth: column.minWidth, 
                            background: "var(--segundario)",
                            color: "var(--cero)",  
                        }}
                        >
                        {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {adminis ? adminis.map((e) => (
                        <TableColum admin={e} opera={adminis} />
                        )): 'hola'}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
    );
};
