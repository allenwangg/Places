var loadFoodFromXML = function() {
  function parseRSS(uri, callback) {
    $.ajax({
      type: "GET",
      url: uri,
      headers: {"Access-Control-Allow-Origin": "*"},
      xhrFields: {
        withCredentials: false
      },
      dataType: 'xml',
      success: function(data) {
        callback(data);
      }
    });
  }

  var handleXML = function(data) {
    $xmlDoc = $(data);
    var eventswithfood = {};
    $xmlDoc.find("item").each(function(index) {
      var title = $(this).find("title").text();
      var link = $(this).find("link").text();
      var pubDate = $(this).find("pubDate").text();
      var description = $(this).find("description").text();
      var origContent = $(this).find("content").text();
      if (origContent != description) {
        if (origContent.length < description.length) {
          origContent = description;
        }
      }
      var content = origContent.toLowerCase();
      var keywords = ["free food", "free snack", "free snacks", "free drink", "free drinks", "snack will be provided", "snack provided",
      "snacks will be provided", "snacks provided", "food will be provided", "food provided", "drink will be provided", "drink provided",
      "drinks will be provided", "drinks provided", "refreshment", "free pizza", "pizza", "cookies", "cupcakes", "cupcake", "donut",
      "donuts", "coffee", "apple cider", "beverage"];



      for (var i = 0; i < keywords.length; i++) {
        if (content.includes(keywords[i])) {
          var data = new Text(content);
          data.parseWords();
          data.setMonth();
          data.setDayFromWord();
          data.setDayFromNumber();
          data.setDateFromFormat();
          data.setDateFromRelative();
          data.setTime();

          eventswithfood[title] = {time: data.getStartDate(), location: data.getLocation(), content: origContent};
          console.dir(eventswithfood[title]);
          break;
        }
      }


    });
    console.dir(eventswithfood);
    Storage.saveObject(Storage._foodNameSpace, eventswithfood);
  }

  parseRSS("proxy.php", handleXML);
}
