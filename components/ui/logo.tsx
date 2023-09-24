import Link from 'next/link'
import Image from 'next/image'
import { LogoPath } from '@/utils/config'

export default function Logo() {
  return (
    <Link className="block" href="/" aria-label="Cruip">
      <Image src={LogoPath} width={38} height={38} priority alt="Stellar" />
    </Link>
  )
}