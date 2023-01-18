import { Grid, useMediaQuery } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/contextPrincipal";
import { RiExchangeDollarLine as Circle } from "react-icons/ri";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useQuery } from "react-query";
import { useDolar } from "../../service/dolar";
import { AiOutlineDollarCircle as Dolar } from "react-icons/ai";
import { MdAttachMoney as Peso } from "react-icons/md";
import { useEuro } from "../../service/euro";
import { AiOutlineEuroCircle as Euro } from "react-icons/ai";

interface State {
    amount: string;
}

export const CambioDivisa = ({ venta, value_sell }) => {
    const [light] = useContext(Context);
    const [dolar, setDolar] = useState({ value_sell });
    const [euro, setEuro] = useState({ value_sell });
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const [values, setValues] = useState<State>({ amount: "" });
    const [values2, setValues2] = useState<State>({ amount: "" });
    const [values3, setValues3] = useState<State>({ amount: "" });
    const [values4, setValues4] = useState<State>({ amount: "" });

    useQuery(["/v2/latest"], useDolar, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setDolar(data.blue);
        },
    });
    useQuery(["/v2/latest"], useEuro, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            setEuro(data.blue_euro);
        },
    });

    const monedaDolar = (valor) => {
        const valorDolar = valor ?? 0;
        return Number(valorDolar).toLocaleString("es-AR", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "code",
            minimumFractionDigits: 2,
        });
    };
    const monedaEuro = (valor) => {
        const valorDolar = valor ?? 0;
        return Number(valorDolar).toLocaleString("es", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        });
    };
    const monedaArg = (valor) => {
        const valorDolar = valor ?? 0;
        return Number(valorDolar).toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 2,
        });
    };
    let dolarBlue = monedaDolar(Number(values.amount) / dolar.value_sell);
    let pesoArg = monedaArg(dolar.value_sell * Number(values2.amount));
    let euroBlue = monedaEuro(Number(values3.amount) / euro.value_sell);
    let pesoArgEur = monedaArg(euro.value_sell * Number(values4.amount));

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };
    const handleChange2 =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues2({ ...values2, [prop]: event.target.value });
        };
    const handleChange3 =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues3({ ...values3, [prop]: event.target.value });
        };
    const handleChange4 =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues4({ ...values4, [prop]: event.target.value });
        };

    return (
        <Grid item sx={{ width: !mobile ? "600px" : "370px", height: "100%", borderRadius: "16px", background: light ? "var(--ceroN)" : "var(--terciarioN)", paddingBottom: "16px",}}>
            <Grid container item sx={{ background: "var(--segundario)", borderRadius: "10px 10px 0px 0px", padding: "10px", color: "var(--cero)", alignItems: "center", gap: "16px",}}>
                <Circle size={25} /> Cambio Blue
            </Grid>
            <FormControl sx={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}>
                <InputLabel htmlFor="outlined-adornment-amount" style={{ color: light ? "rgba(0, 0, 0, 0.6)" : "var(--cero3)" }}>
                    Pesos Argentinos
                </InputLabel>
                <OutlinedInput
                    style={{ color: light ? "var(--zero)" : "var(--cero3)" }}
                    id="outlined-adornment-amount"
                    value={values.amount}
                    onChange={handleChange("amount")}
                    startAdornment={<InputAdornment position="start"><Grid sx={{ color: "var(--hazard)", fontWeight: "700" }}>$</Grid></InputAdornment>}
                    label="Pesos Argentinos"
                    autoComplete="true"
                />
            </FormControl>
            <Grid item container sx={{ marginLeft: "20px", marginTop: "10px", color: light ? "var(--zero)" : "var(--cero3)", gap: "6px",}}>
                <Dolar size={25} /> {dolarBlue}
            </Grid>
            <FormControl sx={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}>
                <InputLabel htmlFor="outlined-adornment-amount" style={{ color: light ? "rgba(0, 0, 0, 0.6)" : "var(--cero3)" }}>
                    Dolar
                </InputLabel>
                <OutlinedInput
                    style={{ color: light ? "var(--zero)" : "var(--cero3)" }}
                    id="outlined-adornment-amount"
                    value={values2.amount}
                    onChange={handleChange2("amount")}
                    startAdornment={<InputAdornment position="start"><Grid sx={{ color: "var(--activo)", fontWeight: "700" }}>USD</Grid></InputAdornment>}
                    label="Dolar"
                    autoComplete="true"
                />
            </FormControl>
            <Grid item container sx={{ marginLeft: "20px", marginTop: "10px", color: light ? "var(--zero)" : "var(--cero3)", gap: "6px",}}>
                <Peso size={25} /> {pesoArg}
            </Grid>
            <FormControl sx={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}>
                <InputLabel htmlFor="outlined-adornment-amount" style={{ color: light ? "rgba(0, 0, 0, 0.6)" : "var(--cero3)" }}>
                    Pesos Argentinos
                </InputLabel>
                <OutlinedInput
                    style={{ color: light ? "var(--zero)" : "var(--cero3)" }}
                    id="outlined-adornment-amount"
                    value={values3.amount}
                    onChange={handleChange3("amount")}
                    startAdornment={<InputAdornment position="start">{" "}<Grid sx={{ color: "var(--hazard)", fontWeight: "700" }}>$</Grid></InputAdornment>}
                    label="Pesos Argentinos"
                    autoComplete="true"
                />
            </FormControl>
            <Grid item container sx={{ marginLeft: "20px", marginTop: "10px", color: light ? "var(--zero)" : "var(--cero3)", gap: "6px",}}>
                <Euro size={25} /> {euroBlue}
            </Grid>
            <FormControl sx={{ marginTop: "20px", marginLeft: "20px", width: "90%" }}>
                <InputLabel htmlFor="outlined-adornment-amount" style={{ color: light ? "rgba(0, 0, 0, 0.6)" : "var(--cero3)" }}>
                    Euro
                </InputLabel>
                <OutlinedInput
                    style={{ color: light ? "var(--zero)" : "var(--cero3)" }}
                    id="outlined-adornment-amount"
                    value={values4.amount}
                    onChange={handleChange4("amount")}
                    startAdornment={<InputAdornment position="start">{" "}<Grid sx={{ color: "var(--activo)", fontWeight: "700" }}>€</Grid></InputAdornment>}
                    label="Euro"
                    autoComplete="true"
                />
            </FormControl>
            <Grid item container sx={{ marginLeft: "20px", marginTop: "10px", color: light ? "var(--zero)" : "var(--cero3)", gap: "6px",}}>
                <Peso size={25} /> {pesoArgEur}
            </Grid>
        </Grid>
    );
};
