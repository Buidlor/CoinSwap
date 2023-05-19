const {AlphaRouter} = require('@uniswap/smart-order-router')
const {Token, CurrencyAmount, TradeType, Percent} = require('@uniswap/sdk-core')
const {ethers, BigNumber} = require('ethers')
const JSBI = require('jsbi')
const {ERC20ABI} = require('./abi.json')

require('dotenv').config()

const V3_SWAP_ROUTER_ADDRESS = '0x5615CDAb10dc425a742d643d949a7F474C01abc4'
const VITE_ALCHEMI_URL_TESTNET = process.env.VITE_ALCHEMI_URL_TESTNET
console.log("testing the url is: ", VITE_ALCHEMI_URL_TESTNET)
const chainId = 5

const web3Provider = new ethers.providers.JsonRpcProvider(VITE_ALCHEMI_URL_TESTNET)
const router = new AlphaRouter({chainId: chainId, provider: web3Provider})

const name0 = 'Wrapped Ether'
const Symbol0 = 'WETH'
const decimals0 = 18
const address0 = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'

const name1 = 'Uniswap Token'
const Symbol1 = 'UNI'
const decimals1 = 18
const address1 = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

const WETH = new Token(chainId, address0, decimals0, Symbol0, name0)
const UNI = new Token(chainId, address1, decimals1, Symbol1, name1)

export const getWethContract = () => new ethers.Contract(address0, ERC20ABI, web3Provider)
export const getUniContract = () => new ethers.Contract(address1, ERC20ABI, web3Provider)

export const getPrice = async (inputAmount, slippageAmaint, deadline, walletAddress ) => {