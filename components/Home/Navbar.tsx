import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { GoHome as Home } from "react-icons/go";
import { BsFillBookmarkHeartFill as Setting } from "react-icons/bs";
import { RiExchangeDollarLine as Circle } from "react-icons/ri";
import { GoInfo as Info } from "react-icons/go";
import { BsArrowLeftCircle as ArrowLeft } from "react-icons/bs";
import { BsArrowRightCircle as ArrowRight } from "react-icons/bs";
import Context from "../../context/contextPrincipal";
import { FormControlLabel, Grid, useMediaQuery } from "@mui/material";
import Switch from "@material-ui/core/Switch";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { VscChromeClose as Exit } from "react-icons/vsc";
import { AiOutlineNotification as Noti } from "react-icons/ai";
import { ButtonNav, ButtonNavbar } from "./ButtonNavbar";
import { GiProgression as Progress } from "react-icons/gi";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineLogin as Login } from "react-icons/ai";
import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import { RiLogoutCircleFill as Cerrar } from 'react-icons/ri';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {margin: 1,padding: 0,transform: "translateX(6px)","&.Mui-checked": {color: "#fff",transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent("#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,},
      "& + .MuiSwitch-track": {opacity: 1,backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",},
    },
  },
  "& .MuiSwitch-thumb": {backgroundColor: theme === "dark" ? "#003892" : "#001e3c",width: 32,height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {opacity: 1,backgroundColor: theme === "dark" ? "#8796A5" : "#aab4be",borderRadius: 20 / 2,},
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {backgroundColor: '#44b700',color: '#44b700',boxShadow: `0 0 0 2px ${theme}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {'0%': {transform: 'scale(.8)',opacity: 1,},
    '100%': {transform: 'scale(2.4)',opacity: 0,},
  },
}));

export const Navbar: React.FC = () => {
  const [light, setLight] = useContext(Context);
  const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
  const tablet = useMediaQuery("(max-width:1030px)", { noSsr: true });
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { loginWithRedirect, user, logout } = useAuth0();
  const Menuitem = styled(MenuItem)`:hover {background-color: var(--terciario);border-radius: 0px 0px 25px 0px;}`;
  const onClickMenuIcon = () => {setCollapsed(!collapsed)};

  const setChangeDark = () => {
    setLight(light ? false : true);
    localStorage.setItem("light", "false");
  };

  return (
    <>
      {!mobile ? (
        <Grid>
          <ProSidebar 
            className="pro-sidebar-inner" 
            width={"200px"} 
            collapsed={!tablet ? collapsed : true}>
            {!user && (
              <Grid 
                item mt={4} 
                onClick={() => loginWithRedirect()} 
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  }}>
                <Login />
                Login
              </Grid>
            )}
            {user && (
              <Grid 
                item 
                mt={4} 
                sx={{display: "flex", alignItems: "center", justifyContent: "center",}}>
                <StyledBadge 
                    overlap="circular" 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
                    variant="dot">
                  <Avatar 
                      alt={user?.name} 
                      sx={{ width: 60, height: 60 }} 
                      src={user.picture 
                      ? user.picture 
                      : "https://bysperfeccionoral.com/wp-content/uploads/2020/01/136-1366211_group-of-10-guys-login-user-icon-png.jpg"}
                  />
                </StyledBadge>
              </Grid>
            )}
            <SidebarHeader>
              <Grid 
                  onClick={onClickMenuIcon} 
                  sx={{float: "right", margin: "10px", cursor: "pointer",}}>
                {collapsed ? <ArrowRight size={25} /> : <ArrowLeft size={25} />}
              </Grid>
            </SidebarHeader>
            <Menu iconShape="circle">
              <Menuitem icon={<Home size={20} />}><ButtonNav href="/">Home</ButtonNav></Menuitem>
              <Menuitem icon={<Progress size={20} />}><ButtonNav href="/manage">Administrar</ButtonNav></Menuitem>
              <Menuitem icon={<Circle size={20} />}><ButtonNav href="/cambio">Cambio</ButtonNav></Menuitem>
              <SubMenu title="Informacion" icon={<Info size={20} />}>
                <Menuitem><ButtonNav href="/noticias">Noticias</ButtonNav></Menuitem>
              </SubMenu>
              <Menuitem icon={<Setting size={20} />}><ButtonNav href="/calificacion">Calificación</ButtonNav></Menuitem>
            {user && 
                <Menuitem icon={<Cerrar size={20} />}>
                  <Grid onClick={() => logout({ returnTo: window.location.origin })}>
                    Cerrar Sesion
                  </Grid>
                </Menuitem>}   
              <Menuitem 
                  icon={<FormControlLabel style={{ marginLeft: "25px" }}
                  onClick={() => setChangeDark()}
                  label="" 
                  control={<MaterialUISwitch defaultChecked={!light ? true : false}/>}
                />}>
              </Menuitem>
            </Menu>
          </ProSidebar>
        </Grid>
      ) : (
        <AppBar 
            position="fixed" 
            color="primary" 
            sx={{ top: "auto", bottom: 0 }} 
            className="MuiPaper-root-MuiAppBar-root">
          <Toolbar>
            <IconButton 
                color="inherit" 
                aria-label="open drawer" 
                onClick={() => {setShow(!show)}}>
              {!show ? <MenuIcon /> : <Exit />}
            </IconButton>
            {show ? (
              <Grid 
                sx={{background: light ? "var(--segundario)" : "var(--segundario)",}} 
                className="absolute inset-x-0 bottom-14 w-screen rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {!user &&
                <Grid onClick={() => loginWithRedirect()}>
                  <ButtonNavbar href=''><Login size={20} />Login</ButtonNavbar>
                </Grid> }
                <Grid>
                  <ButtonNavbar href="/manage"><Progress size={20} />Administrar</ButtonNavbar>
                </Grid>
                <Grid>
                  <ButtonNavbar href="/cambio"><Circle size={20} />Cambio</ButtonNavbar>
                </Grid>
                <Grid sx={{ color: "var(--cero2)", marginTop: "10px" }} className="flex items-center px-4 gap-2 py-2 text-lg mt-1.5 text-gray-900">
                  <Info size={20} /> Informacion
                </Grid>
                <Grid sx={{ marginTop: "-15px" }}>
                  <ButtonNavbar href="/noticias"><Noti size={20} />Noticias</ButtonNavbar>
                </Grid>
                <Grid sx={{ marginBottom: "15px" }}>
                  <ButtonNavbar href="/calificacion"><Setting size={20} />Calificación</ButtonNavbar>
                </Grid>
                {user &&
                <Grid onClick={() => logout({ returnTo: window.location.origin })} sx={{ marginBottom: "15px" }}>
                  <ButtonNavbar href=""><Cerrar size={20} />Cerrar Sesion</ButtonNavbar>
                </Grid>}
              </Grid>
            ) : null}
            <Box sx={{ flexGrow: 1 }} />
            <IconButton style={{ padding: "6px" }} color="inherit" aria-label="open drawer">
              <ButtonNavbar href="/"><Home size={20}/></ButtonNavbar>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <FormControlLabel 
                control={<MaterialUISwitch defaultChecked={!light ? true : false} 
                onClick={() => setChangeDark()}/>} 
                label=""
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};
