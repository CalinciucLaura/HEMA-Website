const { waitForDebugger } = require("inspector");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "Database\\person.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the person database.");
  }
);

// db.exec(
//   'INSERT INTO plant (cathegory) VALUES ("House"), ("Tree"), ("Sun"), ("Spring"));',
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//   }
// );

/*
db.exec(
  `INSERT INTO plantAbout (category, name, type, color, conditions, season) VALUES 
  ("house", "orchid", "flower", "pink", "sun", "spring"),
  ("house", "peace lily", "flower", "white", "shade", "summer"),
  ("house", "anthurium", "flower", "red", "shade", "autumn"),
  ("house", "kaffir lily", "flower", "white", "sun", "summer"),
  ("house", "rubber plant", "plant", "green", "sun", "all"),
  ("house", "aloe vera", "plant", "green", "water", "all"),
  ("house", "philodendron", "plant", "green", "sun", "all"),
  ("house", "zz plant", "plant", "green", "shade", "all"),
  ("house", "poinsettia", "plant", "red", "sun", "winter"),
  ("house", "jasmine", "flower", "white", "sun", "summer"),
  ("house", "gloxinia", "flower", "red", "sun", "summer"),
  ("house", "amaryllis", "flower", "red", "sun", "winter"),
  ("house", "spider plant", "plant", "green", "sun", "all"),
  ("house", "chinese evergreen", "plant", "green", "shade", "all"),
  ("house", "snake plant", "plant", "green", "sun", "all"),
  ("house", "bird's nest fern", "plant", "green", "shade", "all"),
  ("house", "monstera", "plant", "green", "sun", "all"),
  ("house", "bromeliad", "plant", "red", "sun", "all"),
  ("house", "succulent", "plant", "green", "sun", "all"),
  ("house", "devil's ivy", "plant", "green", "sun", "all")
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

db.exec(
  `
  INSERT INTO plantAbout (category, name, type, color, conditions, season) VALUES
  ("garden", "roses", "flower", "red", "sun", "summer"),
  ("garden", "liliac", "shrub", "purple", "sun","spring"),
  ("garden", "dahlias", "flower", "purple", "sun", "summer"),
  ("garden", "peony", "flower", "pink", "sun", "spring"),
  ("garden", "lavender", "shrub", "purple", "sun", "summer"),
  ("garden", "lily", "flower", "red", "sun", "summer"),
  ("garden", "violet", "flower", "purple", "shade", "spring"),
  ("garden", "daffodils", "flower", "yellow", "sun", "spring"),
  ("garden", "petunia", "flower", "pink", "sun", "summer"),
  ("garden", "sunflower", "flower", "yellow", "sun", "summer"),
  ("garden", "daisy", "flower", "white", "sun", "autumn"),
  ("garden", "chrysanthemum", "flower", "red", "sun", "autumn"),
  ("garden", "snowdrop", "flower", "white", "sun", "spring"),
  ("garden", "crocus", "flower", "purple", "sun", "spring"),
  ("garden", "cherry tree", "tree", "pink", "sun", "spring"),
  ("garden", "apple tree", "tree", "white", "sun", "spring"),
  ("garden", "vine", "shrub", "green", "sun", "autumn"),
  ("garden", "apricot tree", "tree", "orange", "sun", "spring"),
  ("garden", "tulip", "flower", "pink", "sun", "spring"),
  ("garden", "hydrangeas", "shrub", "blue", "shade", "summer")
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

db.exec(
  `
  INSERT INTO plantAbout (category, name, type, color, conditions, season) VALUES
  ("tropical", "bird of paradise", "flower", "orange", "sun", "spring"),
  ("tropical", "alpina purpurata", "flower", "red", "sun", "summer"),
  ("tropical", "palm tree", "tree", "green", "sun", "summer"),
  ("tropical", "hibiscus", "flower", "pink", "sun", "summer"),
  ("tropical", "heliconia", "flower", "red", "sun", "summer"),
  ("tropical", "plumeria", "flower", "pink", "sun", "summer"),
  ("tropical", "blue torch cactus", "flower", "blue", "sun", "summer"),
  ("tropical", "passiflora foetida", "flower", "white", "sun", "summer"),
  ("tropical", "santa rita cactus", "flower", "purple", "sun", "summer"),
  ("tropical", "dracunulus vulgaris", "flower", "maroon", "sun", "summer"),
  ("tropical", "dietes grandiflora", "flower", "white", "sun", "summer"),
  ("tropical", "calotropis procera", "flower", "white", "sun", "summer"),
  ("tropical", "calliandra tergemina", "flower", "pink", "sun", "summer"),
  ("tropical", "antigonon leptopus", "flower", "pink", "sun", "summer"),
  ("tropical", "arisaema triphyllum", "flower", "green", "sun", "summer"),
  ("tropical", "ti plant", "flower", "red", "sun", "summer"),
  ("tropical", "areca palm", "flower", "orange", "sun", "summer"),
  ("tropical", "hoya", "flower", "brown", "shade", "summer"),
  ("tropical", "orange tree", "tree", "orange", "sun", "summer"),
  ("tropical", "lemon tree", "tree", "yellow", "sun", "summer")
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

db.exec(
  `
  INSERT INTO plantAbout (category, name, type, color, conditions, season) VALUES
  ("medicinal", "salvia", "shrub", "purple", "sun", "winter"),
  ("medicinal", "dandelion", "herb", "yellow", "sun", "spring"),
  ("medicinal", "cowberry", "herb", "red", "sun", "summer"),
  ("medicinal", "saint john's wort", "herb", "yellow", "sun", "summer"),
  ("medicinal", "aswagandha", "herb", "green", "sun", "summer"),
  ("medicinal", "evening primrose", "herb", "yellow", "sun", "summer"),
  ("medicinal", "mint", "herb", "green", "sun", "summer"),
  ("medicinal", "chammomile", "herb", "white", "sun", "summer"),
  ("medicinal", "echinaea", "herb", "purple", "sun", "summer"),
  ("medicinal", "hawthorn", "herb", "white", "sun", "summer"),
  ("medicinal", "cat's claw", "herb", "yellow", "sun", "summer"),
  ("medicinal", "milk thistle", "herb", "pink", "sun", "summer"),
  ("medicinal", "valerian", "herb", "pink", "sun", "summer"),
  ("medicinal", "turmeric", "herb", "yellow", "sun", "summer"),
  ("medicinal", "ginkgo", "herb", "green", "sun", "summer"),
  ("medicinal", "rosemary", "herb", "purple", "sun", "summer"),
  ("medicinal", "black cohosh", "herb", "white", "sun", "summer"),
  ("medicinal", "aloe vera", "herb", "green", "water", "all"),
  ("medicinal", "thyme", "herb", "purple", "sun", "summer"),
  ("medicinal", "panax", "herb", "red", "sun", "summer")
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

*/

