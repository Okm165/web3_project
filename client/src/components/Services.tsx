import { Component, JSX } from 'solid-js';
import { BsShieldFillCheck } from 'solid-icons/bs';
import { RiHealthHeart2Fill } from 'solid-icons/ri';
import { BiSearchAlt } from 'solid-icons/bi';

interface ServiceCardInterface {
    color?: string,
    title?: string,
    icons?: JSX.Element,
    subtitle?: string,
}

const ServiceCard: Component<ServiceCardInterface> = ({color, title, icons, subtitle}) => {
    return (
        <div class="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
            <div class={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                {icons}
            </div>
            <div class="ml-5 flex flex-col flex-1">
                <h1 class="mt-2 text-white text-lg">{title}</h1>
                <p class="mt-2 text-white text-sm md:w-9/12">{subtitle}</p>
            </div>
        </div>
    )
}

const Services: Component = () => {
    return (
        <div class="flex flex-col mf:flex-row w-full justify-center items-center gradient-bg-services ">
            <div class="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
                <div class="flex-1 flex flex-col justify-start items-start">
                    <h1 class="text-white text-3xl sm:text-5xl py-2 text-gradient">Services that we
                        <br />
                        continue to improve
                    </h1>
                </div>
            </div>
            <div class="flex-1 flex flex-col justify-start items-center">
                <ServiceCard
                    color="bg-[#2952e3]"
                    title="Security Guaranteed"
                    icons={<BsShieldFillCheck size={21} class="text-white" />}
                    subtitle="Security is guaranteed. We always maintain the quality of our products."
                />
                <ServiceCard
                    color="bg-[#8945f8]"
                    title="Best exchange rates"
                    icons={<BiSearchAlt size={21} class="text-white" />}
                    subtitle="Security is guaranteed. We always maintain the quality of our products."
                />
                <ServiceCard
                    color="bg-[#f84550]"
                    title="Fastest transactions"
                    icons={<RiHealthHeart2Fill size={21} class="text-white" />}
                    subtitle="Security is guaranteed. We always maintain the quality of our products."
                />
            </div>
        </div>
    );
}

export default Services
