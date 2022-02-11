/*
  assumptions:
  - both needle and haystack are made up of only ascii characters
  - given improper input we will just return 0 matches
*/

exports.handler = (haystack, needle) => {
  let matchCount = 0

  if (typeof haystack === 'string' 
    && typeof needle === 'string' 
    && haystack.length > 0 
    && needle.length > 0
    && (needle.length < haystack.length)) {

    // make sure to normalize our inputs for comparison
    // in a production environment this may be slightly more robust and moved to a util function, but keeping it for simplicity here
    // this will ignore unicode characters and assume only ascii alpha, unicode would require much more complicated logic and would absolutely be moved to a separate util function
    haystack = haystack.replace(/[^a-zA-Z]/g, '').toLowerCase()
    needle = needle.replace(/[^a-zA-Z]/g, '').toLowerCase()

    if (haystack.length > 0 && needle.length > 0) {
      const indexCount = []
      for(let i = 0; i < needle.length; i++) {
        const currentNeedleChar = needle.charAt(i)
        //bit of a trick to find full haystack count at once
        //we can get away with this since split will add empty characters to beginning/end of array if character appears first/last
        const currentCharCount = haystack.split(currentNeedleChar).length - 1
        if (currentCharCount > 0) {
          if (indexCount[currentNeedleChar] === undefined) {
            indexCount[currentNeedleChar] = currentCharCount
          } else {
            //duplicate characters will decrease our match rate by a factor of 2
            indexCount[currentNeedleChar] = Math.floor(indexCount[currentNeedleChar] / 2)
          }
        } else {
          return 0
        }
      }

      //pass an array of only our counts to min
      matchCount = Math.min(...Object.values(indexCount))
    }
  }

  return matchCount
}