import axios from 'axios'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link, useLocation } from 'react-router-dom'
import {
    Button,
    Checkbox,
    Container,
    Divider,
    Form,
    Icon,
} from 'semantic-ui-react'
import MenuSistema from '../../MenuSistema'

export default function FormEntregador() {
    const { state } = useLocation()
    const [idEntregador, setIdEntregador] = useState()
    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [rg, setRg] = useState()
    const [dataNascimento, setDataNascimento] = useState()
    const [foneCelular, setFoneCelular] = useState()
    const [foneFixo, setFoneFixo] = useState()
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState()
    const [valorFrete, setValorFrete] = useState()
    const [enderecoRua, setEnderecoRua] = useState()
    const [enderecoComplemento, setEnderecoComplemento] = useState()
    const [enderecoNumero, setEnderecoNumero] = useState()
    const [enderecoBairro, setEnderecoBairro] = useState()
    const [enderecoCidade, setEnderecoCidade] = useState()
    const [enderecoCep, setEnderecoCep] = useState()
    const [enderecoUf, setEnderecoUf] = useState()
    const [ativo, setAtivo] = useState(true)

    function salvar() {
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            valorFrete: valorFrete,
            enderecoRua: enderecoRua,
            enderecoComplemento: enderecoComplemento,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            ativo: ativo,
        }

        if (idEntregador != null) {
            axios
                .put(
                    'http://localhost:8080/api/entregador/' + idEntregador,
                    entregadorRequest
                )
                .then((response) => {
                    console.log('Entregador alterado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao alterar um entregador.')
                })
        } else {
            axios
                .post('http://localhost:8080/api/entregador', entregadorRequest)
                .then((response) => {
                    console.log('Entregador cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao incluir um entregador.')
                })
        }
    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-')
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios
                .get('http://localhost:8080/api/entregador/' + state.id)
                .then((response) => {
                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(
                        formatarData(response.data.dataNascimento)
                    )
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQtdEntregasRealizadas(
                        response.data.qtdEntregasRealizadas
                    )
                    setValorFrete(response.data.valorFrete)
                    setEnderecoRua(response.data.enderecoRua)
                    setEnderecoComplemento(response.data.enderecoComplemento)
                    setEnderecoNumero(response.data.enderecoNumero)
                    setEnderecoBairro(response.data.enderecoBairro)
                    setEnderecoCidade(response.data.enderecoCidade)
                    setEnderecoCep(response.data.enderecoCep)
                    setEnderecoUf(response.data.enderecoUf)
                    setAtivo(response.data.ativo)
                })
        }
    }, [state])

    return (
        <div>
            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    {idEntregador === undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Entregador &nbsp;
                                <Icon name="angle double right" size="small" />
                            </span>{' '}
                            Cadastro
                        </h2>
                    )}
                    {idEntregador !== undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Entregador &nbsp;
                                <Icon name="angle double right" size="small" />
                            </span>{' '}
                            Alteracao
                        </h2>
                    )}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    fluid
                                    label="Nome"
                                    maxLength="100"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Form.Field required width={8}>
                                    <label>CPF</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={cpf || ''}
                                        onChange={(e) => setCpf(e.target.value)}
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="RG"
                                    value={rg}
                                    onChange={(e) => setRg(e.target.value)}
                                />

                                <Form.Field width={8}>
                                    <label>Data Nascimento</label>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento || ''}
                                        onChange={(e) =>
                                            setDataNascimento(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Field width={8}>
                                    <label>Fone Celular</label>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={foneCelular || ''}
                                        onChange={(e) =>
                                            setFoneCelular(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>

                                <Form.Field width={8}>
                                    <label>Fone Fixo</label>
                                    <InputMask
                                        mask="(99) 9999-9999"
                                        value={foneFixo || ''}
                                        onChange={(e) =>
                                            setFoneFixo(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    type="number"
                                    min="0"
                                    label="Qtd Entregas Realizadas"
                                    value={qtdEntregasRealizadas}
                                    onChange={(e) =>
                                        setQtdEntregasRealizadas(e.target.value)
                                    }
                                />

                                <Form.Input
                                    fluid
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    label="Valor Frete"
                                    value={valorFrete}
                                    onChange={(e) =>
                                        setValorFrete(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Endereco Rua"
                                    value={enderecoRua}
                                    onChange={(e) =>
                                        setEnderecoRua(e.target.value)
                                    }
                                />

                                <Form.Input
                                    fluid
                                    label="Endereco Complemento"
                                    value={enderecoComplemento}
                                    onChange={(e) =>
                                        setEnderecoComplemento(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Endereco Numero"
                                    value={enderecoNumero}
                                    onChange={(e) =>
                                        setEnderecoNumero(e.target.value)
                                    }
                                />

                                <Form.Input
                                    fluid
                                    label="Endereco Bairro"
                                    value={enderecoBairro}
                                    onChange={(e) =>
                                        setEnderecoBairro(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Endereco Cidade"
                                    value={enderecoCidade}
                                    onChange={(e) =>
                                        setEnderecoCidade(e.target.value)
                                    }
                                />

                                <Form.Field width={8}>
                                    <label>Endereco CEP</label>
                                    <InputMask
                                        mask="99999-999"
                                        value={enderecoCep || ''}
                                        onChange={(e) =>
                                            setEnderecoCep(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Endereco UF"
                                    maxLength="2"
                                    value={enderecoUf}
                                    onChange={(e) =>
                                        setEnderecoUf(e.target.value)
                                    }
                                />

                                <Form.Field
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingTop: '1.8em',
                                    }}
                                >
                                    <Checkbox
                                        label="Ativo"
                                        checked={!!ativo}
                                        onChange={(e, data) =>
                                            setAtivo(data.checked)
                                        }
                                    />
                                </Form.Field>
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-entregador'}>
                                <Button
                                    type="button"
                                    inverted
                                    circular
                                    icon
                                    labelPosition="left"
                                    color="orange"
                                >
                                    <Icon name="reply" />
                                    Voltar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition="left"
                                color="blue"
                                floated="right"
                                onClick={() => salvar()}
                            >
                                <Icon name="save" />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}
