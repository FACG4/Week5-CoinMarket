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

const create=(parent,element,content,classes)=>{

let  child=document.createElement(element)
child.setAttribute("class", classes)
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

    array.forEach((content)=>{
      rowDiv.appendChild(create(null,"div",content,null))
    })

  })

}
//
// selector("#searchButton").addEventListener('click',(event)=>{
//   event.preventDefault();
//
// let inputValue=selector("#inputId").value
// // fetch("POST","/search",inputValue,(res)=>{
// fetch("GET","https://api.coinmarketcap.com/v1/ticker/",inputValue,(res)=>{
// // console.log(res);
// createTable(res)
// })
// })


  let convertedValue = 1;

selector("#converteBtn").addEventListener("click",(event)=>{
    event.preventDefault();
    let sourceCoin=selector("#sourceCoin").value
    let sourceValue =selector("#inputConvert").value
    let outCoin =selector("#outCoin").value
    let values = sourceCoin +'.'+ outCoin ;
    fetch("POST","/c",values,(res)=>{

      convertedValue=Object.values(res)[0]

      console.log(convertedValue);

      // let toatalConverted=sourceValue*res
      // selector("#outputConvert").value

const createDetails = (res,id) =>{

  let array=[res.name,res.price_usd,res.rank]
create("#"+id,"figcaption","Name : "+res.name,"details")
create("#"+id,"figcaption","Price : "+res.price_usd,"details")
create("#"+id,"figcaption","Rank : "+res.rank,"details")

}

if (selector("#searchButton")) {
  selector("#searchButton").addEventListener('click',(event)=>{
    event.preventDefault();

    let inputValue=selector("#inputId").value
    // fetch("POST","/search",inputValue,(res)=>{
    fetch("GET","https://api.coinmarketcap.com/v1/ticker/",inputValue,(res)=>{

      createTable(res)

    })
  })
}

if (selector("#formID")) {
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

}

const deletefig=()=>{
  const array = document.getElementsByClassName('details')
  let array2=Array.prototype.slice.call(array)
  array2.forEach((item)=>{
    item.innerHTML=""
  })
}


const array = document.getElementsByClassName('fig')
let array2=Array.prototype.slice.call(array)
array2.forEach((fig) =>{
  fig.addEventListener("click",(event)=>{
    deletefig()
    let symbol = fig.id
    fetch("GET","https://api.coinmarketcap.com/v1/ticker/",symbol,(res) =>{
      createDetails(res[0],fig.id);

    })
  })

})

  let inputValue = selector("#inputConvert");
inputValue.addEventListener("keyup",(event)=>{
  let calculatedValue = calculate(inputValue.value ,  convertedValue)

  console.log(calculatedValue);


  // let convertedVal = calculate(inputValue);


})
