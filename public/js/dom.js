const fetch=(method,url,value,cb)=>{
let xhr=new XMLHttpRequest();
xhr.onreadystatechange=()=>{
  if (xhr.readyState===4&&xhr.status===200) {
    let response=JSON.parse(xhr.responseText)
    cb(response)

  }
};
xhr.open(method,url)
xhr.send(value)
}



const selector=(text)=>{
  return document.querySelector(text)
}

const create=(parent,element,content)=>{
let  child=document.createElement(element)
if (content) {
child.textContent=content;
}
if (parent) {
  return selector(parent).appendChild(child)
}
else {
  return child
}
}

const createTable = (response) =>{
  response.forEach((element)=>{
    let rowDiv= create("#resultTable","div",null)
    let array= [
      element.name,element.rank,element.price_usd,
      element.percent_change_1h,(element.last_updated)
    ]
        console.log(array);
    array.forEach((content)=>{
      rowDiv.appendChild(create(null,"div",content))
    })

  })

}

selector("#searchButton").addEventListener('click',(event)=>{
  event.preventDefault();

let inputValue=selector("#inputId").value
// fetch("POST","/search",inputValue,(res)=>{
fetch("GET","https://api.coinmarketcap.com/v1/ticker/",inputValue,(res)=>{
// console.log(res);
createTable(res)
})
})

selector("#formID").addEventListener("submit",(event)=>{
    event.preventDefault();
    let sourceCoin=selector("#sourceCoin").value
    let sourceValue =selector("#inputConvert").value
    let outCoin =selector("#outCoin").value
    fetch("POST","/convert","?"+sourceCoin+"?to"+"?"+outCoin,(res)=>{
      let convertedValue=res
      let toatalConverted=sourceValue*res
      selector("#outputConvert").value
    })
})
