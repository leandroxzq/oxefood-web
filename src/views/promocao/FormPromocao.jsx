import axios from 'axios'
import { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { Link, useLocation } from 'react-router-dom'
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react'
import MenuSistema from '../../MenuSistema'

export default function FormPromocao() {
    const { state } = useLocation()
    const [idPromocao, setIdPromocao] = useState()
    const [titulo, setTitulo] = useState('')
    const [regra, setRegra] = useState('')
    const [valorDesconto, setValorDesconto] = useState('')
    const [dataInicio, setDataInicio] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [promoValida, setPromoValida] = useState(true)

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        if (dataParam.includes('/')) {
            return dataParam
        }

        let arrayData = dataParam.split('-')
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
    }

    function salvar() {
        if (!titulo || !dataInicio || !dataFim) {
            alert('Preencha os campos obrigatórios')
            return
        }

        const valorDescontoNormalizado = Number(
            String(valorDesconto).replace(',', '.')
        )

        let promocaoRequest = {
            titulo: titulo,
            regra: regra,
            valorDesconto: Number.isFinite(valorDescontoNormalizado)
                ? valorDescontoNormalizado
                : 0,
            dataInicio: dataInicio,
            dataFim: dataFim,
            promoValida: promoValida,
        }

        if (idPromocao !== undefined) {
            axios
                .put(
                    'http://localhost:8080/api/promocao/' + idPromocao,
                    promocaoRequest
                )
                .then(() => {
                    alert('Promoção alterada com sucesso!')
                })
                .catch(() => {
                    alert('Erro ao alterar.')
                })
        } else {
            axios
                .post('http://localhost:8080/api/promocao', promocaoRequest)
                .then(() => {
                    alert('Promoção cadastrada com sucesso!')
                })
                .catch(() => {
                    alert('Erro ao incluir.')
                })
        }
    }

    useEffect(() => {
        if (state !== null && state.id !== null) {
            axios
                .get('http://localhost:8080/api/promocao/' + state.id)
                .then((response) => {

                    let p = response.data

                    setIdPromocao(p.id)
                    setTitulo(p.titulo)
                    setRegra(p.regra)
                    setValorDesconto(p.valorDesconto)
                    setDataInicio(formatarData(p.dataInicio))
                    setDataFim(formatarData(p.dataFim))
                    setPromoValida(p.promoValida ?? true)
                })
        }
    }, [state])

    return (
        <div>
            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">

                    {idPromocao === undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Promocao &nbsp;
                                <Icon name="angle double right" size="small" />
                            </span>
                            Cadastro
                        </h2>
                    )}

                    {idPromocao !== undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Promocao &nbsp;
                                <Icon name="angle double right" size="small" />
                            </span>
                            Alteração
                        </h2>
                    )}

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>

                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    fluid
                                    label="Titulo"
                                    maxLength="100"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    label="Regra"
                                    value={regra}
                                    onChange={(e) => setRegra(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    width={6}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    label="Valor Desconto (%)"
                                    value={valorDesconto}
                                    onChange={(e) =>
                                        setValorDesconto(e.target.value)
                                    }
                                />

                                <Form.Field width={6}>
                                    <label>Data Início</label>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/2025"
                                        value={dataInicio}
                                        onChange={(e) =>
                                            setDataInicio(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>

                                <Form.Field width={6}>
                                    <label>Data Fim</label>
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/2025"
                                        value={dataFim}
                                        onChange={(e) =>
                                            setDataFim(e.target.value)
                                        }
                                    >
                                        {() => <input />}
                                    </InputMask>
                                </Form.Field>

                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-promocao'}>
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
