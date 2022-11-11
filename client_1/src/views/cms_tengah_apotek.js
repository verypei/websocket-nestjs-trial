import * as React from 'react';
import { useState, useEffect, useRef} from 'react';
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
import axios from "axios"
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

    

export default function CMS_TENGAH_APOTEK({ props }) {

   // ============================================= USE REF ===========================================

   const category = useRef()
   const destination = useRef()
   const title = useRef()
   const detail = useRef()
   const [select, setSelect] = useState();
    const [status, setStatus] = useState();
    const [notif, setNotif] = useState(null)
    const [badge, setBadge] = useState(0)
    const [data, setData] = useState([])

    
    // ======================================== USE EFFECT ================================================

    useEffect(()=>{
        socket.on('ALL_RECEIVE',handleSocket);
        // socket.on('PHARMACY_1_RECEIVE',handleSocket);
        // socket.on('igd1',handleSocket);
        // socket.on('poly1',handleSocket);
        
        return ()=>{
            socket.off();
        }
    },[data])
    
    // ========================================== FUNCTION =====================================================

    const pushData = (data)=>{
        setBadge((num)=>num+1);
        setData(prev => [...prev,data]);
        socket.off();
    }

    const handleSocket = (data)=>{
        switch (data.origin) {
            case "CENTER":
                pushData(data)
                socket.off();
                break;
            case "apotek2":
                pushData()
                socket.off();
                break;
            case "poly1":
                pushData()
                socket.off();
                break;
            case "igd1":
                pushData()
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
            origin:"apotek1",
            destination:destination.current.value,
            status:status.current.value === "true" ? true : false,
        }
        const resp = await axios.post('http://localhost:3334/notif',obj);
        console.log(resp,"----RESP----");
        if(resp){
            socket.emit('PHARMACY_1_SEND',obj);
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
                                <h5>CMS TENGAH APOTEK</h5>
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
                        <option value="pusat">cms pusat</option>
                        <option value="poly1">cms poly</option>
                        <option value="igd1">cms igd</option>
                        <option value="apotek2">portal apotek</option>
                        </select>
                        <br/>

                    <input type="submit" onClick={handleInput}/>

                </form>
                    <h6>{data.length > 0 && data.map((el, idx)=>{
                        return <p>{JSON.stringify(el)}</p>
                    })}</h6>
            </div>
        </div>
    );
}
