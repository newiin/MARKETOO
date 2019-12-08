(function() {
  var placesAutocomplete = places({
    appId: "plJDHYOLM3C8",
    apiKey: "c809c8f9627d79078ffc288d65d3a349",
    container: document.querySelector("#billing_address"),
    templates: {
      value: function(suggestion) {
        return suggestion.name;
      }
    }
  }).configure({
    type: "address"
  });
  placesAutocomplete.on("change", function resultSelected(e) {
    document.querySelector("#billing_city").value = e.suggestion.county || "";
    document.querySelector("#billing_area").value = e.suggestion.city || "";
    document.querySelector("#billing_state").value =
      e.suggestion.administrative || "";
    document.querySelector("#billing_country").value =
      e.suggestion.country || "";
  });
})();

(function() {
  var placesAutocomplete = places({
    appId: "plJDHYOLM3C8",
    apiKey: "c809c8f9627d79078ffc288d65d3a349",
    container: document.querySelector("#shipping_address"),
    templates: {
      value: function(suggestion) {
        return suggestion.name;
      }
    }
  }).configure({
    type: "address"
  });
  placesAutocomplete.on("change", function resultSelected(e) {
    document.querySelector("#shipping_city").value = e.suggestion.county || "";
    document.querySelector("#shipping_area").value = e.suggestion.city || "";
    document.querySelector("#shipping_state").value =
      e.suggestion.administrative || "";
    document.querySelector("#shipping_country").value =
      e.suggestion.country || "";
  });
})();
