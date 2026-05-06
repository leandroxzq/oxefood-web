import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    Button,
    Container,
    Divider,
    Form,
    Icon,
    TextArea,
} from 'semantic-ui-react'
import MenuSistema from '../../MenuSistema'

export default function FormProduto() {
    const { state } = useLocation()
    const [idProduto, setIdProduto] = useState()
    const [codigo, setCodigo] = useState()
    const [titulo, setTitulo] = useState()
    const [descricao, setDescricao] = useState()
    const [valorUnitario, setValorUnitario] = useState()
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState()
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState()
    const [idCategoria, setIdCategoria] = useState()
    const [listaCategoriaProduto, setListaCategoriaProduto] = useState([])

    function salvar() {
        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo,
            idCategoria: idCategoria || null,
        }

        if (idProduto != null) {
            axios
                .put(
                    'http://localhost:8080/api/produto/' + idProduto,
                    produtoRequest
                )
                .then((response) => {
                    console.log('Produto alterado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao alterar um produto.')
                })
        } else {
            axios
                .post('http://localhost:8080/api/produto', produtoRequest)
                .then((response) => {
                    console.log('Produto cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log('Erro ao incluir o produto.')
                })
        }
    }

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/categoriaproduto')
            .then((response) => {
                const dropDownCategorias = []
                dropDownCategorias.push({ text: '', value: '' })
                response.data.forEach((c) =>
                    dropDownCategorias.push({ text: c.descricao, value: c.id })
                )

                setListaCategoriaProduto(dropDownCategorias)
            })

        if (state != null && state.id != null) {
            axios
                .get('http://localhost:8080/api/produto/' + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setCodigo(response.data.codigo)
                    setTitulo(response.data.titulo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(response.data.valorUnitario)
                    setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                    setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
                    setIdCategoria(response.data.categoria?.id || '')
                })
        }
    }, [state])

    return (
        <div>
            <MenuSistema tela={'produto'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    {idProduto === undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Produto &nbsp;
                                <Icon name="angle double right" size="small" />
                            </span>{' '}
                            Cadastro
                        </h2>
                    )}
                    {idProduto !== undefined && (
                        <h2>
                            <span style={{ color: 'darkgray' }}>
                                Produto &nbsp;
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
                                    label="Codigo"
                                    maxLength="100"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label="Titulo"
                                    maxLength="100"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    label="Valor Unitario"
                                    value={valorUnitario}
                                    onChange={(e) =>
                                        setValorUnitario(e.target.value)
                                    }
                                />

                                <Form.Select
                                    required
                                    fluid
                                    label="Categoria"
                                    options={listaCategoriaProduto}
                                    value={idCategoria}
                                    onChange={(e, { value }) =>
                                        setIdCategoria(value)
                                    }
                                />
                            </Form.Group>

                            <Form.Group widths="equal">
                                <Form.Input
                                    required
                                    fluid
                                    type="number"
                                    min="0"
                                    label="Tempo Entrega Minimo"
                                    value={tempoEntregaMinimo}
                                    onChange={(e) =>
                                        setTempoEntregaMinimo(e.target.value)
                                    }
                                />

                                <Form.Input
                                    required
                                    fluid
                                    type="number"
                                    min="0"
                                    label="Tempo Entrega Maximo"
                                    value={tempoEntregaMaximo}
                                    onChange={(e) =>
                                        setTempoEntregaMaximo(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Form.Field
                                control={TextArea}
                                label="Descricao"
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                            />
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-produto'}>
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
