import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import AuthContext from '../../contexts/Auth.context';
import { SignoutActiveIcon, SignoutInactiveIcon } from './MenuIcons';

const MenuDefault = () => {
  const { updateAuthToken } = useContext(AuthContext);

  const signout = () => {
    updateAuthToken('');
  };

  return (
    <div className="w-56 text-right fixed top-10 right-5">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Menu
            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-rose-200 hover:text-rose-100" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-rose-500 text-white' : 'text-gray-900'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={signout}
                  >
                    {active ? (
                      <SignoutActiveIcon className="w-5 h-5 mr-2 text-rose-400" aria-hidden="true" />
                    ) : (
                      <SignoutInactiveIcon className="w-5 h-5 mr-2 text-rose-400" aria-hidden="true" />
                    )}
                    Signout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MenuDefault;
