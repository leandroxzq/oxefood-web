import axios from "axios";
import { useState } from "react";
import InputMask from 'react-input-mask';
import { useNavigate } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormEntregador () {

    const navigate = useNavigate();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
            console.log('Entregador cadastrado com sucesso.')
        })
        .catch((error) => {
            console.log('Erro ao incluir um entregador.')
        })
    }

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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
                                    label='CPF'
                                    as={InputMask}
                                    mask="999.999.999-99"
                                    value={cpf}
                                    onChange={e => setCpf(e.target.value)}
                                />

                            </Form.Group>
  
                            <Form.Group widths='equal'>

                                <Form.Input
                                    fluid
                                    label='RG'
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    as={InputMask}
                                    mask="99/99/9999"
                                    maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                />

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={8}
                                    as={InputMask}
                                    mask="(99) 99999-9999"
                                    value={foneCelular}
                                    onChange={e => setFoneCelular(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={8}
                                    as={InputMask}
                                    mask="(99) 9999-9999"
                                    value={foneFixo}
                                    onChange={e => setFoneFixo(e.target.value)}
                                />

                            </Form.Group>

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
