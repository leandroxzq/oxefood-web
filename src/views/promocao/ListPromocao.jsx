import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Button,
    Container,
    Divider,
    Header,
    Icon,
    Modal,
    Table,
} from 'semantic-ui-react'
import MenuSistema from '../../MenuSistema'

export default function ListPromocao() {

    const [lista, setLista] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [idRemover, setIdRemover] = useState()
    const [openDetalhesModal, setOpenDetalhesModal] = useState(false)
    const [promocaoSelecionada, setPromocaoSelecionada] = useState()

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function abrirDetalhes(promocao) {
        setPromocaoSelecionada(promocao)
        setOpenDetalhesModal(true)
    }

    function formatarData(data) {
        if (!data) return ''

        if (data.includes('/')) {
            return data
        }

        const partes = data.split('-')
        return `${partes[2]}/${partes[1]}/${partes[0]}`
    }

    useEffect(() => {
        carregarLista()
    }, [])

    function carregarLista() {
        axios.get('http://localhost:8080/api/promocao')
            .then((response) => {
                setLista(response.data)
            })
    }

    async function remover() {
        await axios
            .delete('http://localhost:8080/api/promocao/' + idRemover)
            .then(() => {
                carregarLista()
            })
            .catch(() => {
                console.log('Erro ao remover.')
            })
        setOpenModal(false)
    }

  
    async function togglePromocao(promocao) {
        let request = {
            titulo: promocao.titulo,
            regra: promocao.regra,
            valorDesconto: promocao.valorDesconto,
            dataInicio: formatarData(promocao.dataInicio),
            dataFim: formatarData(promocao.dataFim),
            promoValida: !promocao.promoValida,
        }

        await axios
            .put('http://localhost:8080/api/promocao/' + promocao.id, request)
            .then(() => {
                carregarLista()
            })
            .catch(() => {
                alert('Erro')
            })
    }

    return (
        <div>

         
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                open={openModal}
            >
                <Header icon>
                    <Icon name="trash" />
                    <div style={{ marginTop: '5%' }}>
                        Tem certeza que deseja remover esse registro?
                    </div>
                </Header>
                <Modal.Actions>
                    <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => setOpenModal(false)}
                    >
                        <Icon name="remove" /> Não
                    </Button>
                    <Button color="green" inverted onClick={() => remover()}>
                        <Icon name="checkmark" /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

        
            <Modal
                onClose={() => setOpenDetalhesModal(false)}
                open={openDetalhesModal}
                size="large"
            >
                <Modal.Header>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <p style={{ margin: 0 }}>Detalhes da Promoção</p>
                        <Button
                            color="red"
                            onClick={() => setOpenDetalhesModal(false)}
                        >
                            Fechar
                        </Button>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    {promocaoSelecionada && (
                        <Table celled>
                            <Table.Body>

                                <Table.Row>
                                    <Table.Cell width={4}>Título</Table.Cell>
                                    <Table.Cell>
                                        {promocaoSelecionada.titulo}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>
                                        {formatarData(promocaoSelecionada.dataInicio)}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Data Fim</Table.Cell>
                                    <Table.Cell>
                                        {formatarData(promocaoSelecionada.dataFim)}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Regra</Table.Cell>
                                    <Table.Cell>
                                        {promocaoSelecionada.regra}
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Valor Desconto</Table.Cell>
                                    <Table.Cell>
                                        {promocaoSelecionada.valorDesconto}%
                                    </Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>Promoção Válida</Table.Cell>
                                    <Table.Cell>
                                        {promocaoSelecionada.promoValida ? 'Sim' : 'Não'}
                                    </Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                    )}
                </Modal.Content>
            </Modal>

            <MenuSistema tela={'promocao'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    <h2> Promocao </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label="Novo"
                            circular
                            color="orange"
                            icon="clipboard outline"
                            floated="right"
                            as={Link}
                            to="/form-promocao"
                        />

                        <br />
                        <br />
                        <br />

                        <Table color="orange" sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Título</Table.HeaderCell>
                                    <Table.HeaderCell>Data início</Table.HeaderCell>
                                    <Table.HeaderCell>Data fim</Table.HeaderCell>
                                    <Table.HeaderCell>Promoção valida</Table.HeaderCell>

                                    <Table.HeaderCell textAlign="center">
                                        Acoes
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map((promocao) => (
                                    <Table.Row key={promocao.id}>
                                        <Table.Cell>
                                            {promocao.titulo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {formatarData(promocao.dataInicio)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {formatarData(promocao.dataFim)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {promocao.promoValida ? 'Sim' : 'Não'}
                                        </Table.Cell>

                                        <Table.Cell textAlign="center">

                                    
                                            <Button
                                                inverted
                                                circular
                                                color="green"
                                                icon
                                            >
                                                <Link
                                                    to="/form-promocao"
                                                    state={{ id: promocao.id }}
                                                    style={{ color: 'green' }}
                                                >
                                                    <Icon name="edit" />
                                                </Link>
                                            </Button>

                                     
                                            <Button
                                                inverted
                                                circular
                                                color="red"
                                                icon
                                                onClick={() => confirmaRemover(promocao.id)}
                                            >
                                                <Icon name="trash" />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color="blue"
                                                icon
                                                onClick={() => abrirDetalhes(promocao)}
                                            >
                                                <Icon name="eye" />
                                            </Button>

                                    
                                            <Button
                                                inverted
                                                circular
                                                color={promocao.promoValida ? 'yellow' : 'grey'}
                                                icon
                                                onClick={() => togglePromocao(promocao)}
                                                title="Ativar/Desativar"
                                            >
                                                <Icon name="power" />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
        </div>
    )
}
