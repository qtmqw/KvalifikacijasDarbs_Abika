import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    IconButton,
} from "@material-tailwind/react";
import { BsCart2 } from 'react-icons/bs'
import { Link, useLocation } from "react-router-dom";
import { AiOutlineUser } from 'react-icons/ai'
import { NavDropdown } from 'react-bootstrap';
import Abika from '../assets/abika.png'


export default function Example() {
    const [openNav, setOpenNav] = useState(false);

    const location = useLocation();
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(location.pathname);
    }, [location]);

    const logOut = () => {
        window.localStorage.clear()
        window.location.href = "./"
    }

    const isLoggedIn = window.localStorage.getItem("loggedIn")

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className=" lg:flex my-auto gap-12">
            <Link to="/"
                className={(url === "/" ? " flex uppercase relative before:absolute sm:before:-bottom-2 md:before:-bottom-2 lg:before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-full items-center text-black no-underline mt-3  "
                    : " flex uppercase text-black no-underline mt-3 relative before:absolute before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-0 hover:before:w-full before:transition-all ")}
            >
                Sākums
            </Link>

            <Link to="/Par_mums"
                className={(url === "/Par_mums" ? "  flex uppercase relative before:absolute sm:before:-bottom-2 md:before:-bottom-2 lg:before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-full items-center text-black no-underline mt-3  "
                    : " flex uppercase text-black no-underline mt-3 relative before:absolute before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-0 hover:before:w-full before:transition-all ")}
            >
                Par Mums
            </Link>

            <Link to="/Sortiments"
                className={(url === "/Sortiments" ? "  flex uppercase relative before:absolute sm:before:-bottom-2 md:before:-bottom-2 lg:before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-full items-center text-black no-underline mt-3  "
                    : " flex uppercase text-black no-underline mt-3 relative before:absolute before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-0 hover:before:w-full before:transition-all ")}
            >
                Sortiments
            </Link>
            
            <Link to="/Kontakti"
                className={(url === "/Kontakti" ? "  flex uppercase relative before:absolute sm:before:-bottom-2 md:before:-bottom-2 lg:before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-full items-center text-black no-underline mt-3  "
                    : " flex uppercase text-black no-underline mt-3 relative before:absolute before:-bottom-7 before:left-0 before:h-1 px-2 before:bg-[#FF7D1A] before:w-0 hover:before:w-full before:transition-all ")}
            >
                Kontakti
            </Link>
        </ul>
    );

    return (
        <Navbar className="max-w-[100%] py-4 px-4 lg:px-8 lg:py-4 bg-[#fdedd5]">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <IconButton
                    variant="text"
                    className="mb-3  h-6 w-6 text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}

                </IconButton>
                <img src={Abika} className='w-[130px]' />


                <div className="hidden lg:block">{navList}</div>
                <div className="flex justify-between gap-2">
                    {!isLoggedIn && <Link to="/Pieslegties" ><AiOutlineUser className='w-7 h-7 text-black md:mr-4  mt-2' /></Link>}
                    {isLoggedIn &&
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="User"
                            menuVariant="dark"
                            className="text-black my-auto"
                        >
                            <NavDropdown.Item href="/UserDetails">email</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logOut}>
                                Izrakstīties
                            </NavDropdown.Item>
                        </NavDropdown>
                    }
                    <Link to="/Grozs" className='p-2 lg:ml-2'><BsCart2 className='w-7 h-7 text-black' /></Link>
                </div>


            </div>

            <MobileNav open={openNav}>
                <div className="">
                    {navList}
                </div>
            </MobileNav>
        </Navbar>
    );
}