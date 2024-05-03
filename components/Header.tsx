import { Briefcase, HomeIcon, MessagesSquare, SearchIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center p-2 max-w-6xl mx-auto">
      <Image
        className="rounded-lg"
        src={"/ld_logo.png"}
        width={40}
        height={40}
        alt="logo"
      />

      <div className="flex-1">
        <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
          <SearchIcon className="h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none"
          />
        </form>
      </div>

      <div className="">
        <Link href="/" className="icon">
            <HomeIcon className="h-5" />
            <p>Home</p>
        </Link>

        <Link href="/" className="icon hidden md:flex">
            <UserIcon className="h-5" />
            <p>Network</p>
        </Link>

        <Link href="/" className="icon hidden md:flex">
            <Briefcase className="h-5" />
            <p>Jobs</p>
        </Link>

        <Link href="/" className="icon hidden md:flex">
            <MessagesSquare className="h-5" />
            <p>Messing</p>
        </Link>

        {/* User Button id signed in */}

        {/* Sign in button if not signed in */}
      </div>
    </div>
  );
};

export default Header;
