import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DropDownMenu } from './DropDownMenu';

const Navbar = () => {
  const navLinks = [
    ['Fantastic Films', '/'],
    ['Home', '/'],
    ['Popular Films', 'films'],
    ['About Developer', 'about'],
  ];
  const [show, handleShow] = useState(false);

  const transitionNavBar = () =>
    window.scrollY > 100 ? handleShow(true) : handleShow(false);

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => {
      window.removeEventListener('scroll', transitionNavBar);
    };
  }, []);

  return (
    <>
      <DropDownMenu navLinks={navLinks} />

      <nav
        className={`hidden sm:flex justify-center items-center text-center py-3 sticky z-30 top-0 left-0 right-0 w-full ease-in duration-300 ${
          show && `bg-[#111] text-white`
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link[0]}
            className="text-center p-4 px-10 text-xl lg:text-2xl xl:text-2.5xl  cursor-pointer"
            to={link[1]}
          >
            {link[0]}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
