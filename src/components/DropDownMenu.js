import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

export const DropDownMenu = ({ navLinks }) => {
  return (
    <Menu
      as="div"
      className="sm:hidden w-56 text-right fixed top-7 right-6 z-50"
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex h-12 text-black justify-end focus:outline-none bg-opacity-20 hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <MenuIcon className=" h-11 w-11" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-[#111] ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {navLinks.map((link) => (
                <div key={link[0]} className="py-1 m-auto">
                  <Menu.Item>
                    <Link
                      to={link[1]}
                      spy={true}
                      smooth={true}
                      duration={800}
                      className="block px-4 py-2 text-base text-gray-300 font-Raleway"
                    >
                      {link[0]}
                    </Link>
                  </Menu.Item>
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
