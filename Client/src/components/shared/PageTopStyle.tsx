import Link from "next/link";

const PageTopStyle = ({
  header,
  description,
  footer,
}: {
  header: string;
  description: string;
  footer: string;
}) => {
  return (
    <div className="bg-[linear-gradient(120deg,_#f8fafc_0%,_#f4f6fa_50%,_#eceff4_100%)]">
      <div className="max-w-7xl mx-2 lg:mx-auto w-full flex flex-col lg:flex-row items-start lg:items-center py-6 lg:py-12 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary">{header}</h1>
          <p className="text-muted-foreground text-base">{description}</p>
        </div>
        <div className="flex items-center justify-center text-sm md:text-base gap-2">
          <Link
            href="/"
            className="text-muted-foreground hover:text-secondary transition-colors">
            Home
          </Link>
          <span className="text-xl">›</span>
          <h2 className="text-muted-foreground">{footer}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageTopStyle;
