import React from 'react';
import { Button } from 'reactstrap';
import FA from 'react-fontawesome';

export default function SidebarToggleButton({ isSidebarCollapsed, toggleSidebar, isMobile }) {
  const chevronClassName = isSidebarCollapsed ? 'is-collapsed' : 'is-not-collapsed';
  const screenReaderLabel = isSidebarCollapsed ? 'Expand Sidebar Navigation' : 'Collapse Sidebar Navigation';
  return (
    <Button style={{display: `${isMobile ? '' : 'none'}`}} onClick={toggleSidebar} className={`m-r sidebar-toggle ${chevronClassName}`} aria-label={screenReaderLabel}>
      <FA name={'chevron-right'} />
    </Button>
  );
}
