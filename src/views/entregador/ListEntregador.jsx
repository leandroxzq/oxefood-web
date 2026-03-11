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

export default function ListEntregador() {
    const [lista, setLista] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [idRemover, setIdRemover] = useState()
    const [openDetalhesModal, setOpenDetalhesModal] = useState(false)
    const [entregadorSelecionado, setEntregadorSelecionado] = useState()

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    function abrirDetalhes(entregador) {
        setEntregadorSelecionado(entregador)
        setOpenDetalhesModal(true)
    }

    useEffect(() => {
        carregarLista()
    }, [])

    function carregarLista() {
        axios.get('http://localhost:8080/api/entregador').then((response) => {
            setLista(response.data)
        })
    }

    async function remover() {
        await axios
            .delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {
                console.log('Entregador removido com sucesso.')

                axios
                    .get('http://localhost:8080/api/entregador')
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }

    return (
        <div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
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
                        <p style={{ margin: 0 }}>Detalhes do Entregador</p>
                        <Button
                            color="red"
                            onClick={() => setOpenDetalhesModal(false)}
                        >
                            Fechar
                        </Button>
                    </div>
                </Modal.Header>

                <Modal.Content>
                    {entregadorSelecionado && (
                        <Table celled>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={4}>Nome</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.nome}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>CPF</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.cpf}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>RG</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.rg}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Data Nascimento</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.dataNascimento}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Fone Celular</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.foneCelular}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Fone Fixo</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.foneFixo}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Qtd Entregas</Table.Cell>
                                    <Table.Cell>
                                        {
                                            entregadorSelecionado.qtdEntregasRealizadas
                                        }
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Valor Frete</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.valorFrete}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco Rua</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoRua}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Endereco Complemento
                                    </Table.Cell>
                                    <Table.Cell>
                                        {
                                            entregadorSelecionado.enderecoComplemento
                                        }
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco Numero</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoNumero}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco Bairro</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoBairro}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco Cidade</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoCidade}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco CEP</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoCep}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Endereco UF</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.enderecoUf}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Ativo</Table.Cell>
                                    <Table.Cell>
                                        {entregadorSelecionado.ativo
                                            ? 'Sim'
                                            : 'Nao'}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    )}
                </Modal.Content>
            </Modal>

            <MenuSistema tela={'entregador'} />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label="Novo"
                            circular
                            color="orange"
                            icon="clipboard outline"
                            floated="right"
                            as={Link}
                            to="/form-entregador"
                        />

                        <br />
                        <br />
                        <br />

                        <Table color="orange" sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Fone Celular
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Qtd Entregas
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Valor Frete
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>Ativo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">
                                        Acoes
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {lista.map((entregador) => (
                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>
                                            {entregador.nome}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.cpf}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.enderecoCidade}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.foneCelular}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.qtdEntregasRealizadas}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.valorFrete}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {entregador.ativo ? 'Sim' : 'Nao'}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                inverted
                                                circular
                                                color="green"
                                                title="Clique aqui para editar os dados deste entregador"
                                                icon
                                            >
                                                <Link
                                                    to="/form-entregador"
                                                    state={{
                                                        id: entregador.id,
                                                    }}
                                                    style={{ color: 'green' }}
                                                >
                                                    <Icon name="edit" />
                                                </Link>
                                            </Button>{' '}
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color="red"
                                                title="Clique aqui para remover este entregador"
                                                icon
                                                onClick={(e) =>
                                                    confirmaRemover(
                                                        entregador.id
                                                    )
                                                }
                                            >
                                                <Icon name="trash" />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color="blue"
                                                title="Clique aqui para visualizar os dados deste entregador"
                                                icon
                                                onClick={() =>
                                                    abrirDetalhes(entregador)
                                                }
                                            >
                                                <Icon name="eye" />
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
