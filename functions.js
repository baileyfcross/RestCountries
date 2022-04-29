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
         var newData = JSON.stringify(result,null,4);
         console.log(newData);
         filterData(result)
         //$("#info").text(result[0].fifa);
       },
       error : function(result, statut, error){
         console.log(error);
         console.log(statut);
         console.log(result);
       }
    });
  });
}

function filterData(result){

  $("#info").text("Fifa Name: " + result[0].fifa);
}
