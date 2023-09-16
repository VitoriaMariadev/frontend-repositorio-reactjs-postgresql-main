import './style.css'

import { NavLink} from 'react-router-dom'

import { FaBars,FaTimes,FaUserAlt } from "react-icons/fa";
import {IoIosLogOut} from 'react-icons/io'

import Logo from '../../Images/Logo.png'
import { useEffect, useState } from 'react';
import { api } from '../../Services/API';
import { pegarNomeUsuario, pegarToken, desconectar } from '../../Services/localstorage';
function Header (){

    const [usuario,setUsuario] = useState('')

    const finalizarSessao = async () =>{

        const data ={
            headers:{
                token:pegarToken()
            }
        }

        console.log(data)

        try{

            const res = await api.post('/deletar_token',data)

            if(res.status === 200){
                desconectar()
                window.location.href = '/'
            }

        }catch(err){
            console.log(err)
        }
    }

    const pegarUsuario = async() =>{

        const usuarioPegar = pegarNomeUsuario()


        setUsuario(usuarioPegar)
        console.log(usuario)

        
    }

    useEffect(() =>{
        pegarUsuario()
    },[usuario])


    const [abertoOuFechado, setAbertoOuFechado] = useState(false)
    const [menuMobile, setMenuMobile] = useState('container-navbar-mobile')

    const menu = () =>{

        if(abertoOuFechado === false){
            setAbertoOuFechado(true)
            setMenuMobile('container-navbar-mobile ativo')
        }else{
            setAbertoOuFechado(false)
            setMenuMobile('container-navbar-mobile')
        }
    }

    return ( 
        <header className="container">
            <div className='container-logo'>
                <img src={Logo} alt='logo'/>
            </div>


            <nav className='container-navbar'>
                {/* {usuario && usuario.tipo_de_usuario === 'admin'?( */}
                {usuario != null?(
                    <>

                    <ul>

                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/Obras">Obras</NavLink></li>
                        <li><NavLink to="/Biografia">Biografia</NavLink></li>
                        <li className="opcao-configurar">
                            <a className="configurar-obras" to="#">Configurar obras

                                <ul className='menu-dropdown'>
                                    <li><h3>CONFIGURAÇÕES</h3></li>
                                    <li><NavLink to="/Cadastrar_Obras" >PUBLICAR OBRA</NavLink></li>
                                    <li><NavLink to="/Editar_Obras" >EDITAR OBRA</NavLink></li>
                                    <li><NavLink to="/Deletar_Obras" >DELETAR OBRA</NavLink></li>
                                </ul>

                            </a></li>
                        <li><NavLink to="/Cadastrar_Usuario">Cadastrar Usuario</NavLink></li>
                        <li><NavLink to="/Homenagens">Homenagens</NavLink></li>          
                    </ul>

                    <div className="logout">
                        <div className="logout-icon" onClick={finalizarSessao}> 
                            {<IoIosLogOut/>}
                        </div>
                        
                    </div>
                    </>
                ):(
                    <>

                        <ul>

                            <li><NavLink to="/">Inicio</NavLink></li>
                            <li><NavLink to="/Obras">Obras</NavLink></li>
                            <li><NavLink to="/Biografia">Biografia</NavLink></li>
                            <li><NavLink to="/Homenagens">Homenagens</NavLink></li>
                            <NavLink to="/Login"><FaUserAlt className='container-navbar-usuario'/></NavLink>
                            
                        </ul>
                    </>
                )}
            </nav>
            <nav className={menuMobile}>
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/Obras">Obras</NavLink>
                <NavLink to="/Biografia">Biografia</NavLink>
                <NavLink to="/Homenagens">Homenagens</NavLink>
                <NavLink to="/Login"><FaUserAlt className='container-navbar-usuario'/></NavLink>
            </nav>
            <div className='container-hamburguer' onClick={menu}>
                {abertoOuFechado === false?(
                    <FaBars></FaBars>
                ):(
                    <FaTimes></FaTimes>
                )
                }
            </div>
        </header>
    )
}

export default Header