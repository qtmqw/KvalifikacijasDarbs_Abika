import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    CDBDropDown,
    CDBIcon

} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const logOut = () => {
    window.localStorage.clear()
    window.location.href = "./"
}
const activeLink = " bg-violet-700 "
const normalLink = " bg-black " 

const Sidebar = () => {
    return (
        <div className='h-full flex overflow-y-auto fixed z-50 top-0 outline-none focus:outline-none'>
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none text-white italic" >
                        Admin Sidebar
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/AdminPage">
                            <CDBSidebarMenuItem icon="columns">
                                Dashboard
                            </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/AdminUserBoard" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Users</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/AdminProducts" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="box-open">Products</CDBSidebarMenuItem>
                        </NavLink>

                        <CDBSidebarMenu className='border-t border-b'>
                            <CDBDropDown title="Sidemenu" icon="th" >
                                <NavLink exact to="/" >
                                    <CDBSidebarMenuItem icon='home'>Sakums</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/Par_mums">
                                    <CDBSidebarMenuItem icon='building'>Par mums</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/Sortiments" >
                                    <CDBSidebarMenuItem icon='sort-alpha-down'>Sortiments</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/Kontakti" >
                                    <CDBSidebarMenuItem icon='phone-volume'>Kontakti</CDBSidebarMenuItem>
                                </NavLink>
                            </CDBDropDown>
                        </CDBSidebarMenu>

                        <NavLink exact to="/404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter>
                    <NavLink exact to="/" activeClassName="activeClicked" className="text-white no-underline" onClick={logOut}>
                        <CDBSidebarMenuItem icon='sign-out-alt'>Log out</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};

export default Sidebar;