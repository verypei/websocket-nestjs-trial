import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import io from 'socket.io-client';
import axios from "axios";
const socket = io.connect('http://localhost:3334');//connected to server

const drawerWidth = 0;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(100% - ${100}px)`,
    marginLeft: `${100}px`,
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function CMS_PUSAT({ props }) {
    
    // ================================================= USE REF =================================================

    const title = useRef();
    const detail = useRef();
    const category = useRef();
    const [select, setSelect] = useState();
    const [status, setStatus] = useState();
    const [notif, setNotif] = useState(null);
    const [badge, setBadge] = useState(0);
    const [data, setData] = useState([])

    // ================================================ USE EFFECT ================================================
            
    useEffect(()=>{
        socket.on('CENTER_RECEIVE',handleSocket);
        return ()=>{
            socket.off();
        }
    },[data])
    
    // ============================================= FUNCTION =====================================================
    
    const pushData = (data)=>{
        setBadge((num)=>num+1);
        setData(prev => prev && [...prev,data]);
        socket.off();
    }

    const handleSocket = (data)=>{
        switch (data.origin) {
            case "PHARMACY_1":
                pushData(data)
                socket.off();
                break;
            case "POLY_1":
                pushData(data)
                socket.off();
                break;
            case "ER_1":
                pushData(data)
                socket.off();
                break;
            default:
                break;
        }
       
    }

    const handleInput = async (e)=>{
        e.preventDefault()
        const obj = {
            title:title.current.value,
            detail:detail.current.value,
            category:category.current.value,
            status:status === "true" ? true : false,
            origin:"CENTER",
            destination:select,
        }
        const resp = await axios.post('http://localhost:3334/notif',obj);
        console.log(resp,"====RESPONSE=====");
        if(resp){
            socket.emit('CENTER_SEND',obj);
        }
    }

    const handleNotif = (e) => {
        setNotif(e.currentTarget)
    }

    const handleNotifClose = () => {
        setNotif(null)
    }

    return (
        <div>
            
            <div className='bsa-sidebar'>
                <Box sx={{ display: 'flex' }}>
                    <AppBar position="fixed" style={{
                        padding: "0 1.5rem",
                        backgroundColor: "#FFFFFF",
                        boxShadow: "unset",
                        marginLeft: "0px",
                        width: "100%",
                    }}>
                        <Toolbar className='container ps-0 pe-0' style={{
                            background: "#FFFFFF"
                        }}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="hms-location-head">
                                <h5>CMS PUSAT</h5>
                            </Typography>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                                <IconButton
                                    size="medium"
                                    color="inherit"
                                    ara-controls="notif-appbar"
                                    aria-haspopup="true"
                                    onClick={handleNotif}
                                    className="bg-soft-success me-3"
                                >
                                    <Badge badgeContent={badge} className='font-11 hms-badge-danger hms-position-notif'>
                                        <NotificationsRoundedIcon style={{ fontSize: "2rem", color: "#FFFFFF" }} />
                                    </Badge>
                                </IconButton>
                                <Menu
                                    id="notif-appbar"
                                    anchorEl={notif}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(notif)}
                                    onClose={handleNotifClose}
                                >
                                    <div className='p-3'>
                                        Coming Soon
                                    </div>
                                </Menu>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>

            <div style={{marginTop:"100px"}}>
                <form>
                    <label>title:</label>
                    <input type="text" ref={title}/><br/>

                    <label>detail :</label>
                    <input type="text" ref={detail}/><br/>

                    <label>category :</label>
                    <input type="text" ref={category}/><br/>

                    <label for="cars">Choose a status :</label>
                        <select value={status} onChange={e=>setStatus(e.target.value)}>
                        <option></option>
                        <option value={true}>CITO</option>
                        <option value={false}>NON CITO</option>
                        </select>
                        <br/>

                    <label for="cars">Choose a destination :</label>
                        <select value={select} onChange={e=>setSelect(e.target.value)}>
                            <option></option>
                            <option value="ALL">all divisi</option>
                            <option value="PHARMACY_1">cms apotek</option>
                            <option value="ER_1">cms igd</option>
                            <option value="POLY_1">cms poly</option>
                            <option value="PHARMACY_2">portal apotek</option>
                            <option value="ER_2">portal igd</option>
                            <option value="POLY_2">portal poly</option>
                        </select>
                        <br/>

                    <input type="submit" onClick={handleInput}/>

                </form>
                <h3>{JSON.stringify(data)}</h3>
            </div>
        </div>
    );
}
