import { Fragment, ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";

interface Props {
    trigger: ReactNode;
    children: ReactNode;
}

export default function Dropdown({ trigger, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            {trigger && <div onClick={() => setOpen(!open)}>{trigger}</div>}

            <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    onClick={() => setOpen(false)}
                >
                    {children}
                </div>
            </Transition>
        </div>
    );
}
