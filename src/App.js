/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import styled from '@emotion/styled/macro';
import { uiColors } from '@leafygreen-ui/palette'
import { spacing } from '@leafygreen-ui/tokens';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SearchPage from './components/SearchPage';
import AtlasStatus from './components/atlasstatus';

import { Logo, LogoMark } from '@leafygreen-ui/logo';
import { CollapsedSideNavItem, SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import { Label, Link, Body  } from '@leafygreen-ui/typography';


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

// comment out max-width
const Container = styled.section`
  width: 100%;
  xmax-width: 850px;
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
        </Header>


        <div className="grid-container">
            <SideNav aria-label="LeafyGreen Design System"
                     className={css`z-index: 1;`} style={{ marginLeft: spacing[2], marginRight: spacing[2] }}>
                    <Title>
                <LogoMark />
          <span style={{ margin: spacing[2] }}></span>
      <span style={{ color: uiColors.gray.dark3 }}>Hello MongoDB App</span>
                    </Title>
      <CollapsedSideNavItem
        className={css`
          background-color: #09804c;
          // Some CSS trickery to make the item not respect the overall padding in the side navigation.
          // 1px pixel-pushing for aesthetics.
          margin-top: -${spacing[3] + 1}px;
          height: calc(25px + ${spacing[4] * 2}px + ${spacing[3]}px);
        `}
      >
      </CollapsedSideNavItem>
                <SideNavGroup header="Playbook">
                    <SideNavItem active>
                        <div style={{alignItems: 'center'}}>
                        <Label>
                          <span style={{ margin: spacing[2] }}>
                      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iOSIgZmlsbD0iIzVENkM3NCIvPgogIDxwYXRoIGQ9Ik02LjIzMiA3LjM3OEM3LjU5IDcuMzUgNy43MTYgNy4yOTQgOC4yMzQgNy4wN1YxNEgxMC40ODhWNC41MDhIOC43OEM4LjU5OCA0Ljg4NiA4LjQxNiA1LjI1IDcuOCA1LjU3MkM3LjI4MiA1LjgzOCA2LjgwNiA1Ljg4IDYuMjMyIDUuOTIyVjcuMzc4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" class="css-15z1i9v e1kvg3ii3">
                      </img>
                      </span>
                        Check the connection.
                        </Label>
                        <p/>
                        <Body style={{ margin: spacing[2] }}>
                            <p>Now your app is connected with Atlas. Go to your Atlas Cluster Collections tab to edit the data and see updates on the App.</p></Body>
                        <Link style={{ margin: spacing[2] }} href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                    <SideNavItem active>
                        <div style={{alignItems: 'center'}}>
                        <Label>
                          <span style={{ margin: spacing[2] }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iOSIgZmlsbD0iIzVENkM3NCIvPgogIDxwYXRoIGQ9Ik03LjcwMiA4LjAzNkM3LjY3NCA3Ljc0MiA3LjY0NiA3LjM3OCA3LjY0NiA3LjE0QzcuNjQ2IDYuMTQ2IDguMzA0IDUuOTc4IDguNjgyIDUuOTc4QzkuNjQ4IDUuOTc4IDkuNjQ4IDYuOTAyIDkuNjQ4IDcuMjhDOS42NDggOC43NzggOC44MzYgOS41NzYgNy43MTYgMTAuNTU2QzYuNzM2IDExLjM5NiA2LjI0NiAxMS43NzQgNS41MTggMTIuMzQ4VjE0SDEyLjAyOFYxMi4yMDhDMTEuNjM2IDEyLjIwOCA4LjMzMiAxMi4yNjQgOC4zMzIgMTIuMjY0QzExLjEwNCAxMC4xNSAxMiA4Ljg5IDEyIDcuMjM4QzEyIDUuNDA0IDEwLjcyNiA0LjM0IDguNzggNC4zNEM2Ljg5IDQuMzQgNS40NDggNS4zMzQgNS40NDggNy41NzRWNy45MUw3LjcwMiA4LjAzNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=" class="css-15z1i9v e1kvg3ii3">
                      </img>
                      </span>
                        Analyze your data.
                        </Label>
                        <Body style={{ margin: spacing[2] }}>
                            Explore and view your data with an Aggregation Pipeline.
                        </Body>
                        <Link style={{ margin: spacing[2] }} href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>
                    <SideNavItem disabled>
                        <div style={{alignItems: 'center'}}>
                        <Label>
                          <span style={{ margin: spacing[2] }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iOSIgZmlsbD0iIzVENkM3NCIvPgogIDxwYXRoIGQ9Ik03LjgyOCA3LjQwNkM3LjgyOCA3IDcuODI4IDYuMDM0IDguNzk0IDYuMDM0QzkuMjU2IDYuMDM0IDkuODE2IDYuMzQyIDkuODE2IDcuMTEyQzkuODE2IDcuMjEgOS44MTYgOC4yMzIgOC42MjYgOC4yMzJDOC41MTQgOC4yMzIgOC4zMDQgOC4yMTggOC4zMDQgOC4yMThWOS44MjhDOC4zMDQgOS44MjggOC41IDkuODE0IDguNjEyIDkuODE0QzkuMiA5LjgxNCAxMC4wMTIgOS45NTQgMTAuMDEyIDExLjAzMkMxMC4wMTIgMTEuOTE0IDkuNTA4IDEyLjQzMiA4Ljc2NiAxMi40MzJDOC4xMjIgMTIuNDMyIDcuNjA0IDExLjkxNCA3LjYwNCAxMS4wMzJDNy42MDQgMTAuODkyIDcuNjE4IDEwLjYyNiA3LjYxOCAxMC42MjZMNS40MzQgMTAuODA4VjExLjAxOEM1LjQzNCAxMi45MDggNi41NjggMTQuMTY4IDguNjY4IDE0LjE2OEMxMS42NzggMTQuMTY4IDEyLjI2NiAxMi4wNjggMTIuMjY2IDExLjE3MkMxMi4yNjYgMTAuMDggMTEuNjUgOS4yMTIgMTAuNDYgOS4wMDJDMTEuMzQyIDguNjk0IDEyLjAyOCA4LjA3OCAxMi4wMjggNi44ODhDMTIuMDI4IDUuOTc4IDExLjQ5NiA0LjM0IDguOTM0IDQuMzRDNy40MDggNC4zNCA1Ljg0IDQuOTI4IDUuNjE2IDcuMjFMNy44MjggNy40MDZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" class="css-15z1i9v e1kvg3ii3">
                      </img>
                      </span>
                        Add Search.
                        </Label>
                        <Body style={{ margin: spacing[2] }}>
      MongoDB Atlas support full-text search. Now add this feature to your app and test it out!
                        </Body>
                        <Link style={{ margin: spacing[2] }} href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                    <SideNavItem disabled>
                        <div style={{alignItems: 'center'}}>
                        <Label>
                          <span style={{ margin: spacing[2] }}>
                        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iOSIgZmlsbD0iIzVENkM3NCIvPgogIDxwYXRoIGQ9Ik0xMi40NzYgMTEuODAyVjEwLjI2MkgxMS4yMTZWNC41MDhIOS4xMDJMNS4xODIgMTAuMTA4QzUuMTgyIDEwLjEwOCA1LjE1NCAxMS40OTQgNS4xNTQgMTEuODE2SDkuMDA0VjE0SDExLjIxNlYxMS44MDJIMTIuNDc2Wk05LjAxOCAxMC4yNjJINi43NjRMOS4wMTggNi45MTZWMTAuMjYyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" class="css-15z1i9v e1kvg3ii3">
                      </img>
                      </span>
                        Get Charts.
                        </Label>
                        <Body style={{ margin: spacing[2] }}>
      Visualize the data from your sample app with MongoDB Charts in Atlas.
                        </Body>
                        <Link style={{ margin: spacing[2] }} href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                </SideNavGroup>

            </SideNav>

            <div className="content">
                  <Container>
                    <Title>
                      <AtlasStatus />
                    </Title>

                    <Navigation style={{ marginLeft: spacing[2] }}>

                      <List>
                        <ListItem>
                          <NavigationLink exact to="/">All Movies</NavigationLink>
                        </ListItem>
                        <ListItem>
                          <NavigationLink disabled exact to="/about">My Watchlist</NavigationLink>
                        </ListItem>
                      </List>
                    </Navigation>
                  </Container>
                  <Container>
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
