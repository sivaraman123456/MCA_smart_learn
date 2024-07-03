import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Logo from "../../assets/edu.jpg";
import { Validation } from "../../utils/validation.js";
import loginImageJSON from "../../assets/login_image.json";
import {jwtDecode} from 'jwt-decode';
import {  CircularProgress,Backdrop } from '@mui/material';
import "./Login.css";
import { showToastMessage } from "../../utils/notification.js";
import { RoleContext } from "../../App.jsx";
import PageHeading from "../../Components/PageHeading.jsx";

const Login = ({ setAuth }) => {
    const Vite_login = import.meta.env.VITE_LOGIN;
    const Vite_url = import.meta.env.VITE_BASE_URL;
    const [image, setImage] = useState(loginImageJSON);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const setRole = useContext(RoleContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const { email, password } = inputs;
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const leftRotate = () => {
        let firstElement = image.shift();
        image.push(firstElement);
        setImage([...image]);
    };

    const rightRotate = () => {
        let firstElement = image.pop();
        image.unshift(firstElement);
        setImage([...image]);
    };

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            leftRotate();
        }, 3000);
        return () => clearInterval(interval);
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(Validation(inputs));
        setLoading(true);
        try {
            if (errors.email === "" && errors.password === "") {
                const body = { email, password };
                const loginUrl = `${Vite_url}${Vite_login}`;
                const response = await fetch(loginUrl, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(body)
                });
                const parseRes = await response.json();
                console.log(parseRes.message);
                if (parseRes.token) {
                    const user = jwtDecode(parseRes.token);
                    localStorage.setItem("user_role", user.user.role);
                    localStorage.setItem("user_email", user.user.email);
                    if (user.user.role === 'admin') {
                        setAuth(true);
                        setRole(true);
                        showToastMessage("success", "Login successfully");
                        localStorage.setItem("token", parseRes.token);
                    } else {
                        setAuth(true);
                        setRole(false);
                        showToastMessage("success", "Login successfully");
                        localStorage.setItem("token", parseRes.token);
                    }
                }
                else {
                    showToastMessage("error", parseRes.message);
    
                    setAuth(false);
                }
            } 
        } catch (error) {
            console.error('Login failed:', error);
            showToastMessage("error", "password or email invalid..!");
        } finally {
            setLoading(false);
        }
    };

    const navigateToHome = () => {
        navigate("/");
    };

    const destroySession = () => {
        localStorage.removeItem("user_role");
        localStorage.removeItem("token");
    };

    const menuItems = [
        { label: 'Home', onClick: navigateToHome },
        { label: 'Logout', onClick: destroySession }
    ];

    return (
        <div className={`login-main ${loading ? 'blur' : ''}`}>
            {loading && (
                <Backdrop open={loading} style={{ zIndex: 9999 }}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            )}
            <div className="login-left">
                <div className="image">
                    <Grid sm={6} lg={6} className="leftContainer" display={{ xs: "none", sm: "block" }}>
                        {image.length > 0 && (
                            <Stack justifyContent={"center"} alignItems="center" sx={{ height: "100%" }}>
                                <div className="carousel">
                                    <div className="left-image">
                                        <div className="left-value">
                                            <img alt="left value" src={image[0].image} width={120} height={120} />
                                        </div>
                                    </div>
                                    <div className="center">
                                        <div className="center-image">
                                            <div className="center-value">
                                                <img alt="center value" src={image[1].image} width={400} height={400} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-image">
                                        <div className="right-value">
                                            <img alt="right-Value" src={image[2].image} width={120} height={120} />
                                        </div>
                                    </div>
                                </div>
                                <div className="image-title">
                                    <div className="title">{image[0].title}</div>
                                </div>
                                <div className="subtitle">{image[0].subtitle}</div>
                                <div className="carosel-slider-group">
                                    <div className="carosel-slider-btn" onClick={leftRotate}></div>
                                    <div className="carosel-slider-btn" onClick={rightRotate}></div>
                                </div>
                            </Stack>
                        )}
                    </Grid>
                </div>
            </div>
            <div className="login-right">
                <div className="login-right-container">
                    <div className="menu">
                        <PageHeading anchorEl={anchorEl} handleMenu={handleMenu} handleClose={handleClose} menuItems={menuItems} />
                    </div>
                    <div className="login-logo">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="head">
                        <h1>MCA Smart Learn</h1>
                        <p>Ease of access is our priority. With just a few clicks, you can log in and access your account in no time</p>
                    </div>
                    <div className="login-center">
                        <form onSubmit={handleSubmit}>
                            <div className="input-name" style={{ fontSize: "14px" }}>
                                <input type="email" name="email" placeholder="Email" value={email} onChange={e => { onChange(e) }} />
                                {errors.email && <span className="error"> {errors.email}</span>}
                            </div>
                            <div className="pass-input-div" style={{ fontSize: "14px" }}>
                                <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={e => { onChange(e) }} placeholder="Password" />
                                {showPassword ? <FaEyeSlash onClick={() => { setShowPassword(!showPassword) }} /> : <FaEye onClick={() => { setShowPassword(!showPassword) }} />}
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <div className="login-center-buttons">
                                <center><button type="submit" style={{ width: "30%" }}>Log In</button></center>
                            </div>
                        </form>
                        <div className="para">
                            <p>Don't have an account?</p>
                        </div>
                        <div className="redirect">
                            <a href="/register">register </a>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
