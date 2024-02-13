import { useState } from "react"
import Header from "../../Components/Header"
import { api } from "../../Services/API"
import { loginToken, setarIdUsuario, setarNomeUsuario, setarTipoUsuario } from "../../Services/localstorage"
import './style.css'
import {FaEyeSlash, FaEye, FaUserAlt, FaUserCircle} from 'react-icons/fa'

export const Login = () =>{

    const [verSenha, setVerSenha] = useState(false)
    const [nome, setNome] = useState('')
    const [senha, setSenha] = useState('')

    const mostrarSenha = () => {
        if (verSenha === false){
            setVerSenha(true)
        }else{
            setVerSenha(false)
        }
    }

    const fazerLogin = async() =>{

        const data = {
            nome:nome,
            senha:senha
        }

        try{
            const res = await api.post('/login', data)
            console.log(res.data)
            setarIdUsuario(res.data.usuarioId)
            setarNomeUsuario(res.data.novoUsuario)
            loginToken(res.data.token)
            setarTipoUsuario("admin")
            setNome('')
            setSenha('')
            window.location.href ='/'

        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <Header/>
            <main className="main-logar-usuario">

                <div className="main-logar-usuario-bolinha-um"></div>
                <div className="main-logar-usuario-bolinha-dois"></div>
                <div className="main-logar-usuario-coonteiner">

                    <div className="main-logar-usuario-conteiner-texto">
                        <div className="main-logar-usuario-conteiner-texto-titulo">
                            <h2>Se você deseja criar uma conta, entre em contato com o administrador responsável.</h2>
                        </div>
                        <div className="main-logar-usuario-conteiner-texto-imagem"></div>
                    </div>
                    <div className="main-logar-usuario-conteiner-formulario">
                        <div className="main-logar-usuario-conteiner-formulario-conteiner">
                            <div className="main-logar-usuario-conteiner-formulario-conteiner-login">
                                <h2>Login</h2>
                            </div>

                            <div className="main-logar-usuario-conteiner-formulario-conteiner-conteiner">
                                <FaUserCircle/>
                            </div>

                            <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes">

                                    <p>Nome</p>
                                    <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes-input">
                                        <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes-input-svg"><FaUserAlt/></div>
                                        
                                        <input type="text"  value={nome} onChange={(e) => setNome(e.target.value)}/>
                                    </div>

                                    <p>Senha</p>
                                    <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes-input">

                                        {verSenha === false? (
                                            <>
                                                <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes-input-svg" onClick={mostrarSenha}><FaEyeSlash/></div>
                                            
                                                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                            </>

                                        ): (
                                            <>
                                                <div className="main-logar-usuario-conteiner-formulario-conteiner-informacoes-input-svg" onClick={mostrarSenha}><FaEye/></div>
                                            
                                                <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                            </>
                                        )}
                                        
                                    </div>

                            </div>

                            <div className="main-logar-usuario-conteiner-formulario-conteiner-botao">
                                <button onClick={fazerLogin}>Logar</button>
                            </div>

                            <div className="main-logar-usuario-conteiner-formulario-conteiner-msg">
                                        
                            </div>
    
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}