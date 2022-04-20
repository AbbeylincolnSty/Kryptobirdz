import '../styles/globals.css'
import './app.css'
import Link from 'next/link'

function KryptoBirdMarketplace({Component, pageProps}) {
    return (
        <div>
            <nav className='border-b p-6' style={{backgroundColor: 'purple'}}>
               <p className='text-white text-2xl font-bold'>KryptoBird Marketplace</p>
               <div className='flex mt-4 justify-center'>
                   <link href='/'>
                       <a className='mr-4>'>Main Marketplace</a>
                   </link>
                   <Link href='/mint-item'>
                          <a className='mr-6'>Mint Tokens</a>
                     </Link>
                        <Link href='/my-nfts'>
                            <a className='mr-6'>My NFTs</a>
                        </Link>
                        <Link href='/account-dashboard'>
                            <a className='mr-6'>Account Dashboard</a>
                        </Link>
                        </div>
            </nav>
            <Component {...pageProps} />
        </div>
    )
}
export default KryptoBirdMarketplace