import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ListIcon from '@mui/icons-material/List';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import DoneIcon from '@mui/icons-material/Done';
import { messages } from '../../components/messagesEnum'
import { react_constants } from '../../components/constants'
import { SnackBarAlert } from '../../components/snackBarAlert'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'

export default function TabelaTraining(){
    const navigate = useNavigate()
    const [trainings, setTrainings] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const [firstArgument, setFirstArgument] = useState("");
    const [secondArgument, setSecondArgument] = useState("");
    const [removerCodigo, setRemoverCodigo] = useState(0);
    const [confirmDialog, setConfirmDialog] = useState(false);

    const newPress = () => {
        navigate('/training/formulario')
    }

    const editPress = (e) => {
        navigate(`/training/formulario/${e}`)
    }

    const seeAllExercises = (e) => {
        navigate(`/training/see-all-exercises/${e.musculoFocal}/${e.codigo}`)
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

    const allTrainings = () => {
        fetch(`${react_constants["local_api"]}/training/listar`)
        .then(retorno => retorno.json())
        .then(retorno_convertido => setTrainings(retorno_convertido))
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
                allTrainings()
                setType("success");
                confirmationCloseDialog()
            }
            setOpenToast(true);
        })
    }

    const closeToast = () => {
        setOpenToast(false);
    }

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 767px)").matches
    )
    
    useEffect(() => {
        window.matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setIsDesktop( e.matches ));
        allTrainings()
    }, []);

    return(        
        <Form>
            <Button variant="primary" onClick={() => newPress()} style={{ margin: "10px 0px", position: "relative", float: "right" }}>
                <AddIcon sx={{ fontSize: 20 }} />
                {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Novo Treino</span>}
            </Button>
            {/* <><p>{JSON.stringify(trainings)}</p></> */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Músculo Focal</th>
                        <th>Ativo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                    {trainings.map((training, indice) => (
                        <tr key={indice}>
                            <td>{indice + 1}</td>
                            <td>{training.musculoFocal}</td>
                            <td>{training.ativo ? "Sim" : "Não"}</td>
                            <td>
                                <ButtonGroup aria-label="">
                                    <Button variant="dark" onClick={() => {seeAllExercises(training)}}>
                                        <ListIcon sx={{ fontSize: 20 }} />
                                        {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Lista Exercícios</span>}
                                    </Button>
                                    <Button variant="warning" onClick={() => {editPress(training.codigo)}}>
                                        <EditIcon sx={{ fontSize: 20 }} />
                                        {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Editar</span>}
                                    </Button>
                                    {training.ativo && (
                                        <Button variant="danger" onClick={() => confirmationDialog(training.codigo, training.ativo)}>
                                            <DeleteIcon sx={{ fontSize: 20 }} />
                                            {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Desativar</span>}
                                        </Button>
                                    )}
                                    {!training.ativo && (
                                        <Button variant="success" onClick={() => confirmationDialog(training.codigo, training.ativo)}>
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
