import React from 'react';
import Logo from '../assets/abika.png';

import { GrCatalog } from 'react-icons/gr'
import { AiOutlineSetting, AiOutlineDatabase, AiOutlineLogout } from 'react-icons/ai'


const logOut = () => {
    window.localStorage.clear()
    window.location.href = "./"
}

const Sidebar = () => {
    return (
        <div>
            <aside class="flex flex-col items-center w-20 h-screen fixed py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
                <nav class="flex flex-col flex-1 space-y-6 items-center">
                    <a href="#">
                        <img class="w-auto h-6 " src={Logo} alt="Logo" />
                    </a>

                    <a href="/AdminPage" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                    </a>

                    <a href="/AdminUserBoard" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </a>

                    <a href="/AdminProducts" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange">
                        <GrCatalog className='w-5 h-5' />
                    </a>

                    <a href="/AdminFunctions" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange">
                        <AiOutlineSetting className='w-6 h-6' />
                    </a>

                    <a href="/AdminOrderPage" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange">
                        <AiOutlineDatabase className='w-6 h-6' />
                    </a>
                </nav>

                <div class="flex flex-col space-y-6">
                    <a href="/" class="p-1.5 text-black focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 hover:bg-orange" onClick={logOut}>
                        <AiOutlineLogout className='w-6 h-6' />
                    </a>
                </div>
            </aside>
            <div>
            </div>
        </div>
    );
}

export default Sidebar;