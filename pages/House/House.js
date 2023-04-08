var pageContent = {
    house: {
        pageTitle: "House",
        textH1 : "HOUSE PLANTS",
        textP : "House plants are plants that are grown indoors in homes and other buildings for ornamental, decorative, or air-purifying purposes. They are typically grown in containers or pots and placed on windowsills, tables, or other surfaces.",
        images:[
             "../../images/Main/Orhid.jpg",
             "../../images/Main/PeaceLily.jpg",
             "../../images/Main/Anthurium.jpg",
             "../../images/Main/KafirLili.jpg",
             "../../images/Main/RubberPlant (1).jpg",
             "../../images/Main/aloe.jpg",
             "../../images/Main/Philondron.jpg",
             "../../images/Main/ZzPlant.jpg",
             "../../images/Main/Poinsettia.jpg",
             "../../images/Main/Jasmine.jpg",
             "../../images/Main/Gloxinia.jpg",
             "../../images/Main/Ameryllis.jpg",
             "../../images/Main/SpiderPlant.jpg",
             "../../images/Main/Chinese.jpg",
             "../../images/Main/SnakePlant.jpg",
             "../../images/Main/Bird.jpg" ,
             "../../images/Main/Monsterra.jpg",
             "../../images/Main/Bromeliad.jpg",
             "../../images/Main/Succulent.jpg",
             "../../images/Main/Devil's Ivy.jpg"
        ],
        texts:[
            "ORHID",
            "PEACE LILY",
            "ANTHURIUM",
            "KAFIR LILI",
            "RUBBER PLANT",
            "ALOE VERA",
            "PHILONDRON",
            "ZZ PLANT",
            "POINSETTIA",
            "JASMINE",
            "GLOXINIA",
            "AMERYLLIS",
            "SPIDER PLANT",
            "CHINESE EVERGREEN",
            "SNAKE PLANT",
            "BIRD'S NEST FERN",
            "MONSTERRA",
            "BROMELIAD",
            "SUCCULENT",
            "DEVIL'S IVY"
        ]
    },

    garden: {
        pageTitle: "Garden",
        textH1 : "GARDEN PLANTS",
        textP: "Garden plants refer to any type of plants that are grown outdoors in a garden, whether it's a small flower bed, a vegetable garden, or a large landscaped area. Garden plants can be chosen for their beauty, fragrance, or practical use such as for providing food, shade or privacy.",
        images : [
            "../../images/Main/Roses.jpg",
            "../../images/Main/liliac.jpg",
            "../../images/Main/Dahlias.jpg",
            "../../images/Main/Hydrangeas.jpg",
            "../../images/Main/Peony.jpg",
            "../../images/Main/Lavender.jpg",
            "../../images/Main/Lily.jpg",
            "../../images/Main/Tulip.jpg",
            "../../images/Main/Violet.jpg",
            "../../images/Main/Daffodils.jpg",
            "../../images/Main/Petunia.jpg",
            "../../images/Main/SunFlower.jpg",          
            "../../images/Main/Daisy.jpg"      

        ],
        texts:[
            "LAURA E PETROANA"
        ]
    },

    wild: {
        pageTitle: "Wild",
        textH1 : "WILD PLANTS",
        textP: "Wild plants are plants that grow naturally and without human intervention in the wild or in natural environments such as forests, meadows, deserts, and wetlands. These plants have adapted to survive in their natural habitat without being cultivated or cared for by humans."
    },

    tropical: {
        pageTitle: "Tropical",
        textH1 : "TROPICAL PLANTS",
        textP:"Tropical plants are plants that are native to tropical regions around the world. These regions are typically located near the equator and have warm temperatures, high humidity, and abundant rainfall throughout the year. Tropical plants have adapted to these conditions and are typically characterized by their lush foliage, vibrant colors, and exotic blooms."
    },

    medicinal: {
        pageTitle: "Medicinal",
        textH1 : "MEDICINAL PLANTS",
        textP: "Medicinal plants are plants that have been traditionally used for their therapeutic or medicinal properties. Many cultures around the world have used medicinal plants for thousands of years to treat various ailments and diseases."
    },
    info: {
        pageTitle: "Info",
        textH1 : "INFO"
    },
    about: {
        pageTitle: "About",
        textH1 : "ABOUT HEMA"
    }
};

function changePageContent(page) {
    document.title = pageContent[page].pageTitle;
    document.getElementById("text-h1").textContent = pageContent[page].textH1 || pageContent[page].pageTitle;
    document.getElementById("text-p").textContent = pageContent[page].textP;
}

function changePageImages(page) {
    var imgElements = document.getElementsByClassName("PLANT-BOX");
    
    for (var i = 0; i < imgElements.length; i++) {

      var imageNumber = i % pageContent[page].images.length;
      var currentImage = pageContent[page].images[imageNumber];
      var currentImgElement = imgElements[i].getElementsByTagName("img")[0];
      currentImgElement.src = currentImage;
      currentImgElement.alt = pageContent[page].pageTitle + " " + (imageNumber + 1);
    }
}

function changeImageTitle(page){
    var textElements = document.getElementsByClassName("TEXT-BOX");

    for (var i = 0; i < textElements.length; i++) {

        var textNumber = i % pageContent[page].texts.length;
        var currentText = pageContent[page].texts[textNumber];
        var currentTextElement = textElements[i].getElementsByTagName("h4")[0];
        currentTextElement.textContent = currentText;
      }

}


document.getElementById("house-link").addEventListener("click", function() {
    changePageContent("house");
    changePageImages("house");
    changeImageTitle("house");
});

document.getElementById("garden-link").addEventListener("click", function() {
    changePageContent("garden");
    changePageImages("garden");
    changeImageTitle("garden");
});

document.getElementById("wild-link").addEventListener("click", function() {
    changePageContent("wild");
});

document.getElementById("tropical-link").addEventListener("click", function() {
    changePageContent("tropical");
});

document.getElementById("medicinal-link").addEventListener("click", function() {
    changePageContent("medicinal");
});

document.getElementById("info-link").addEventListener("click", function() {
    changePageContent("info");
});

document.getElementById("about-link").addEventListener("click", function() {
    changePageContent("about");
});

