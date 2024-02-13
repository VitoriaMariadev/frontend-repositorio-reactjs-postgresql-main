import Header from "../../Components/Header"
import {BsTrash3} from 'react-icons/bs'
import {FaEyeSlash, FaEye, FaUserAlt, FaUserCircle} from 'react-icons/fa'
import './style.css'
import { useState, useEffect } from "react"
import { api } from "../../Services/API"
import {Mensagem} from '../../Components/Mensagem'


export const CadastrarUsuario = () => {

    const [verSenha, setVerSenha] = useState(false)
    const [verConfirmaSenha, setVerConfirmaSenha] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [usuariosCadastrados, setUsuariosCadastrados] = useState('')
    const [usuario, setUsuario] = useState('')
    const [tipo_de_usuario, setTipo_de_usuario] = useState('admin')
    const [senha, setSenha] = useState('')
    const [confirmsenha, setConfirmsenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [tipo, setTipo] = useState('')

    const cadastrarUsuarios = async () => {
        const data = {
            nome:usuario,
            senha,
            confirmSenha:confirmsenha
        }

        if (mensagem) {
            setMensagem('')
            setTipo('')
        }
        try{
            const res = await api.post('/cadastro_usuarios', data)
            setUsuario('')
            setSenha('')
            setConfirmsenha('')
            console.log(res.data)

            if (res.data.status === 400) {
                setTipo('erro')
                setMensagem(res.data.Message)
            }   else {
                setTipo('Sucesso')
                setMensagem(res.data.Message)
            }
        }catch(err){
            console.log(err)
        }
    

    }

    const mostraConfirmaSenha = () => {
        if(verConfirmaSenha === false){
            setVerConfirmaSenha(true)
        }else{
            setVerConfirmaSenha(false)
        }
    }

    const mostrarSenha = () => {
        if (verSenha === false){
            setVerSenha(true)
        }else{
            setVerSenha(false)
        }
    }

    const pegarUsuarios = async () => {

        try{
            const res = await api.get("/mostrar_todos_usuarios")
            setCarregando(true)
            setUsuariosCadastrados(res.data)
        }catch(erro){
            console.log(erro)
        }

    }

    const excluirUsuarios = async (id) => {
        try{
            const res = await api.delete('/excluir_usuario/' + id)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        pegarUsuarios()
    }, [usuariosCadastrados])

    return(
        <div>
            <Header/>
            <main className="main-cadastrar-usuario">
                <div className="main-cadastrar-usuario-conteiner">
                    <div className="main-cadastrar-usuario-conteiner-usuarios">
                        <div className="main-cadastrar-usuario-conteiner-usuarios-texto">
                            <h2>Usuários Cadastrados</h2>
                        </div>
                        <div className="main-cadastrar-usuario-conteiner-usuarios-cadastrados">

                            {carregando === true?(
                                <>
                                    {usuariosCadastrados.map((itens, index) => (
                                        <div className="main-cadastrar-usuario-conteiner-usuarios-cadastrados-divisao" key={index}>
                                            <p>{itens.nome}</p>
                                            <div className="main-cadastrar-usuario-conteiner-usuarios-cadastrados-divisao-img" onClick={() => {excluirUsuarios(itens.id_usuario)}}><BsTrash3/></div>
                                        </div>
                                    ))}
                                </>
                            ):(
                                <p>Carregando...</p>
                            )}

                        </div>
                    </div>
                    <div className="main-cadastrar-usuario-conteiner-formulario">
                        <div className="main-cadastrar-usuario-conteiner-formulario-titulo">
                            <h2>Cadastrar Usuário</h2>
                        </div>

                        <div className="main-cadastrar-usuario-conteiner-formulario-img">
                            <FaUserCircle/>
                        </div>

                        <div className="main-cadastrar-usuario-conteiner-formulario-formulario">
                            <p>Nome</p>
                            <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input">

                                <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input-img">
                                    <FaUserAlt/>
                                </div>
                                    <input type="text" value= {usuario}onChange={(e) => setUsuario(e.target.value)}/>

                                
                            </div>
                            

                            <p>Senha</p>
                            <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input">

                                {verSenha === false ?(
                                    <>
                                        <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input-img" onClick={mostrarSenha}>
                                            <FaEyeSlash/>
                                        </div>
                                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                    </>
                                    ):(
                                        <>
                                            <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input-img" onClick={mostrarSenha}>
                                                <FaEye/>
                                            </div>
                                            <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
                                        </>
                                    )}
                                    

                            </div>

                            <p>Confirmar Senha</p>
                            <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input">

                                {verConfirmaSenha === false ?(
                                    <>
                                        <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input-img" onClick={mostraConfirmaSenha}>
                                            <FaEyeSlash/>
                                        </div>
                                        <input type="password" value={confirmsenha} onChange={(e) => setConfirmsenha(e.target.value)}/>
                                    </>
                                    ):(
                                        <>
                                            <div className="main-cadastrar-usuario-conteiner-formulario-formulario-input-img" onClick={mostraConfirmaSenha}>
                                                <FaEye/>
                                            </div>
                                            <input type="text" value={confirmsenha} onChange={(e) => setConfirmsenha(e.target.value)}/>
                                        </>
                                        )}
                            </div>
                        </div>

                        <div className="main-cadastrar-usuario-conteiner-formulario-btn">
                            <button onClick={cadastrarUsuarios}>Cadastrar</button>
                        </div>
                        <div className="main-cadastrar-usuario-conteiner-formulario-msg">
                            {mensagem&&
                                <Mensagem tipo={tipo} msg={mensagem}/>
                            } 
                        </div>


                    </div>
                </div>
            </main>
        </div>
    )
}