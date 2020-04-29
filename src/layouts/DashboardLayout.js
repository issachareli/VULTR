import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, Chat, PageAlert, Page } from '../vibe';

import avatar1 from '../assets/images/avatar1.png';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import axios from 'axios';
import config from '../config/env'
var Logo = require('../assets/images/vibe-logo.svg');

if (process.env.NODE_ENV === 'production'){
  Logo = `${process.env.PUBLIC_URL}/static/media/vibe-logo.svg`
}


const MOBILE_SIZE = 992;

export const IsMobileContext = React.createContext();

export default class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: window.innerWidth > MOBILE_SIZE,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
      isAuthenticated:null,
      selfSponsorType:null,
      fullName: '',
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      if (!this.state.isMobile )
        this.setState({ sidebarCollapsed: true, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return false;
  // }

  componentDidMount(){
    window.addEventListener('resize', this.handleResize);
    this._isMounted = true;
    const token=localStorage.getItem("Token");
    let client = window.location.href.replace(/^https?\:\/\//i, "");
    client= client.slice(client.indexOf('/', client.indexOf('/') + 1) + 1); //to check the type of client
    axios.get(`${config.url}/api/v1/${client[0] === 'u' ? 'user':'sponsor'}/validate-token`,
              { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
        if (this._isMounted && !this.state.isAuthenticated){
        this.setState(() => ({
            isAuthenticated:true
          }));
        }
        if(res.data.sponsor){
          this.setState(()=>({selfSponsorType:res.data.sponsor.role}))
        }
    })
    .catch(err => {
      console.log(err);
      window.location.href = `${config.url}/${client[0] === 'u' ? 'user':'sponsor'}/logout`
    });
    
    
    
    
   axios.get(`${config.url}/api/v1/sponsor/details`, { 
 headers: {
        'Authorization': 'Bearer ' + token,
        'Access-Control-Allow-Origin': '*',
      },
    }).then(res => {
        const sponsor = res.data.payload;
        this.setState({
          fullName: sponsor.fullName,
        });
      }).catch(error => {
      console.log(error);
    });
    

}

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
    this._isMounted = true;
    const token=localStorage.getItem("Token");
    let client = window.location.href.replace(/^https?\:\/\//i, "");
    client= client.slice(client.indexOf('/', client.indexOf('/') + 1) + 1); //to check the type of client
    axios.get(`${config.url}/api/v1/${client[0] === 'u' ? 'user':'sponsor'}/validate-token`,{ headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (this._isMounted && !this.state.isAuthenticated){
          this.setState(() => ({
            isAuthenticated:true
          }));

        }
      })
      .catch(err => {
        console.log(err);
        window.location.href = `${config.url}/${client[0] === 'u' ? 'user':'sponsor'}/logout`
      });


  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  onMouseEnter = () => {
    if (!this.state.isMobile)
      this.setState({sidebarCollapsed:false})
  };
  onMouseExit = () => {
    if (!this.state.isMobile)
      this.setState({sidebarCollapsed:true})
  };

  hideSideNav = () => {
    if (this.state.isMobile && this.state.sidebarCollapsed)
      this.setState({sidebarCollapsed:false});
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  render() {
    // if(this.state.isAuthenticated===false)
    //   return(<Redirect to={{pathname:'/logout'}} ignoreBaseName/>)

    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    const SidebarNavGenerator = (type,sponsorType)=>{
      if (type==='sponsor')
      return <SidebarNav
        nav={{top:nav[type].top.filter((route) => route.allowed.includes(this.state.selfSponsorType)),bottom:nav[type].bottom}}
        logo={Logo}
        logoText="MoneyLiFE™"
        // isSidebarCollapsed={sidebarCollapsed}
        toggleSidebar={this.toggleSideCollapse}
        mouseEnter={this.onMouseEnter}
        mouseExit={this.onMouseExit}
        {...this.props}
      />
      else
        return <SidebarNav
          nav={nav[type]}
          logo={Logo}
          logoText="MoneyLiFE™"
          // isSidebarCollapsed={sidebarCollapsed}
          toggleSidebar={this.toggleSideCollapse}
          mouseEnter={this.onMouseEnter}
          mouseExit={this.onMouseExit}
          {...this.props}
        />
    }

function HeaderNav() {
  let client = window.location.href.replace(/^https?\:\/\//i, "");
  client= client.slice(client.indexOf('/', client.indexOf('/') + 1) + 1); //to check the type of client

  return (
    <React.Fragment>
      {/*<NavItem>*/}
      {/*  <form className="form-inline">*/}
      {/*    <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />*/}
      {/*    <Button type="submit" className="d-none d-sm-block">*/}
      {/*      <i className="fa fa-search" />*/}
      {/*    </Button>*/}
      {/*  </form>*/}
      {/*</NavItem>*/}
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
   <i className="fa fa-user-circle"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href={`/${client[0] === 'u' ? 'user':'sponsor'}/logout`}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {/*<UncontrolledDropdown nav inNavbar>*/}
      {/*  <DropdownToggle nav>*/}
      {/*    <Avatar size="small" color="blue" initials="JS" />*/}
      {/*  </DropdownToggle>*/}
      {/*  <DropdownMenu right>*/}
      {/*    <DropdownItem>Option 1</DropdownItem>*/}
      {/*    <DropdownItem>Option 2</DropdownItem>*/}
      {/*    <DropdownItem divider />*/}
      {/*    <DropdownItem>Reset</DropdownItem>*/}
      {/*  </DropdownMenu>*/}
      {/*</UncontrolledDropdown>*/}
    </React.Fragment>
  );
}

    return (
      <ContextProviders>
        <IsMobileContext.Provider value={this.state.isMobile}>
          <div className={`app ${sidebarCollapsedClass}`}>
            <PageAlert />
            <div className="app-body">
              <Switch>
                <Route path="/sponsor" component={()=><Switch>
                  {SidebarNavGenerator('sponsor',this.state.selfSponsorType)}
                </Switch>}/>
                <Route path="/user" component={()=><Switch>
                  {SidebarNavGenerator('user')}
                </Switch>}/>
              </Switch>
              <Page>
                <Header
                  toggleSidebar={this.toggleSideCollapse}
                  isSidebarCollapsed={sidebarCollapsed}
                  isMobile={this.state.isMobile}
                  routes={routes}
                  {...this.props}
                >
                  <HeaderNav />
                </Header>
                <PageContent sidebarCollapsed={this.state.sidebarCollapsed} hideSideNav={this.hideSideNav}>
                  <Switch>
                    <Route path="/sponsor" component={()=><Switch>
                      {routes.sponsor.filter((route) => route.allowed.includes(this.state.selfSponsorType)).map((page, key) => (
                        <Route exact={page.exact} path={page.path} component={page.component} key={key} />
                      ))}
                    </Switch>}/>
                    <Route path="/user" component={()=><Switch>
                      {routes.user.map((page, key) => (
                        <Route exact path={page.path} component={page.component} key={key} />
                      ))}
                    </Switch>}/>
                  </Switch>

                </PageContent>
              </Page>
            </div>
            <Footer>
            </Footer>
            {/*<Chat.Container>*/}
            {/*  {this.state.showChat1 && (*/}
            {/*    <Chat.ChatBox name="Messages" status="online" image={avatar1} close={this.closeChat} />*/}
            {/*  )}*/}
            {/*</Chat.Container>*/}
          </div>
        </IsMobileContext.Provider>
      </ContextProviders>
    );
  }
}

