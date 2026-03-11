import { Link, useLocation } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'

export default function NavBar() {
    const location = useLocation()

    return (
        <Menu inverted color="orange" size="large">
            <Container>
                <Menu.Item
                    as={Link}
                    to="/"
                    header
                    active={location.pathname === '/'}
                >
                    OxeFood
                </Menu.Item>

                <Menu.Item
                    as={Link}
                    to="/cliente"
                    name="Cliente"
                    active={location.pathname === '/cliente'}
                />

                <Menu.Item
                    as={Link}
                    to="/produto"
                    name="Produto"
                    active={location.pathname === '/produto'}
                />

                <Menu.Item
                    as={Link}
                    to="/entregador"
                    name="Entregador"
                    active={location.pathname === '/entregador'}
                />
            </Container>
        </Menu>
    )
}
