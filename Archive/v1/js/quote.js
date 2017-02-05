$(document).ready(function(){


var quoteText = "";
var quoteAuthor = "";


var displayQuote = function(quote){
    quoteText = quote.quoteText;
    quoteAuthor = quote.quoteAuthor;

    $('#quoteText').html("<div>" + quoteText + "</div>");
    $('#quoteAuthor').html("<div>" + quoteAuthor + "</div>");
    // if author is empty field, print '-unknown'
    quoteAuthor == "" && $('#quoteAuthor').html("<div>" + "-Unknown" + "</div>");

$('#tweet').attr("href", "https://twitter.com/intent/tweet?text=" + quoteText + quoteAuthor + ". www.randomQuoteGenerator.com" ).attr("target", "_blank")


};

var getQuote = function (){
  $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp", // doesnt work without this...error: wrong function name
      dataType: "jsonp",
      success: displayQuote,
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      } })

};




$('#getQuoteButton').on("click", function(event){
  getQuote();
});

//get first quote;
  getQuote();
//$('#getQuoteButton').on("click", getQuote());

 }); // end ready




// features to add:
  // authors name links to a wiki page / google search

  // facebook / twitter links
    // Hello%20world
