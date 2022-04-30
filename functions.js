$(document).on("keydown", "form", function(event) {
    return event.key != "Enter";
});

function getInfo(){
  var data = {};
  $(document).ready(() => {
    var name = $("#countryName").val();
    console.log(name);
    //`https://restcountries.com/v3.1/name/${name}`
    //'https://restcountries.com/v3.1/name/USA'
    $.ajax({
       url : `https://restcountries.com/v3.1/name/${name}`,
       method : 'GET',
       data: data,
       success : function(result){
         var newData = JSON.stringify(result,null,4);
         console.log(newData);
         $("#countryFlag").remove();
         $("#errinfo").text("");
         filterData(result);
       },
       error : function(result, statut, error){
         console.log(error);
         console.log(statut);
         console.log(result);
         $("#countryFlag").remove();
         $(".info").text("");
         $("#errinfo").text("Country Not Found, Try retyping or using another name");
       }
    });
  });
}

function filterData(result){
  $("#commonName").text("Common Name: " + result[0].name.common);
  $('#capital').text("Capital: " + result[0].capital[0]);
  $("#fifaInfo").text("Fifa Name: " + result[0].fifa);
  $("#germInfo").text("Name in German: " + result[0].translations.deu.common);
  var flag = $(`<img src ="${result[0].flags.png}" alt="countries flag" id="countryFlag" class="info">`);
  $("#form").append(flag);
}
