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
         $("#COA").remove();
         $('#mapInfo').remove();
         $("#errinfo").text("");
         $(".info").text("");
         filterData(result);
       },
       error : function(result, statut, error){
         $("#countryFlag").remove();
         $("#COA").remove();
         $('#mapInfo').remove();
         $(".info").text("");
         $("#errinfo").text("Country Not Found, Try retyping or using another name");
       }
    });
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterData(result){
  $("#commonName").text("Common Name: " + result[0].name.common);
  $('#officalName').text("Official Name: " + result[0].name.official);
  $('#capital').text("Capital: " + result[0].capital[0]);
  $('#pop').text("Population: " + new Intl.NumberFormat().format(result[0].population));
  $("#fifaInfo").text("Fifa Name: " + result[0].fifa);
  $("#germInfo").text("Name in German: " + result[0].translations.deu.common);
  $('#startInfo').text("Start of the Week: " + capitalizeFirstLetter(result[0].startOfWeek));
  var map = $(`<p class = "info"></p><a href = "${result[0].maps.googleMaps}" target="_blank" rel="noreferrer noopener" id = "mapInfo" class = "info">Link to a Map of the Country</a>`)
  $("#form").append(map);
  var flag = $(`<p class ='info'>Country Flag: </p><img src ="${result[0].flags.png}" alt="countries flag" id="countryFlag" class="info">`);
  $("#form").append(flag);
  var coa = $(`<p class ='info'>Coat of Arms: </p><img src ="${result[0].coatOfArms.png}" alt="coat of arms" id="COA" class="info">`);
  $("#form").append(coa);
}
