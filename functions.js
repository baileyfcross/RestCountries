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
         //console.log(newData);
         $("#errinfo").text("");
         clearData();
         filterData(result);
       },
       error : function(result, statut, error){
         clearData();
         $("#errinfo").text("Country Not Found, Try retyping or using another name");
       }
    });
  });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function clearData(){
  $("#countryFlag").remove();
  $("#COA").remove();
  $('#mapInfo').remove();
  $(".info").remove();
}
function filterData(result){
  /*
  Common name and official name for the country
  */
  var commonName = $(`<div id="commonName" class ="info col-6"><p>Common Name: ${result[0].name.common}</p></div>`)
  var officialName = $(`<div id="officialName" class ="info col-6"><p>Official Name: ${result[0].name.official}</p></div>`);
  $('#names').append(commonName);
  $('#names').append(officialName);

  /*
  Capital and Population information about the country
  */
  var capital = $(`<div id="capital" class ="info col-3"><p>Capital: ${result[0].capital[0]}</p></div>`);
  var capitalCoords = $(`<div id="capitalCoords" class ="info col-4"><p>Capital Coordinates: ${result[0].capitalInfo.latlng[0]}, ${result[0].capitalInfo.latlng[1]}</p></div>`);
  var pop = $(`<div id="pop" class ="info col-3"><p>Population: ${new Intl.NumberFormat().format(result[0].population)}</p></div>`)
  $('#popAndCap').append(capital);
  $('#popAndCap').append(capitalCoords);
  $('#popAndCap').append(pop);

  /*
  Misc Infomation about the country
  */
  if(result[0].fifa != null){
    var fifaInfo = $(`<div id="fifaInfo" class ="info col-12"><p>Fifa Name: ${result[0].fifa}</p></div>`);
    $('#miscInfo').append(fifaInfo);
  }
  if(result[0].translations.deu != null){
    var germInfo = $(`<div id="germInfo" class ="info col-12"><p>Common Name in German: ${result[0].translations.deu.common}</p></div>`);
    $('#miscInfo').append(germInfo);
  }
  if(result[0].translations.zho != null){
    var zhoInfo = $(`<div id="zhoInfo" class ="info col-12"><p>Common Name in Chinese: ${result[0].translations.zho.common}</p></div>`);
    $('#miscInfo').append(zhoInfo);
  }
  if(result[0].translations.ara != null){
    var araInfo = $(`<div id="zhoInfo" class ="info col-12"><p>Common Name in Arabic: ${result[0].translations.ara.common}</p></div>`);
    $('#miscInfo').append(araInfo);
  }
  var startInfo = $(`<div id="startInfo" class ="info col-12"><p>Start of the Week: ${capitalizeFirstLetter(result[0].startOfWeek)}</p></div>`);
  $('#miscInfo').append(startInfo);

  /*
  Map Link, Coat of Arms and Flag of the country
  */
  if(result[0].maps != null){
    var map = $(`<div class ="info col-12"><a href = "${result[0].maps.googleMaps}" target="_blank" rel="noreferrer noopener" id = "mapInfo" class = "info">Link to a Map of the Country</a></div>`)
    $("#mapItems").append(map);
  }
  if(result[0].flags != null){
    var flag = $(`<div class ="info col-6"><p class ='info'>Country Flag: </p><img src ="${result[0].flags.png}" alt="countries flag" id="countryFlag" class="info"></div>`);
    $("#mapItems").append(flag);
  }
  /*
  If the Coat of Arms image is there, then add it to the page
  */
  if(result[0].coatOfArms.length != undefined || result[0].coatOfArms.png){
    var coa = $(`<div class ='col-6'><p class ='info'>Coat of Arms: </p><img src ="${result[0].coatOfArms.png}" alt="coat of arms" id="COA" class="info"></div>`);
    $("#mapItems").append(coa);
  }
}
