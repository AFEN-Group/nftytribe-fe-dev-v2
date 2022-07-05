export const shortenAddress = (address: string) =>
  `${address.slice(0, 9)}...${address.slice(address.length - 6)}`

export const shortenAddressSmall = (address: string) =>
  `${address.slice(0, 8)}...`

export const capitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
