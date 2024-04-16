import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '/src/images/favicon.png';
import Icon from '../IconSVG/IconSVG';
import IconSVG from '../IconSVG/IconSVG';
// import SidebarLinkGroup from './SidebarLinkGroup';
// import { decryptData } from '../componentsGTA/GTAKeep';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const location = useLocation();
    const { pathname } = location;

    const a = true;

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    const userGroupId = localStorage.getItem('userGroupId');

    // close on click outside
    useEffect(() => {

        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark  ${sidebarOpen ? '  relative translate-x-0' : ' absolute -translate-x-full'
                }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-4 px-2 py-2.5 lg:py-2.5">
                <NavLink to="/">
                    <IconSVG src="/src/images/logo/logo-GTA-branco.svg" width={180} height={90}/>
                </NavLink>

            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2 py-2 px-2 lg:mt-2 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="text-title-md mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            Gestão A Vista
                        </h3>

                        <ul className="mb-6 flex text-lg flex-col p-1 gap-1.5">
                            <li>
                                <NavLink
                                    to="/"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <IconSVG src="/src/images/icon/icon-layout.svg" />
                                    Layout
                                </NavLink>
                            </li>


                            <li>
                                <NavLink
                                    to="/document"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <IconSVG src="/src/images/icon/icon-document.svg" />
                                    Documentos
                                </NavLink>
                            </li>

                        </ul>
                    </div>

                    {/* <!-- Others Group --> */}
                    {userGroupId === '1' ?
                        <div>
                            <h3 className="text-title-md mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                Administração
                            </h3>

                            <ul className="mb-6 flex flex-col p-1 gap-1.5">
                                {/* <!-- Menu Item Chart --> */}
                                <li>
                                    <NavLink
                                        to="/administration"
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                            }`}
                                    >
                                        <IconSVG src="/src/images/icon/icon-AllDocuments.svg" />
                                        Todos Documentos
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/users"
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                            }`}
                                    >
                                        <IconSVG src="/src/images/icon/icon-user.svg"/>
                                        Usuários
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/config"
                                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                                            }`}
                                    >
                                        <IconSVG src="/src/images/icon/icon-config.svg"/>
                                        Configurações
                                    </NavLink>
                                </li>
                                {/* <!-- Menu Item Chart --> */}

                            </ul>
                        </div>

                        : <></>}

                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ marginTop: "auto" }}>CSN - GTA - Tecnologia de Automação</div>
            </div>
        </aside>
    );
};

export default Sidebar;
