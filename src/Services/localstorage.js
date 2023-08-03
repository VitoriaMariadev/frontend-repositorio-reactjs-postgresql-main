//Dados que vão ser armazenado após o login
export const TOKEN_CHAVE = '&app-token';
export const ID_USUARIO = '&id-usuario';
export const NOME_USUARIO = '&nome-usuario';
export const TIPO_USUARIO = '&status';


export const loginToken = token => { localStorage.setItem(TOKEN_CHAVE,token); }
export const desconectar = () => { localStorage.clear() };

export const setarIdUsuario = id => localStorage.setItem(ID_USUARIO,id);
export const pegarIdUsuario = () => localStorage.getItem(ID_USUARIO);

export const setarTipoUsuario = tipo => localStorage.setItem(TIPO_USUARIO,tipo);
export const pegarTipoUsuario = () => localStorage.getItem(TIPO_USUARIO);

export const setarNomeUsuario = nome => localStorage.setItem(NOME_USUARIO,nome);
export const pegarNomeUsuario = () => localStorage.getItem(NOME_USUARIO);

export const pegarToken = () => localStorage.getItem(TOKEN_CHAVE)