function getInfo(){
  var data = {};
  $(document).ready(() => {
    var name = document.getElementById("#countryName");
    //`https://restcountries.com/v3.1/name/${name}`
    $.ajax({
       url : 'https://restcountries.com/v3.1/name/USA',
       method : 'GET',
       data: data,
       success : function(result){
         var newData = JSON.stringify(result);
         console.log(result);
         $("#info").text(newData);
       },
       error : function(result, statut, error){
         console.log(error);
         console.log(statut);
         console.log(result);
       }
    });
  });
}

function filterData(){
  
}
