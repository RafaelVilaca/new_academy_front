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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../styles.css";

const exerciseDefault = {
    codigo: 0,
    equipamento: "",
    numeroAparelho: 0,
    treinoCodigo: 1,
    ativo: true
}

function FormularioExercicios(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [exercise, setExercise] = useState(exerciseDefault);
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    // const theme = useTheme();

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 767px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setIsDesktop( e.matches ));

        if (id !== undefined && id !== null) {
            fetch(`${react_constants["local_api"]}/exercise/buscar/${id}`)
                .then(retorno => retorno.json())
                .then(retorno_convertido => setExercise(retorno_convertido))
        }

        fetch(`${react_constants["local_api"]}/training/trainingActives`)
            .then(retorno => retorno.json())
            .then(retorno_convertido => (
                setTrainings(retorno_convertido)
            ))
    }, [id]);

    const onChangeValue = (e) => {
        setExercise({...exercise, [e.target.name]:e.target.value})
    }

    const onChangeValueSwitch = (e) => {
        setExercise({...exercise, [e.target.name]:e.target.checked})
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
        fetch(`${react_constants["local_api"]}/exercise/${cadastrarAlterar}`,{
            method:metodo,
            body:JSON.stringify(exercise),
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
        navigate('/exercises')
    }

    const handleChange = (event) => {
        setExercise({...exercise, treinoCodigo:event.target.value})
    };

    return(
        <FormGroup>
            <Form style={{ padding: '0px 10px' }}>
                <div>
                    <TextField id="equipamento" name="equipamento" value={exercise.equipamento} label="Equipamento" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }}  />
                    {isDesktop && ( 
                        <TextField id="numeroAparelho" type={"number"} name="numeroAparelho" value={exercise.numeroAparelho} label="Número do equipamento" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "right" }} /> 
                    )}
                    {!isDesktop && ( 
                        <TextField id="numeroAparelho2" type={"number"} name="numeroAparelho" value={exercise.numeroAparelho} label="Número do equipamento" variant="standard" onChange={onChangeValue} style={{ minWidth: 350, float: "left" }} /> 
                    ) }
                </div>
                <br />
                <br />
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Músculo Focal</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={exercise.treinoCodigo}
                            onChange={handleChange}
                            input={<OutlinedInput label="Músculo Focal" />}
                        >
                        {trainings.map((training,indice) => (
                            <MenuItem
                                key={training + indice}
                                name={training.musculoFocal}
                                value={training.codigo}
                            >
                                {training.musculoFocal}
                            </MenuItem>
                        ))}
                        </Select> 
                    </FormControl>
                </div>
                <div style={{ marginTop: 30 }}>
                    <FormControlLabel style={{ minWidth: "100%" }} control={<Switch onChange={onChangeValueSwitch} checked={exercise.ativo} value={exercise.ativo} name="ativo" />} label="Treino ativo?" />
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

export default FormularioExercicios;
