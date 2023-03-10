import { ComponentType, FC, createElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  text: string;
  icon: ComponentType<any>;
}

const Index: FC<Props> = ({ icon, href, text }) => {
  const { pathname } = useRouter();
  const selected = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full text-sm font-medium relative flex items-center h-10 w-full ${
        selected ? 'bg-hover-theme text-theme-700' : 'hover-gray text-color-primary'
      }`}
    >
      <div className="absolute top-0 left-1 w-10 h-10 p-2">
        <div className="w-6 h-6 p-0.5">{createElement(icon, { className: 'w-5 h-5' })}</div>
      </div>
      <div className="truncate grow shrink pl-11 pr-3">{text}</div>
    </Link>
  );
};

export default Index;
