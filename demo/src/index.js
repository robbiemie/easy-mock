import axios from 'axios'
import jsonp from 'jsonp'

jsonp(`http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony?len=5`, null, function (err, data) {
  console.log(err, data)
})
axios.post('http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony2', {
  a: 333
}).then(rsp => {
  console.log(rsp.data)
})

setTimeout(() => {
  jsonp(`http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony?len=2`, null, function (err, data) {
    console.log(err, data)
  })
}, 1000)