// name, type, color, conditions, season
/*

//HOUSE
House, Orhid, flower, pink, sun, spring
House, Peace Lily, flower, white, shade, summer
House, Anthurium, flower, red, shade, autumn
House,Kaffir Lily, flower, white, sun,summer
House,Rubber Plant , plant, green, sun,all
House,Aloe Vera, plant, green, water,all
House,Philondron, plant, green, sun,all
House,ZZ plant,plant,green,shade,all 
House,Poinsettia, plant, red, sun, winter
House,Jasmine, flower, white, sun, summer
House,Gloxinia, flower, red, sun, summer
House,Amaryllis, flower,  red, sun, winter
House,Spider Plant, plant, green, sun, all
House,Chinese Evergreen, plant, green, shade, all
House,Snake Plant, plant, green, sun, all
House,Bird's Nest Fern, plant, green, shade, all
House,Monstera, plant, green, sun,all
House,Bromeliad, plant, red, sun, all
House,Succulent, plant, green, sun, all
House,Devil's Ivy, plant, green, sun, all
*/

//GARDEN
/*
Garden, Roses, flower, red, sun, summer
Garden,Liliac, shrub, purple, spring
Garden,Dahlias, flower, purple, suumer
Garden,Peony, flower, Peony, flower, pink, sun , spring
Garden,Lavender, shrub, purple, sun, summer
Garden,Lily, flower,red, sun, summer
Garden,Violet, flower, purple, shade, spring
Garden,Daffodils, flower, yellow, sun, spring
Garden,Petunia, flower, pink, sun, summer
Garden,Sunflower, flower, yellow, sun, summer
Garden,Daisy, flower, white, sun, autumn
Garden,Chrysanthemum, flower, red, sun, autumn
Garden,Snowdrop, flower, white, sun, spring
Garden,Crocus, flower, purple, sun, spring
Garden,Cherry Tree, tree, pink, sun, spring
Garden,Apple Tree, tree, white , sun, spring
Garden,Vine, shrub, green, sun, autumn
Garden,Apricot Tree, tree, orange, sun, spring
Garden,Tulip, flower, pink, sun, spring
Garden,Hydrangeas, shrub,blue,shade, summer
*/

