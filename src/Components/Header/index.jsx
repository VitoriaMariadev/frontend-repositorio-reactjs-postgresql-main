import './style.css'

import { NavLink} from 'react-router-dom'

import { FaBars,FaTimes,FaUserAlt } from "react-icons/fa";


import Logo from '../../Images/Logo.png'
import { useEffect, useState } from 'react';
import { api } from '../../Services/API';
import { pegarNomeUsuario } from '../../Services/localstorage';
function Header (){

    const [usuario,setUsuario] = useState('')

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

                        <il><NavLink to="/">Inicio</NavLink></il>
                        <il><NavLink to="/Obras">Obras</NavLink></il>
                        <il><NavLink to="/Biografia">Biografia</NavLink></il>
                        <il className="opcao-configurar">
                            <a className="configurar-obras" to="#">Configurar obras

                                <ul className='menu-dropdown'>
                                    <il><h3>CONFIGURAÇÕES</h3></il>
                                    <il><NavLink to="/Cadastrar_Obras" >PUBLICAR OBRA</NavLink></il>
                                    <il><NavLink to="/Editar_Obras" >EDITAR OBRA</NavLink></il>
                                    <il><NavLink to="/Deletar_Obras" >DELETAR OBRA</NavLink></il>
                                </ul>

                            </a></il>
                        <il><NavLink to="/Cadastrar_Usuario">Cadastrar Usuario</NavLink></il>
                        <il><NavLink to="/Homenagens">Homenagens</NavLink></il>
                        
                    </ul>
                    </>
                ):(
                    <>

                        <ul>

                            <il><NavLink to="/">Inicio</NavLink></il>
                            <il><NavLink to="/Obras">Obras</NavLink></il>
                            <il><NavLink to="/Biografia">Biografia</NavLink></il>
                            <il><NavLink to="/Homenagens">Homenagens</NavLink></il>
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