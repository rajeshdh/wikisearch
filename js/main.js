var all_langs = [
    ["en", "English", "English", "5 900 000"],
    ["es", "español", "Spanish", "1 500 000"],
    ["fur", "furlan", "Friulian", "3 300"],
    ["hyw", "Արեւմտահայերէն", "Western Armenian", "0"],
    ["ug", "ئۇيغۇرچە / Uyghurche", "Uyghur", "4 100"],
    ["ur", "اردو", "Urdu", "150 000"],
    ["ar", "العربية", "Arabic", "900 000"],
    ["ks", "कॉशुर / کٲشُر", "Kashmiri", "320"],
    ["ne", "नेपाली", "Nepali", "32 000"],
    ["hi", "हिन्दी", "Hindi", "130 000"],
];

function PopulateDropDownList() {
 
     var languageselect = document.getElementById("languageselect");
    
     //Add the Options to the DropDownList.
     for (var i = 0; i < all_langs.length; i++) {
         var option = document.createElement("OPTION");
         option.innerHTML = `${all_langs[i][2]} - (${all_langs[i][1]})`;

         option.value = all_langs[i][0];
         languageselect.options.add(option);
     }
 }

 PopulateDropDownList();