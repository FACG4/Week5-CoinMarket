function fetchs(url, callback){
    let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
      // let response = JSON.parse(xhr.responseText);
      let response = xhr.responseText;
      callback(response);
    }
  }
  xhr.open('GET', url);
  xhr.send();
}

function getData(){
 fetchs('/data', function(response){

   console.log('hhhh' + response);
 })
}

getData()

//on keyup event listener => call calculate
function calculate(input,value){
  return input  * value

}
