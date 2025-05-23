import Image from "next/image";
import logo from "../../app/assets/green-circle-logo.png";
import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <div className="text-2xl font-bold flex items-center gap-2">
      <Image src={logo} alt="logo" height={20} width={20} />
      <div>
        <span className="text-green-500">Greenovate</span>
        <span className="text-[#1b2a5e]">Hub</span>
      </div>
    </div>
  </Link>
);

export default Logo;
