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
         console.log(data);
       },
       error : function(result, statut, error){
         console.log(error);
         console.log(statut);
         console.log(result);
       }
    });
  });
}
