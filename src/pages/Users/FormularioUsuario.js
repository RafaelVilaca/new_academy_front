import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Button from 'react-bootstrap/Button';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { react_constants } from '../../components/constants'
import { messages } from '../../components/messagesEnum'
import { useNavigate, useParams } from 'react-router-dom'
import { SnackBarAlert } from '../../components/snackBarAlert'
import "../styles.css"

const userDefault = {
    codigo: 0,
    nome: "",
    documento: "",
    login: "",
    senha: "",
    funcionario: false,
    ativo: true
}

function Formulario(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState(userDefault);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [funcionario, setFuncionario] = useState(false);
    
    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 767px)").matches
    )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setIsDesktop( e.matches ));
    
        if (id !== undefined && id !== null) {
            fetch(`${react_constants["local_api"]}/user/buscar/${id}`)
                .then(retorno => retorno.json())
                .then(retorno_convertido => setUser(retorno_convertido))
        }

        setFuncionario(localStorage.getItem("funcionario"))
    }, [id]);

    const onChangeValue = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const onChangeValueSwitch = (e) => {
        setUser({...user, [e.target.name]:e.target.checked})
    }

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = () => {
        let cadastrarAlterar = "";
        let metodo = "";
        if (id !== undefined && id !== null) {
            cadastrarAlterar = "alterar";
            metodo = "put";
        } else {
            cadastrarAlterar = "cadastrar";
            metodo = "post";
        }
        fetch(`${react_constants["local_api"]}/user/${cadastrarAlterar}`,{
            method:metodo,
            body:JSON.stringify(user),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            if (retorno_convertido.message !== undefined) {
                setMessage(retorno_convertido.message);
                setType("error");
            } else {
                setMessage(messages["succesToSave"]);
                setType("success");
                handleCancel()
            }
            setOpen(true);
        })
    }
    
    const handleCancel = () => {
        if(funcionario === "true")
            navigate('/users')
        else
            navigate('/home')
    }

    return(
        <FormGroup>
            <Form style={{ padding: '0px 10px' }}>
                <div>
                    <TextField id="nome" name="nome" value={user.nome} label="Nome do usuário" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }}  />
                    {isDesktop && ( 
                        <TextField id="documento"  name="documento" value={user.documento} label="Documento do usuário" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "right" }} /> 
                    )}
                    {!isDesktop && ( 
                        <TextField id="documento2"  name="documento" value={user.documento} label="Documento do usuário" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }} /> 
                    ) }
                </div>
                <br />
                <br />
                <div>
                    <TextField name="login" value={user.login} id="login" label="Login" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }} />
                    {isDesktop && ( <TextField name="senha" value={user.senha} id="password" label="Senha" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "right" }} /> )}
                    {!isDesktop && ( <TextField name="senha" value={user.senha} id="password2" label="Senha" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left", marginBottom: 10 }} /> ) }
                </div>
                {funcionario === "true" && (
                    <div style={{ marginTop: 30 }}>
                        <FormControlLabel style={{ minWidth: "100%" }} control={<Switch onChange={onChangeValueSwitch} checked={user.funcionario} value={user.funcionario} name="funcionario" />} label="Usuário é funcionário?" />
                        <FormControlLabel style={{ minWidth: "100%" }} control={<Switch onChange={onChangeValueSwitch} checked={user.ativo} value={user.ativo} name="ativo" />} label="Usuário ativo?" />
                    </div>
                )}
                <br />
                <br />
                <div style={{ marginTop: 10 }}>
                    <div className="d-grid gap-2" style={{ maxWidth: 150, float: "left" }}>
                        <Button id="save" variant="success" style={{ minWidth: 120 }} onClick={handleSubmit}>
                            <DoneIcon fontSize="small" />
                            <span style={{ fontSize: "smaller", fontWeight: "bold" }}>Salvar</span>
                        </Button>
                    </div>
                    <div className="d-grid gap-2" style={{ maxWidth: 150, float: "right" }}>
                        <Button id="cancel" variant="danger" style={{ minWidth: 120 }} onClick={handleCancel}>
                            <ClearIcon fontSize="small" />
                            <span style={{ fontSize: "smaller", fontWeight: "bold" }}>Cancelar</span>
                        </Button>
                    </div>
                </div>
            </Form>
            <SnackBarAlert open={open} type={type} message={message} handleClose={handleClose} />            
        </FormGroup>
    )
}

export default Formulario;
