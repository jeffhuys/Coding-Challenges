if(process.argv.length < 3) {
  console.log('Please provide a formula.')
  process.exit(-1)
}

const formula = process.argv[2]

console.log(formula)

let matches = formula.split('(')
                     .filter( v => v.indexOf(')') > -1 )
                     .map( value => value.split(')')[0] )

let output = []


if(matches) {
  // More than 1 formula!
  let strippedFormula = formula

  matches.forEach(match => {
    output.push(count(match))
    strippedFormula = strippedFormula.replace(`(${match})`, '')
  })

  output.push(count(strippedFormula))
} else {
  output.push(count(formula))
}

console.log(output)


// console.log(count(formula))




function count(formula) {
  let elements = []

  let i
  for(i = 0; i < formula.length; i++) {
    // debugger;
    let ch  = formula[i]
    let nch = formula[i+1]
    let val = 1

    // is ch numeric
    if( !isNaN(ch * 1) ) continue

    // is next ch numeric?
    let check = 1
    let atomsStr = ''
    let checkCh = formula[i+check]
    while( !isNaN( checkCh * 1) ) {
      atomsStr += String(checkCh)
      val = Number(atomsStr)
      checkCh = formula[i+(++check)]
    }

    if( !nch ) {
      elements.push( { name: String(ch), atoms: val } )
      continue
    }

    if( isup(ch) && isup(nch) )
      elements.push( { name: String(ch), atoms: val } )

    if( isup(ch) && !isup(nch) )
      elements.push( { name: String(ch + nch), atoms: val } )
  }

  return elements
}







function isup(ch) { return ch == ch.toUpperCase() }