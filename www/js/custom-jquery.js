 $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'tab_id');
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
    $('select').material_select();
    $(function() {
    $.ajax({
      type: 'GET',
      url: 'https://restcountries.eu/rest/v2/all?fields=name',
      success: function(response) {
        var countryArray = response;
        var dataCountry = {};
        for (var i = 0; i < countryArray.length; i++) {
          //console.log(countryArray[i].name);
          dataCountry[countryArray[i].name] = countryArray[i].flag; //countryArray[i].flag or null
        }
        $('input.origin-autocomplete').autocomplete({
          data: dataCountry,
          limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        });
        
        $('input.dest-autocomplete').autocomplete({
          data: dataCountry,
          limit: 5, // The max amount of results that can be shown at once. Default: Infinity.
        });
      }
    });
  });

  // show more less
  

});
        