// we want to load users nfts and display them

import {ethers} from 'ethers';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import {nftaddress, nftmarketaddress } from '../config';

import NFT from '../artifacts/contracts/KBMarket.sol/KBMarket.json';
export default function AccountDashboard() {
    // array of nfts
    const [nfts, setNfts] = useState([]);
    const [sold, setSold] = useState([]);
    const [loadingState, setLoadingState] = useState('not-loaded');
    useEffect(() => {
        loadNFTs()
    }, [])

    async function loadNFTs() {
        //what we want to load:
        //we want to get the msg.sender hook up to the signer to display the owner nfts

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, signer);
        const data = await marketContract.fetchItemsCreated();
        const nftData = await Promise.all(data.map(async i => {
            const tokenURI = await tokenContract.tokenURI(i.tokinId);
            //we want to get the token metadata - json

            const meta = await axios.get(tokenUri)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')

            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description
            }
            return item;
        }))

        // create a filtered array of items that have been sold to know which items are gone
        const soldItems = items.filter(i=> i.sold)
        setSold(soldItems)
        setNfts(items)
        setLoadingState('loaded')
        }

        if(loadingState === 'loaded' && !nfts.length) return (<h1 className='px-20 py-7 text-4x1'>
            You have not minted any NFTs!</h1>)

            return (
                <div className='p-4'>
                    <h1 style={{fontSize: '20px', color: 'purple'}}>Tokens minted</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4'>
                        {nfts.map((nft, i) => (
                            <div key={i} className='border shadow rounded-x1 overflow-hidden'>
                                <img src={nft.image} /> 
                                <div className='p-4'>
                                    <p style={{height: '64px'}}className='text-3x1 font-semibold'>{nft.name}</p>
                                    <div style={{height: '72px', overflow: 'hidden'}}>
                                        <p className='text-gray-400'>{nft.description}</p>
                                    </div>
                                </div>
                                <div className='p-4 bg-black'>
                                    <p className='text-3x-1 mb-4 font-bold text-white'>{nft.price} ETH</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                                    
                        )
}
