import Image from "next/image";
import logo from "../../app/assets/green-circle-logo.png";
import Link from "next/link";

const Logo = ({ style }: { style?: string }) => (
  <Link href="/">
    <div className="text-xl md:text-2xl  font-bold flex items-center gap-3">
      <Image src={logo} alt="logo" height={20} width={20} />
      <div>
        <span className={`${style}`}>GreenovateHub</span>
      </div>
    </div>
  </Link>
);

export default Logo;
