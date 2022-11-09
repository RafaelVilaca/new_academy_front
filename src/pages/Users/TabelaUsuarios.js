import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom'
import { react_constants } from '../../components/constants'

export default function TabelaUsuarios(){
    const navigate = useNavigate()
    const handleNewPress = () => {
        navigate('/users/formulario')
    }

    const handleEditPress = (e) => {
        navigate(`/users/formulario/${e}`)
    }

    const handleDeletePress = (e) => {
        console.log(e)
        navigate('/users/formulario')
    }

    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia("(min-width: 767px)").matches
    )
    
    useEffect(() => {
        window
        .matchMedia("(min-width: 767px)")
        .addEventListener('change', e => setIsDesktop( e.matches ));

        fetch(`${react_constants["local_api"]}/user/listar`)
        .then(retorno => retorno.json())
        .then(retorno_convertido => setUsers(retorno_convertido))
    }, []);

    const [users, setUsers] = useState([]);

    return(        
        <Form>
            <Button variant="primary" onClick={handleNewPress} style={{ margin: "10px 0px", position: "relative", float: "right" }}>
                <AddIcon sx={{ fontSize: 20 }} />
                {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Novo Usuário</span>}
            </Button>
            {/* <><p>{JSON.stringify(users)}</p></> */}
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Documento</th>
                        <th>Login</th>
                        <th>Funcionário?</th>
                        <th>Ativo?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody style={{ verticalAlign: 'middle' }}>
                    {users.map((user, indice) => (
                        <tr key={indice}>
                            <td>{indice + 1}</td>
                            <td>{user.nome}</td>
                            <td>{user.documento}</td>
                            <td>{user.login}</td>
                            <td>{user.funcionario ? "Sim" : "Não"}</td>
                            <td>{user.ativo ? "Sim" : "Não"}</td>
                            <td>
                                <ButtonGroup aria-label="">
                                    <Button variant="warning" onClick={() => {handleEditPress(user.codigo)}}>
                                        <EditIcon sx={{ fontSize: 20 }} />
                                        {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Editar</span>}
                                    </Button>
                                    <Button variant="danger" onClick={handleDeletePress}>
                                        <DeleteIcon sx={{ fontSize: 20 }} />
                                        {isDesktop && <span style={{ paddingTop: "1px" }}>&nbsp;Deletar</span>}
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}                    
                </tbody>
            </Table>
        </Form>
    )
}
