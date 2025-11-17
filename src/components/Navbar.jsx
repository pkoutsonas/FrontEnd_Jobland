import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import UserContext from "./UserContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, login, logout } = React.useContext(UserContext);

  const handleLogout = () => {
    logout();
    // redirecting into home page
    window.location.href = "/home";
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const location = useLocation();
  const [active, setActive] = React.useState("Home");

  // Set active state based on current path
  React.useEffect(() => {
    const currentPath = location.pathname.split("/")[1] || "home";
    setActive(currentPath.charAt(0).toUpperCase() + currentPath.slice(1));
  }, [location]);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 w-full shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">JobLand.gr</div>
        <div className="text-white flex space-x-4">
          {["Home", "Jobs", "About"].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className={classNames(
                "px-4 py-2 rounded-md",
                active === item
                  ? "bg-gray-700 text-yellow-400"
                  : "hover:bg-gray-700"
              )}
              onClick={() => setActive(item)}>
              {item}
            </Link>
          ))}
        </div>
        <div className="text-white flex space-x-4">
          {!user ? (
            <>
              <button
                className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-gray-700"
                onClick={openModal}>
                Log In
              </button>
              <LoginModal isOpen={isModalOpen} onClose={closeModal} />
              <Link to={"/signup"}>
                <button
                  href="/signup"
                  className="px-4 py-2 rounded-md hover:bg-gray-700 bg-purple-500">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-white mt-2">{user.username}</span>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 bg-purple-500 text-white hover:bg-gray-700">
                    Options
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                        Dashboard
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/about"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                        Support
                      </a>
                    </MenuItem>
                    <form action="{{ route('logout') }}" method="POST">
                      <MenuItem>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                          Sign out
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <button
className="px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-gray-700"
onClick={logout}>
Log Out
</button>
 */
}
