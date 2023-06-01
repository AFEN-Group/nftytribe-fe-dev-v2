// eslint-disable-next-line
export default window.location.host.includes('staging') || window.location.host.includes('localhost') ?{
  //ETH
  erc721MintableAddress: '0x94D048E1AEC1058BD6c2a32a5d4d7EC2f718623d',
  erc721FactoryAddress: '0xC6BF837444a5b201D926c8d81aAa6dc1ba71193f',
  erc721MarketplaceAddress: '0x99a7ba44462BD9d61Fd2b5D700D92F057817be77',

  //'0x3174d3ac2ba973025833c52cfcf0cb1e5a2d8d19',
  erc1155MintableAdddress: '0xB904917111578eE56C69a7b25B435d71D04585B4',
  //0xc637de274ba50b142756542115acfece1cdf612c
  erc1155FactoryAddress: '0xE8b86C73B1531686a2a589Dbd55a13bF60c18d3E',
  //0x451fc62628a26247d9a02a282dc4ca64c52007c9
  erc1155MarketplaceAddress: '0xe8178cDD8f856dDEf34796906b1700BC4f39D86f',

  // BSC
  BSC_erc721MintableAddress: '0xb24aAd94575C8FD7872B6397731be9cDA3393Fce', //test
  // BSC_erc721MintableAddress: '0xd0a0fc438c162fc2633e3ed784db0049bd3a543f', //mainnet
  BSC_erc721FactoryAddress: '0x5715d151D6A3566a340172fe89371e47E41836f8', //test
  // BSC_erc721FactoryAddress: '0x96788ce9a1a51338060a8e8c4cadf0f0f29ef3f3',//main
  BSC_erc721MarketplaceAddress: '0xd64f379A9e4548490E06B75045F70Cf6AF161A57',
  // BSC_PhysicalItem: '0x632B0d4135fcda8Ca662faAead4FAb558d24b818',
 BSC_PhysicalItem: '0x59d36cca2f1425e66F0fc458c17Ec9d54021FA2d'
  // '0x71F722A1F16AF147e2fa088224BF1f0955f1075a'
  ,//test
  // BSC_erc721MarketplaceAddress: '0xb80a5067c6373c8d53dae3f1bf0b1aea83349b92',//main
  physical_market:'0xB1d6A5552483FC639713644F135982c5f1761459',
  //BSC_erc1155MintableAdddress: '0xE1C075aA57722FbAd50BE4C87737fD9495aA0e1e',
  BSC_erc1155MintableAdddress: '0xceef91849d0871f8fab17ee4623e08406ecafef4',
  //BSC_erc1155FactoryAdddress: '0x01D5E051e07D4460D4C098f91a060cA3a25FCD57',
  BSC_erc1155FactoryAdddress: '0xc09043ac7fc88d4e93660d99ff3ceaeead1fb72d',
  //BSC_erc1155MarketplaceAdddress: '0x16d77622860658B78F6777074ecbF7c656Af80E6'
  BSC_erc1155MarketplaceAdddress: '0x2a7af86943a9e8820ab0cac88ee66234a0dae354'
} : {
  //ETH
  erc721MintableAddress: '0x94D048E1AEC1058BD6c2a32a5d4d7EC2f718623d',
  erc721FactoryAddress: '0xC6BF837444a5b201D926c8d81aAa6dc1ba71193f',
  erc721MarketplaceAddress: '0x99a7ba44462BD9d61Fd2b5D700D92F057817be77',

  //'0x3174d3ac2ba973025833c52cfcf0cb1e5a2d8d19',
  erc1155MintableAdddress: '0xB904917111578eE56C69a7b25B435d71D04585B4',
  //0xc637de274ba50b142756542115acfece1cdf612c
  erc1155FactoryAddress: '0xE8b86C73B1531686a2a589Dbd55a13bF60c18d3E',
  //0x451fc62628a26247d9a02a282dc4ca64c52007c9
  erc1155MarketplaceAddress: '0xe8178cDD8f856dDEf34796906b1700BC4f39D86f',

  // BSC
  // BSC_erc721MintableAddress: '0xb24aAd94575C8FD7872B6397731be9cDA3393Fce', //test
  BSC_erc721MintableAddress: '0x9945094DEf8CA1C058eFd7baaFEe3a0712a70a71', //mainnet
  //BSC_erc721FactoryAddress: '0x5715d151D6A3566a340172fe89371e47E41836f8', //test
  BSC_erc721FactoryAddress: '0x69be9013C65E00Bc7894bCF80F296124d6A580A3',//main
    BSC_erc721MarketplaceAddress: '0x7f0E2996B10F1D99a7644042424f08c47AEF4d90',
  // BSC_PhysicalItem: '0x632B0d4135fcda8Ca662faAead4FAb558d24b818',
    BSC_PhysicalItem: '0x482e0FEbd03460AfB52a3c3e2140744380D6fE82'
  // '0x71F722A1F16AF147e2fa088224BF1f0955f1075a'
  ,//test
  // BSC_erc721MarketplaceAddress: '0xb80a5067c6373c8d53dae3f1bf0b1aea83349b92',//main
    physical_market: '0x9771e7c93d9b031045dD466b04aC716cA77bc98b',
  //BSC_erc1155MintableAdddress: '0xE1C075aA57722FbAd50BE4C87737fD9495aA0e1e',
  BSC_erc1155MintableAdddress: '0xceef91849d0871f8fab17ee4623e08406ecafef4',
  //BSC_erc1155FactoryAdddress: '0x01D5E051e07D4460D4C098f91a060cA3a25FCD57',
  BSC_erc1155FactoryAdddress: '0xc09043ac7fc88d4e93660d99ff3ceaeead1fb72d',
  //BSC_erc1155MarketplaceAdddress: '0x16d77622860658B78F6777074ecbF7c656Af80E6'
  BSC_erc1155MarketplaceAdddress: '0x2a7af86943a9e8820ab0cac88ee66234a0dae354'
}
