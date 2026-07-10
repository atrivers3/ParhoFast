const axioRequest = require("axio")

async function getactivity(){
  let response = await axioRequest.get("https://www.boredapi.com/api/activity")
  console.log(`You could ${response.data.activity}`)
}

getactivity()