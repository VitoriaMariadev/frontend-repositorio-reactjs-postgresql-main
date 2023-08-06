import { useState, useEffect } from "react"
import "./style.css"

export const Aviso = (props) => {
    const mensagem = props.mensagem
    const tipoMensagem = props.tipo
    const acao = props.acao
    const [verMensagem, setVerMensagem] = useState(false)

    const fecharMensagem = () => {
        setVerMensagem(false)
    }

    useEffect(() =>{
        if(!mensagem){

            return setVerMensagem(false)
        }
        setVerMensagem(true)

        const tempo = setTimeout(() =>{
            setVerMensagem(false)
        },4000)

        return () => clearTimeout(tempo)

    },[mensagem]
    )

    return(
        <>
        
        {verMensagem&&(
            <div className="aviso-container">
                {tipoMensagem === 'sucesso'?(
                    <h3>{acao} OBRA</h3>
                ):(
                    <h3>ERRO AO CADASTRAR</h3>
                )}
                
                <p>{mensagem}</p>
                <div className="aviso-container-btn">
                    <button onClick={fecharMensagem} >Ok</button>
                </div>
            </div>
        )}
            

        </>
    )

}