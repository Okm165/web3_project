import { Component } from 'solid-js';

import logo from "../../images/logo.png";

interface NavbarItemInterface {
    title?: string,
    classProps?: string,
    onClick?: (e: Event) => unknown,
}

const NavbarItem: Component<NavbarItemInterface> = ({ title, classProps, onClick }) => {
    return (
        <li class={`mx-4 cursor-pointer ${classProps}`} onClick={(e) => { onClick(e) }}>
            {title}
        </li>
    );
}

const clickHandler = (e: Event) => {
    const input = e.target as HTMLInputElement;
    console.log(input.value);
}

const Navbar: Component = () => {
    return (
        <nav class="w-full flex md:justify-center justify-between items-center p-4">
            <div class="md:flex-[0.5] flex-initial justify-center items-center">
                <img src={logo} class="w-32 cursor-pointer" />
            </div>
            <ul class="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map((item) => (
                    <NavbarItem title={item} onClick={clickHandler} />
                ))}
                <li class="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
        </nav>
    );
}

export default Navbar
