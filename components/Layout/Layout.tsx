import { injectGlobal } from "@emotion/css";
import { useMediaQuery } from "@mui/material";
import { useContext } from "react";
import Context from "../../context/contextPrincipal";
import { Navbar } from "../Home/Navbar";
import { Grid } from '@mui/material';

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap');
body{
  padding: 0;
margin: 0;
font-family: 'Nanum Gothic', sans-serif;
}
`;
export const Layout = ({ children }) => {
  const [light] = useContext(Context);
  const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
  return (
    <>
      {!mobile ? (
        <Grid item sx={{
          width: '100%',
          height:'100%',
          background: light ? "var(--cero)" : "var(--dark)",
          display:'flex',
          flexDirection:'row'
          }}>
            <Navbar />
          {children}
        </Grid>
      ) : (
        <Grid item sx={{
          width: '100%',
          height:'100%', 
          background: light ? "var(--cero)" : "var(--dark)",
          }}>
          <Navbar />
          {children}
        </Grid>
      )}
    </>
  );
};
