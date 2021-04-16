/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core'
import styled from '@emotion/styled/macro';
import { uiColors } from '@leafygreen-ui/palette'
import { spacing } from '@leafygreen-ui/tokens';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import SearchPage from './components/SearchPage';

import { Logo, AtlasLogoMark } from '@leafygreen-ui/logo';
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
                     className={css`z-index: 1;`}>
                    <Logo />
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
                        <Label>1. Check the connection.</Label>
                        <p/>
                        <Body>Now your app is connected with Atlas. Go to your Atlas Cluster Collections tab to edit the data and see updates on the App.</Body>
                        <Link href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                    <SideNavItem active>
                        <div style={{alignItems: 'center'}}>
                        <Label>2. Analyze your data.</Label>
                        <Body>
                            Explore and view your data with an Aggregation Pipeline.
                        </Body>
                        <Link href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>
                    <SideNavItem disabled>
                        <div style={{alignItems: 'center'}}>
                        <Label>3. Add Search.</Label>
                        <Body >
      MongoDB Atlas support full-text search. Now add this feature to your app and test it out!
                        </Body>
                        <Link href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                    <SideNavItem disabled>
                        <div style={{alignItems: 'center'}}>
                        <Label>3. Add Charts.</Label>
                        <Body>
      Visualize the data from your sample app with MongoDB Charts in Atlas.
                        </Body>
                        <Link href="https://docs.mongodb.com/">Docs</Link>
                        </div>
                    </SideNavItem>

                </SideNavGroup>

            </SideNav>

            <div className="content">
                  <Container>
                    <Title>
                <AtlasLogoMark />
                        Hello MongoDB App
                    </Title>

                    <Navigation>
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
