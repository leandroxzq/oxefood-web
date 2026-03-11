import axios from "axios";
import { useState } from "react";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';


export default function FormCliente () {

    const [nome, setNome] = useState();
   const [cpf, setCpf] = useState();
   const [dataNascimento, setDataNascimento] = useState();
   const [foneCelular, setFoneCelular] = useState();
   const [foneFixo, setFoneFixo] = useState();

   function salvar() {

		let clienteRequest = {
		     nome: nome,
		     cpf: cpf,
		     dataNascimento: dataNascimento,
		     foneCelular: foneCelular,
		     foneFixo: foneFixo
		}
	
		axios.post("http://localhost:8080/api/cliente", clienteRequest)
		.then((response) => {
		     console.log('Cliente cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o um cliente.')
		})
	}



    return (

        <div>
            <MenuSistema tela={'cliente'} />

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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

    <Form.Field required width={8}>
      <label>CPF</label>
      <InputMask
        mask="999.999.999-99"
        value={cpf || ''}
        onChange={e => setCpf(e.target.value)}
      >
        {() => <input />}
      </InputMask>
    </Form.Field>

  </Form.Group>
  
  <Form.Group>

    <Form.Field width={6}>
      <label>Fone Celular</label>
      <InputMask
        mask="(99) 99999-9999"
        value={foneCelular || ''}
        onChange={e => setFoneCelular(e.target.value)}
      >
        {() => <input />}
      </InputMask>
    </Form.Field>

    <Form.Field width={6}>
      <label>Fone Fixo</label>
      <InputMask
        mask="(99) 9999-9999"
        value={foneFixo || ''}
        onChange={e => setFoneFixo(e.target.value)}
      >
        {() => <input />}
      </InputMask>
    </Form.Field>

    <Form.Field width={6}>
      <label>Data Nascimento</label>
      <InputMask
        mask="99/99/9999"
        maskChar={null}
        placeholder="Ex: 20/03/1985"
        value={dataNascimento || ''}
        onChange={e => setDataNascimento(e.target.value)}
      >
        {() => <input />}
      </InputMask>
    </Form.Field>

  </Form.Group>

</Form>
                        
                        <div style={{marginTop: '4%'}}>

                            <Link to={'/list-cliente'}>
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
