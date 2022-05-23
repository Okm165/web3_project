import { Component } from 'solid-js';
import logo from '../../images/logo.png';

const Footer: Component = () => {
    return(
        <div class="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
            <div class="w-full flex sm:flex-row flex-col justify-between items-center my-4">
                <div class="flex flex-[0.5] justify-center items-center">
                    <img src={logo} alt="logo" class="w-32"/>
                </div>
                <div class="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
                    <p class="text-white text-base text-center cursor-pointer mx-2">Market</p>
                    <p class="text-white text-base text-center cursor-pointer mx-2">Exchange</p>
                    <p class="text-white text-base text-center cursor-pointer mx-2">Tutorials</p>
                    <p class="text-white text-base text-center cursor-pointer mx-2">Wallets</p>
                </div>
            </div>
            <div class="flex justify-center items-center flex-col mt-5">
                <p class="text-white text-sm text-center">Come join us</p>
                <p class="text-white text-sm text-center">info@cryptomastery.com</p>
            </div>
            <div class="sm:w-[90%] w-full h-[0.25px] bg-gray-500 mt-5"/>
            <div class="sm:w-[90%] w-full flex justify-between items-center mt-3">
                <p class="text-white text-sm text-center">@cryptomastery 2022</p>
                <p class="text-white text-sm text-center">All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer
