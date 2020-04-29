import React from 'react';

export default class PageContent extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.sidebarCollapsed === nextProps.sidebarCollapsed;
  }

  render() {
    return (
      <main id="primary-content" tabIndex="-1" role="main" onClick={() => {this.props.hideSideNav();}}>
        {this.props.children}
      </main>
    );
  }

}

