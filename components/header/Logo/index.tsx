import { GeoLogo } from '@/constants/img';
import { ErudeLogo } from '@/constants/svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
    return (
        <Link href="/" className="flex items-center shrink-0">
            <Image
                src={GeoLogo}
                alt="GEO Logo"
                width={180}
                height={48}
                quality={100}
                priority={true}
                className="h-[48px] w-auto max-w-[55vw] sm:max-w-none object-contain"
            />
        </Link> 
    );
};

export default Logo;
