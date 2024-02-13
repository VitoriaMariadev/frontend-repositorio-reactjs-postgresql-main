import { useEffect, useState } from "react"
import {AiOutlineSearch} from 'react-icons/ai'
import { Enfeite } from "../../Components/Enfeite"
import { pegarIdUsuario, setarIdUsuario } from "../../Services/localstorage"
import Header from "../../Components/Header"
import "./style.css"
import { api } from "../../Services/API"
import {ImRadioChecked, ImRadioUnchecked} from 'react-icons/im'
import { Aviso } from "../../Components/Aviso"

export const DeletarObras = () => {

    const [pegarIdUsuarioObras, setPegarIdUsuarioObras] = useState('')
    const [ObrasPorUsuario, setPegarObrasPorUsuario] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [idMarcado, setIdMarcado] = useState('')
    const [titulo, setTitulo] = useState('')
    const [obraNaoEncontrada, setObraNaoEncontrada] = useState(false)
    const [tipoMensagem, setTipoMensagem] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [modelMensagem, setModelMensagem] = useState('')

    const pegarObrasPorUsuario = async () => {
        try {

            const res = await api.get("/mostrar_obras_id_usuario/" + pegarIdUsuarioObras)
            if (res.data.status === 400){
                setCarregando(true)
                setObraNaoEncontrada(true)
            }else{
                setCarregando(true)
                setObraNaoEncontrada(false)
                setPegarObrasPorUsuario(res.data)
                
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const marcarObra = (id) => {
        if (id !== idMarcado){
            setIdMarcado(id)
        }else{

            if (idMarcado === ''){
                setIdMarcado(id)
            }else{
                setIdMarcado('')
            }

        }
    }

    const desmarcarObras = () => {
        setIdMarcado('')
    }

    const apagarObraPorId = async () => {
        try {
            console.log(idMarcado)
            const res = await api.delete('/excluir_obra/' + idMarcado)
            if(res.data.status === 400){
                setTipoMensagem('erro')
                setMensagem(res.data.Mensagem)
                setModelMensagem(true)
            }else{
                setModelMensagem(true)
                setTipoMensagem('sucesso')
                setMensagem(res.data.Mensagem)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const pesquisarObra = async () => {
        const data = {
            titulo,
            id_usuario:pegarIdUsuarioObras
        }

        try {
            
            const res = await api.post('/mostrar_obras_com_nome_e_id_usuario', data)
            if (res.data.status ===  400){
                setCarregando(true)
                setObraNaoEncontrada(true)
            }else{
                setCarregando(true)
                setObraNaoEncontrada(false)
                
                setPegarObrasPorUsuario(res.data)


            }

            console.log(res.data)

        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
        const IdUsuario = pegarIdUsuario()
        setPegarIdUsuarioObras(IdUsuario)
        console.log(IdUsuario)
    }, [])

    useEffect(() => {
        pegarObrasPorUsuario()
    }, [pegarIdUsuarioObras, mensagem])

    useEffect(() => {
        pesquisarObra()
    }, [titulo])


    return(
        <>

            <Header/>
            <Enfeite/>
            {modelMensagem&&(
                <Aviso tipo={tipoMensagem} mensagem={mensagem} acao="DELETAR"/>
            )}

            <main className="main-deletar-obras">

                <div className="main-deletar-obras-container">
                    <div className="main-deletar-obras-container-titulo">
                        <h1>DELETAR OBRA</h1>
                    </div>

                    <div className="main-deletar-obras-container-pesquisa">
                        <p>Título da obra</p>
                        <div className="main-deletar-obras-container-pesquisa-input">
                            <div className="main-deletar-obras-container-pesquisa-input-lupa" onClick={pesquisarObra}><AiOutlineSearch/></div>
                            <input type="text" placeholder="Procurar título" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                        </div>
                    </div>
                    <div className="main-deletar-obras-container-obras">

                        
                        {carregando?(

                            obraNaoEncontrada?(
                                <h1>Obra não encontrada</h1>
                            ):(

                                ObrasPorUsuario.map((item, index) => (
                                    <>
                                    {idMarcado === item.id_obra?(
                                        <div className="main-deletar-obras-container-obras-container">
                                        <div className="main-deletar-obras-container-obras-container-check">
                                            <ImRadioChecked onClick={() => marcarObra(item.id_obra)}/>
                                        </div>
    
                                        <div className="main-deletar-obras-container-obras-container-obra">
                                            <h2>{item.titulo}</h2>
                                            <p>{item.resumo}</p>
                                            <h4>{item.usuario}, {item.data_publi.slice(6,10)}</h4>
                                        </div>
                                    </div>
                                    ):(
    
                                        <div className="main-deletar-obras-container-obras-container">
                                            <div className="main-deletar-obras-container-obras-container-check">
                                                <ImRadioUnchecked onClick={() => marcarObra(item.id_obra)}/>
                                            </div>
    
                                            <div className="main-deletar-obras-container-obras-container-obra">
                                                <h2>{item.titulo}</h2>
                                                <p>{item.resumo}</p>
                                                <h4>{item.usuario}, {item.data_publi.slice(6,10)}</h4>
                                            </div>
                                        </div>
    
                                    )}
                                    </>
                                ))
                            )


                        ):(
                            <>
                                <h1>Carregando</h1>
                            </>
                        )}


                    </div>
                    <div className="main-deletar-obras-container-btn">
                        <button className="deletar-cancelar" onClick={desmarcarObras}>Cancelar</button>
                        <button className="deletar-apagar" onClick={apagarObraPorId}>Apagar</button>
                    </div>
                </div>

            </main>
        
        </>
    )
}