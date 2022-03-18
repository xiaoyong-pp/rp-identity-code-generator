const fs = require('fs-extra')
const moment = require('moment');

const APPLICANT_TYPE_ID = 16
const MEMEMBER_COUNT = 5000

const fill_zero = (s, n=10) => {
	return `${'0'.repeat(n-s.toString(10).length)}${s}`
}

//Returns a random integer from 1 to 999:
const random_num = data => {
    return Math.floor(Math.random() * 999) + 1;  
}

console.log('started to generate RP Identity Code')
const filename = 'RP_Identuty_Code_' + moment().format('YYYYMMDDHHmmss') + '.sql'
fs.ensureFileSync(filename)
fs.appendFileSync(filename, "INSERT INTO rp_member_identity ( identity_code, applicant_type_id, created_at) VALUES\r\n")

let identity_code
for (let i = 1; i <= MEMEMBER_COUNT; i++) {
    identity_code = 'RP'+fill_zero(i, 4)+fill_zero(random_num(), 3)
    console.log(identity_code)

    fs.ensureFileSync(filename)
    if ( i === MEMEMBER_COUNT ) {
        fs.appendFileSync(filename, "('"+identity_code.trim()+"', "+APPLICANT_TYPE_ID+", NOW())\r\n")
    }
    else{
        fs.appendFileSync(filename, "('"+identity_code.trim()+"', "+APPLICANT_TYPE_ID+", NOW()),\r\n")                
    } 
}

fs.ensureFileSync(filename)
fs.appendFileSync(filename, ";\r\n")
console.log('ended to generate RP Identity Code')

