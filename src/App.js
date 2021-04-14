/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import styled from '@emotion/styled/macro';
import { uiColors } from '@leafygreen-ui/palette'
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SearchPage from './components/SearchPage';

import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';

const header = (
  <div>
    <strong>Polymorphism</strong>
    <br />
    <small>(content header)</small>
  </div>
);

const globalStyles = css`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Akzidenz", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${uiColors.black};
    background-color: ${uiColors.gray.light3};
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  .grid-container {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
  }

  .content {
  overflow-x: hidden;
  overflow-y: scroll;
  }
`;

const Header = styled.header`
  background-color: ${uiColors.white};
  border-bottom: 1px solid ${uiColors.gray.light2};
  overflow: hidden;
`;

const Title = styled.h1`
  font-weight: bold;
  color: ${uiColors.green.base};
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
`;

const ListItem = styled.li`
  & + & {
    margin-left: 24px;
  }
`;

const Navigation = styled.nav`
  margin-top: 36px;
`;

const Container = styled.section`
  width: 100%;
  max-width: 850px;
  padding-left: 12px;
  padding-right: 12px;
  margin: auto;
`;

const navigationLinkStyles = css`
  transition: color 0.5s ease-out;
  color: ${uiColors.gray.dark1};
  text-decoration: none;

  &:hover {
    color: ${uiColors.green.base};
  }

  &.active {
    color: ${uiColors.green.base};
    border-bottom: 2px solid currentColor;
  }
`;

const NavigationLink = (props) => <NavLink {...props} css={navigationLinkStyles} />;

function App() {


  return (
    <Router>
      <div className="App">
        <Global styles={globalStyles} />

        <Header>
          <Container>
            <Title>@leafygreen-ui starter-kit!</Title>

            <Navigation>
              <List>
                <ListItem>
                  <NavigationLink exact to="/">Home</NavigationLink>
                </ListItem>
                <ListItem>
                  <NavigationLink exact to="/about">About</NavigationLink>
                </ListItem>
              </List>
            </Navigation>
          </Container>
        </Header>


        <div className="grid-container">
            <SideNav>
                <SideNavGroup header="Playbook">
                    <SideNavItem active>Active State</SideNavItem>
                    <SideNavItem disabled>Disabled State</SideNavItem>
                </SideNavGroup>

                <SideNavGroup header={header}>
                    <SideNavItem>Default root element (button)</SideNavItem>
                    <SideNavItem href="/">Anchor root element</SideNavItem>
                    <SideNavItem as="label" htmlFor="docs-input">
                        Custom root element (label)
                    <input
                      id="docs-input"
                      type="text"
                      value=""
                      placeholder="placeholder text"
                      disabled
                    />
                  </SideNavItem>
                </SideNavGroup>
            </SideNav>

            <div className="content">
                <Container css={css`margin-top: 48px;`}>
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/about" component={AboutPage} />
                  </Switch>
                </Container>
            </div>
        </div>

      </div>
    </Router>
  );
}

export default App;
