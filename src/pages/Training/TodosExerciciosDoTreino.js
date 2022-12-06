import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DoneIcon from '@mui/icons-material/Done';
import { react_constants } from '../../components/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackBarAlert } from '../../components/snackBarAlert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConfirmationDialog } from '../../components/ConfirmationDialog';
import { messages } from '../../components/messagesEnum';
import "../styles.css";

function TodosExerciciosDoTreino(){
    const navigate = useNavigate();
    const { treino, id } = useParams();
    const [exercisesOfTraining, setExercisesOfTraining] = useState([]);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [firstArgument, setFirstArgument] = useState("");
    const [secondArgument, setSecondArgument] = useState("");
    const [removerCodigo, setRemoverCodigo] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    
    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 767px)").matches
    )

    const allExercises = () => {
        fetch(`${react_constants["local_api"]}/see-all-exercises-of-training/${id}`)
        .then(retorno => retorno.json())
        .then(retorno_convertido => setExercisesOfTraining(retorno_convertido))
    }
    
    useEffect(() => {
        window.matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setIsDesktop( e.matches ));
        allExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBack = () => {
        navigate('/training')
    }

    const confirmationDialog = (e, ativo) => {
        if (ativo) {
            setFirstArgument("ativar")
            setSecondArgument("desativar")
        } else {
            setFirstArgument("desativar")
            setSecondArgument("ativar")
        }
        setRemoverCodigo(e)
        setConfirmDialog(true)
    }

    const confirmationCloseDialog = () => {
        setRemoverCodigo(0)
        setConfirmDialog(false)
    }

    const deletePress = () => {
        fetch(`${react_constants["local_api"]}/training/desativarAtivar/${removerCodigo}`,{
            method:"put",
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
                allExercises()
                setType("success");
                confirmationCloseDialog()
            }
            setOpenToast(true);
        })
    }

    const closeToast = () => {
        setOpenToast(false);
    }

    return(
        <Form>
            <strong style={{ fontSize: "larger" }}>{treino}</strong>
            <Button variant="danger" onClick={handleBack} style={{ margin: "10px 0px", position: "relative", float: "right" }}>
                <ArrowBackIcon sx={{ fontSize: 20 }} />
                {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Voltar</span>}
            </Button>
            {/* <><p>{JSON.stringify(trainings)}</p></> */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Equipamento</th>
                        <th>Número do Aparelho</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                    {exercisesOfTraining.map((exercise, indice) => (
                        <tr key={indice}>
                            <td>{indice + 1}</td>
                            <td>{exercise.equipamento}</td>
                            <td>{exercise.numeroAparelho}</td>
                            <td>{exercise.ativo ? "Sim" : "Não"}</td>
                            <td>
                                <ButtonGroup aria-label="">
                                    {exercise.ativo && (
                                        <Button variant="danger" onClick={() => confirmationDialog(exercise.codigo, exercise.ativo)}>
                                            <DeleteIcon sx={{ fontSize: 20 }} />
                                            {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Desativar</span>}
                                        </Button>
                                    )}
                                    {!exercise.ativo && (
                                        <Button variant="success" onClick={() => confirmationDialog(exercise.codigo, exercise.ativo)}>
                                            <DoneIcon sx={{ fontSize: 20 }} />
                                            {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Ativar</span>}
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}                    
                </tbody>
            </Table>
            <ConfirmationDialog 
                open={confirmDialog}
                firstArgument={firstArgument}
                secondArgument={secondArgument}
                confirmation={() => {deletePress()}} 
                onClose={() => {confirmationCloseDialog()}}
                title={'treino'}
            />
            <SnackBarAlert open={openToast} type={type} message={message} handleClose={() => {closeToast()}} />  
        </Form>
    )
}

export default TodosExerciciosDoTreino;
