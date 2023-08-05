import {AiOutlineSearch} from 'react-icons/ai'
import './style.css'
import { api } from '../../Services/API'
import { useState, useEffect, useRef } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../../Components/Header';


export const Obras = () => {
    
    const containerPesquisaObras = useRef(null)
    const [ Obras, setObras] = useState()
    const [Carregando, setCarregando] = useState(false)
    const [titulo,setTitulo] = useState('')
    const [encontrado, setEncontrado] = useState(true)

    const pegarObras = async () => {
        try {
            
            const res = await api.get("/mostrar_todas_obras")
            setObras(res.data)
            console.log(res.data)
            setCarregando(true)
        }
        catch (erro){
            console.log(erro)
        }
    }

    const pesquisarObra = async () =>{

        try{

            const res = await api.post("/pesquisar_nome_obra", {titulo})
            if (res.data.mensagem === 'Obra(s) não encontrado(s)') {
                setEncontrado(false)
                
              } else {
                setObras(res.data)
                setEncontrado(true)
                window.scrollTo(0,0)
              }

            
            

        }catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        pegarObras()
    }, 
    [])

    useEffect(() =>{

        containerPesquisaObras.current?.scrollIntoView({behavior: "smooth"})
    })
    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
   
    }, [titulo])
    const detectKeyDown = (e) => {
        if (e.key === 'Enter'){
            pesquisarObra()
        }
    }

    useEffect(() => {
        pesquisarObra()
    }, [titulo])
    
    return (
        <>
            
        
        </>
    )
}