//TROPICAL
/*
Bird Of Paradise, flower, orange, sun, spring
Alpina Purpurata, flower, red, sun, summer
Palm Tree, tree, green, sun, summer
Hibiscus, flower, pink, sun, summer
Heliconia, flower, red, sun, summer
Plumeria, flower, pink, sun, summer
Blue Torch Cactus, flower, blue, sun, summer
Passiflora Foetida, flower, white, sun, summer
Santa Rita Cactus, flower, purple, sun, summer
Dracunulus Vulgaris, flower, maroon, sun, summer
Dietes Grandiflora, flower, white, sun, summer
Calotropis Procera, flower, white, sun, summer
Calliandra Tergemina, flower, pink, sun, summer
Antigonon Leptopus, flower, pink, sun, summer
Arisaema Triphyllum, flower, green, sun, summer
Ti Plant, flower, red, sun, summer
Areca Palm, flower, orange, sun, summer
Hoya, flower, brown, shade, summer
Orange Tree, tree, orange, sun, summer
Lemon Tree, tree, yellow, sun, summer
*/

//MEDICINAL
/*
Salvia, shrub, purple, sun, winter
Dandelion, herb, yellow, sun, spring
Cowberry, herb, red, sun, summer
Saint John's Wort, herb, yellow, sun, summer
Aswagandha, herb, green, sun, summer
Evening Primrose, herb, yellow, sun, summer
Mint, herb, green, sun, summer
Chammomile, herb, white, sun, summer
Echinaea, herb, purple, sun, summer
Hawthorn, herb, white, sun, summer
Cat's Claw, herb, yellow, sun, summer
Milk Thistle, herb, pink, sun, summer
Valerian, herb, pink, sun, summer
Turmeric, herb, yellow, sun, summer
Ginkgo, herb, green, sun, summer
Rosemary, herb, purple, sun, summer
Black Cohosh, herb, white, sun, summer
Aloe Vera, herb, green, water, all
Thyme, herb, purple, sun, summer
Panax, herb, red, sun, summer

*/

//MEDICIAL
// db.exec(
//   'INSERT INTO plantAbout (plant_id, name, color, image) VALUES (4, "Salvia", "Purple", "Salvia.jpg");',
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//   }
// );

console.log("Cathegories inserted in plant table.");

// //TROPICAL
// db.exec(
//   'INSERT INTO plantAbout (plant_id, name, type, color, conditions, season) VALUES (3, "BIRD OF PARADISE", "Orange", "Hibiscus.jpg"), (3,"Heliconia", "Red", "Heliconia.jpg"), (3,"Plumeria", "Red", "Plumeria.jpg"), (3,"Blue Torch Cactus", "Blue", "BlueTorchCactus.jpg"), (3, "Passiflora Foetida", "Purple", "Passiflora.jpg"), (3,"Santa Rita Cactus", "Purple", "SantaRitaCactus.jpg"), (3, "DRACUNULUS VULGARIS", "Maroon", "DracunculusVulgaris.jpg"), (3, "DIETES GRANDIFLORA", "White", "DietesGrandiflora.jpg"), (3, "CALOTROPIS PROCERA", "White", "CalotropisProcera.jpg"), (3, "CALLIANDRA TERGEMINA", "Unknown", "CalliandraTergemina.jpg"), (3, "ANTIGONON LEPTOPUS", "Unknown", "AntigononLeptopus.jpeg"), (3, "ARISAEMA TRIPHYLLUM", "Unknown", "ArisaemaTriphyllum.jpg"), (3, "TI PLANT", "Unknown", "TiPlant.jpg"), (3, "ARECA PALM", "Unknown", "ArecaPalm.jpg"), (3, "HOYA", "Unknown", "Hoya.jpg"), (3, "ORANGE TREE", "Orange", "OrangeTree.jpg"), (3, "LEMON TREE", "Yellow", "LemonTree.jpg");',
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     }
//   }
// );
