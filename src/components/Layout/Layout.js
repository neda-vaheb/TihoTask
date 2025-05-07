import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
function Layout({ children }) {
  return (
    <>
      <header className="bg-[#89AEB2] w-full flex justify-between items-center px-[30px] py-[20px] m-auto">
        <h2 className="font-bold text-white text-[12px] md:text-[1.5rem]">
          {" "}
          <Link href="./">TihoTask</Link>
        </h2>
        <nav>
          <ul className="flex gap-[10px] text-white mr-[20px]">
            <li>
              <Link
                href="./"
                className="hover:text-[#455f62] transition text-[10px] font-bold md:text-[1rem]"
              >
                HomePage
              </Link>
            </li>
            <li>
              <Link
                href="./posts"
                className="hover:text-[#455f62] transition text-[10px] font-bold md:text-[1rem] "
              >
                posts
              </Link>
            </li>
            <li>
              <Link
                href="./users"
                className="hover:text-[#455f62] transition text-[10px] font-bold md:text-[1rem]"
              >
                users
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {children}

      <footer className="bg-[#89AEB2] w-full flex justify-center items-center  py-[10px] ">
        <h3 className="flex gap-[10px] items-center text-white">
          Develope By Neda Vaheb <FaRegHeart />
        </h3>
      </footer>
    </>
  );
}

export default Layout;
