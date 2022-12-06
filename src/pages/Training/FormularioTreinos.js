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

const trainingDefault = {
    codigo: 0,
    musculoFocal: "",
    ativo: true
}

function FormularioTraining(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [training, setTraining] = useState(trainingDefault);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (id !== undefined && id !== null) {
            fetch(`${react_constants["local_api"]}/training/buscar/${id}`)
                .then(retorno => retorno.json())
                .then(retorno_convertido => setTraining(retorno_convertido))
        }
    }, [id]);

    const onChangeValue = (e) => {
        setTraining({...training, [e.target.name]:e.target.value})
    }

    const onChangeValueSwitch = (e) => {
        setTraining({...training, [e.target.name]:e.target.checked})
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
        fetch(`${react_constants["local_api"]}/training/${cadastrarAlterar}`,{
            method:metodo,
            body:JSON.stringify(training),
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
        navigate('/training')
    }

    return(
        <FormGroup>
            <Form style={{ padding: '0px 10px' }}>
                <div>
                    <TextField id="musculoFocal" name="musculoFocal" value={training.musculoFocal} label="Nome do Músculo Focal" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }}  />
                </div>
                <br />
                <br />
                <div style={{ marginTop: 30 }}>
                    <FormControlLabel style={{ minWidth: "100%" }} control={<Switch onChange={onChangeValueSwitch} checked={training.ativo} value={training.ativo} name="ativo" />} label="Treino ativo?" />
                </div>
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

export default FormularioTraining;
