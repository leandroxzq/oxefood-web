import axios from "axios";
import { useState } from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormEntregador () {

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
            <MenuSistema tela={'entregador'} />

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

                            <Link to={'/'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>
                                
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
