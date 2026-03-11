import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, TextArea } from 'semantic-ui-react';

export default function FormProduto () {

    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();

    function salvar() {

        let produtoRequest = {
            nome: nome,
            descricao: descricao,
            valorUnitario: valorUnitario
        }

        axios.post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
            console.log('Produto cadastrado com sucesso.')
        })
        .catch((error) => {
            console.log('Erro ao incluir um produto.')
        })
    }

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    type='number'
                                    step='0.01'
                                    min='0'
                                    label='Valor Unitario'
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Field
                                control={TextArea}
                                label='Descricao'
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                            />

                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => navigate('/')}
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>
                    
                </Container>
            </div>
        </div>

    );

}
