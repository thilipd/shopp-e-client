import React, { useEffect, useState } from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from "@mui/material";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../axios/axios';
import { dispatchLogout, dispatchLogin } from '../../redux/actions/authActions';
import { useDispatch } from 'react-redux'


const pagesAdmin = ['Home', 'dashboard', 'product', 'catagory', 'subcatagory', 'cart'];
const pagesUser = ['Home', 'wishlist', 'cart'];
const authPages = ['Login', 'Register']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const linkAdmin = ['/', '/admin/dashboard', '/admin/product', '/admin/catagory', '/admin/subcatagory', 'cart'];
const linkUser = ['/', '/user/wishlist', 'cart'];
const authLink = ['login', 'register']

const Header = () => {

    const auth = useSelector(state => state.auth);

    const { user, isLogged, isAdmin } = auth;



    const navigate = useNavigate();

    const dispatch = useDispatch();

    const pages = isAdmin ? pagesAdmin : pagesUser;
    const link = isAdmin ? linkAdmin : linkUser

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {

        console.log(event.currentTarget)
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handdleLogout = async () => {

        window.localStorage.removeItem('firstLogin');
        window.localStorage.removeItem('login');
        window.localStorage.removeItem('accessToken');

        try {
            const res = await axios.get('/user/logout')
            navigate('/');
            dispatch(dispatchLogout());
            dispatch({ type: 'GET_TOKEN', payload: '' });
            dispatch({ type: 'GET_ALL_USER', payload: [] });
            return res.data

        } catch (error) {
            return (error)
        }
    }

    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);

        if (e.target) {
            let selectedBtn = Object.values(e.target.childNodes[0])[0].memoizedProps;

            switch (selectedBtn) {
                case 'Logout':
                    handdleLogout();
                    break;
                case 'Profile':
                    // code block
                    navigate('/profile')
                    console.log("Profile")
                    break;
                case 'Dashboard':
                    if (isAdmin) {
                        navigate('/admin/dashboard')
                    } else {
                        navigate('/user/dashboard');
                    }
                    console.log("Dashboard")
                    break;

                case 'Account':
                    console.log('Account');
                    break;
                default:
                    console.log('default')

            }
        }

    };
    const local = JSON.parse(window.localStorage.getItem('login'))


    useEffect(() => {
        if (local) {
            dispatch(dispatchLogin());
            dispatch({ type: 'GET_TOKEN', payload: JSON.parse(window.localStorage.getItem('accessToken')) });
        }
    }, [])








    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SHOPP-E
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    color: '#000',
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, i) => (
                                    <MenuItem key={page} onClick={(e) => handleCloseNavMenu(e)}>
                                        <Typography textAlign="center">
                                            <Link color={'primary'} className='linkMob' to={`${link[i]}`}>{page}</Link>
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            SHOPPE
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, i) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link className='link' to={`${link[i]}`}> {page}</Link>
                                </Button>
                            ))}
                        </Box>



                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {
                                (!local) ?
                                    <>
                                        {authPages.map((page, i) => (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                <Link className='link' to={`${authLink[i]}`}> {page}</Link>
                                            </Button>
                                        ))}
                                    </> :
                                    <>
                                        <div className='avatarContainer'>
                                            <h4>{`Hi ${local.name}`}</h4>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                                                    <Avatar alt="Profile pic" src={`${user.avatar}`} />

                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} className='span' onClick={handleCloseUserMenu}>
                                                    {setting}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header

