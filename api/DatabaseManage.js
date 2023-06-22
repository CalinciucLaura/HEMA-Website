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

db.exec(
  `INSERT INTO plantAbout (category, name, type, color, conditions, season, description) VALUES 
  ("house", "orchid", "flower", "pink", "sun", "spring", "Orchids are a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant. The definition of orchid is a flowering plant of the orchid family, which is the biggest family of flowering plants in the world."),
  ("house", "peace lily", "flower", "white", "shade", "summer", "Peace lilies are tropical, evergreen plants that thrive on the forest floor, where they receive dappled sunlight and consistent moisture. Replicating these conditions in the home is the key to getting your peace lily to be happy, healthy, and thriving."),
  ("house", "anthurium", "flower", "red", "shade", "autumn","Anthuriums are relatively easy to grow, have attractive foliage and under the proper environment, produce long lasting flowers year round. They are also known as Painted Tongue, Flamingo Flower (Flamingo Lily) or Tail Flower."),
  ("house", "kaffir lily", "flower", "white", "sun", "summer", "Kaffir lily, also known as Clivia, is a flowering plant native to South Africa, featuring clusters of vibrant, trumpet-shaped flowers atop long stalks. It is appreciated for its striking blooms, which can range in color from orange to red and yellow. Kaffir lilies are commonly cultivated as houseplants or in outdoor gardens, and they thrive in shaded or partially shaded areas. They are known for their hardiness and ability to brighten up indoor or outdoor spaces with their colorful flowers."),
  ("house", "rubber plant", "plant", "green", "sun", "all","The rubber plant, scientifically known as Ficus elastica, is a popular houseplant with large, glossy leaves that have a rubbery texture. It is native to Southeast Asia and is named for the latex sap it produces, which was historically used to make rubber. Rubber plants are valued for their attractive foliage and ability to tolerate low light conditions. They are often grown as indoor plants and can reach impressive heights with proper care."),
  ("house", "aloe vera", "plant", "green", "water", "all", "Aloe vera is a succulent plant known for its fleshy, gel-filled leaves that have medicinal and cosmetic uses. It has a long history of being cultivated for its healing properties, including soothing burns, moisturizing the skin, and promoting overall skin health. Aloe vera plants are easy to grow and are commonly kept as houseplants for their ornamental appeal and practical benefits."),
  ("house", "philondron", "plant", "green", "sun", "all", "Philodendron is a genus of tropical plants known for their large, glossy leaves and vining growth habit. They are popular as houseplants and come in various species and cultivars, with different leaf shapes and patterns. Philodendrons are appreciated for their ornamental value and relatively easy care requirements, making them a common choice for indoor greenery." ),
  ("house", "zz plant", "plant", "green", "shade", "all","The ZZ plant, scientifically known as Zamioculcas zamiifolia, is a popular indoor plant characterized by its glossy, dark green leaves and ability to tolerate low light conditions. It is a hardy and resilient plant, making it ideal for beginners or those with limited gardening experience. The ZZ plant is valued for its attractive foliage and ability to purify indoor air."),
  ("house", "poinsettia", "plant", "red", "sun", "winter","Poinsettia is a vibrant and iconic holiday plant known for its large, colorful bracts that surround small, yellow flowers, and it is often associated with Christmas festivities. Native to Mexico, it has become a popular decorative plant during the winter season, symbolizing joy and celebration."),
  ("house", "jasmine", "flower", "white", "sun", "summer", "Jasmine is a fragrant flowering plant belonging to the Oleaceae family, known for its delicate white or yellow flowers and sweet, intoxicating scent. It is commonly used in perfumery, aromatherapy, and tea, and holds cultural significance in various traditions around the world."),
  ("house", "gloxinia", "flower", "red", "sun", "summer", "Gloxinia is a genus of tropical flowering plants that are known for their showy, bell-shaped flowers and lush foliage. They belong to the family Gesneriaceae and are native to Central and South America. Gloxinias are popular as houseplants and are cultivated for their vibrant blooms in various colors such as red, purple, pink, and white."),
  ("house", "ameryllis", "flower", "red", "sun", "winter", "Amaryllis is a genus of flowering plants that are native to South Africa and South America. They are known for their large, showy flowers that bloom in a variety of colors, including red, pink, white, and orange. Amaryllis plants are popular as houseplants and are often given as gifts during the winter holiday season."),
  ("house", "spider plant", "plant", "green", "sun", "all", "Spider plants are popular houseplants that are known for their long, narrow leaves and ability to tolerate a wide range of growing conditions. They are native to tropical and subtropical regions of Africa and Asia and are commonly cultivated as ornamental plants for their attractive foliage. Spider plants are easy to care for and are often chosen as beginner plants for those new to gardening."),
  ("house", "chinese evergreen", "plant", "green", "shade", "all","Chinese evergreen, scientifically known as Aglaonema, is a popular indoor plant cherished for its attractive foliage and ability to thrive in low-light conditions. It is native to tropical and subtropical regions of Asia and features large, glossy leaves with variegated patterns of green, silver, and sometimes, hints of red. Chinese evergreen plants are known for their adaptability, making them suitable for various indoor environments. They are appreciated for their air-purifying qualities and are commonly chosen as ornamental plants for homes and offices."),
  ("house", "snake plant", "plant", "green", "sun", "all"),
  ("house", "bird's nest fern", "plant", "green", "shade", "all"),
  ("house", "monsterra", "plant", "green", "sun", "all"),
  ("house", "bromeliad", "plant", "red", "sun", "all"),
  ("house", "succulent", "plant", "green", "sun", "all"),
  ("house", "devil's ivy", "plant", "green", "sun", "all","Devil's ivy is a popular houseplant that is tolerant of a wide range of growing conditions. It is a fast-growing, evergreen vine with green, yellow, or white variegated heart-shaped leaves. It may also be referred to as pothos or golden pothos."),
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

db.exec(
  `
  INSERT INTO plantAbout (category, name, type, color, conditions, season,description) VALUES
  ("garden", "roses", "flower", "red", "sun", "summer","Roses are a popular crop for both domestic and commercial cut flowers. Generally they are harvested and cut when in bud, and held in refrigerated conditions until ready for display at their point of sale."),
  ("garden", "liliac", "shrub", "purple", "sun","spring","Lilacs are popular shrubs in parks and gardens throughout the temperate zone, and several hybrids and numerous cultivars have been developed. The term French lilac is often used to refer to modern double-flowered cultivars, thanks to the work of prolific breeder Victor Lemoine."),
  ("garden", "dahlias", "flower", "purple", "sun", "summer","Dahlias are a genus of bushy, tuberous, herbaceous perennial plants native to Mexico and Central America. A member of the Asteraceae, dicotyledonous plants, related species include the sunflower, daisy, chrysanthemum, and zinnia."),
  ("garden", "peony", "flower", "pink", "sun", "spring","Peonies are native to Asia, Europe and Western North America. Scientists differ on the number of species that can be distinguished, ranging from 25 to 40, although the current consensus is 33 known species."),
  ("garden", "lavender", "shrub", "purple", "sun", "summer","Lavender is a genus of 47 known species of flowering plants in the mint family, Lamiaceae. It is native to the Old World and is found in Cape Verde and the Canary Islands, and from Europe across to northern and eastern Africa, the Mediterranean, southwest Asia to southeast India."),
  ("garden", "lily", "flower", "red", "sun", "summer","Lilium is a genus of herbaceous flowering plants growing from bulbs, all with large prominent flowers. Lilies are a group of flowering plants which are important in culture and literature in much of the world."),
  ("garden", "violet", "flower", "purple", "shade", "spring","Violets are a genus of flowering plants in the family Violaceae. It is the largest genus in the family, containing between 525 and 600 species."),
  ("garden", "daffodils", "flower", "yellow", "sun", "spring","Daffodils are perennial plants with spring blooming, trumpet-shaped flowers that are usually yellow. They are native to meadows and woods in Europe, North Africa and West Asia."),
  ("garden", "petunia", "flower", "pink", "sun", "summer","Petunias are one of the most popular garden bedding flowers. They have wide trumpet shaped flowers and branching foliage that is hairy and somewhat sticky. Petunias are prolific bloomers, although some forms require deadheading to keep them going."),
  ("garden", "sunflower", "flower", "yellow", "sun", "summer","Sunflowers are usually tall annual or perennial plants that in some species can grow to a height of 300 cm or more. They bear one or more wide, terminal capitula, with bright yellow ray florets at the outside and yellow or maroon disc florets inside."),
  ("garden", "daisy", "flower", "white", "sun", "summer","Daisies are native to north and central Europe. They are composed of white petals and a yellow center. Daisies are not made of just one flower. A Daisy is made up of two types of flowers - disk florets and petal-like white ray florets."),
  ("garden", "chrysanthemum", "flower", "red", "sun", "autumn","Chrysanthemums, sometimes called mums or chrysanths, are flowering plants of the genus Chrysanthemum in the family Asteraceae. They are native to East Asia and northeastern Europe. Most species originate from East Asia and the center of diversity is in China."),
  ("garden", "snowdrop", "flower", "white", "sun", "spring","Snowdrops are a genus of about 20 species of bulbous perennial herbaceous plants in the family Amaryllidaceae. Most flower in winter, before the vernal equinox, but certain species flower in early spring and late autumn."),
  ("garden", "crocus", "flower", "purple", "sun", "spring","Crocus is a genus of flowering plants in the iris family comprising 90 species of perennials growing from corms. Many are cultivated for their flowers appearing in autumn, winter, or spring. Crocuses are native to woodland, scrub, and meadows from sea level to alpine tundra in North Africa and the Middle East, central and southern Europe, in particular Krokos, Greece, on the islands of the Aegean, and across Central Asia to Xinjiang Province in western China."),
  ("garden", "cherry tree", "tree", "pink", "sun", "summer","A cherry blossom is a flower of many trees of genus Prunus. The most well-known species is the Japanese cherry, Prunus serrulata, which is commonly called sakura. They are widely distributed, especially in the temperate zone of the Northern Hemisphere including Japan, Taiwan, Korea, Mainland China, Nepal, India, Pakistan, Afghanistan, Iran, Myanmar, Thailand and West Siberia."),
  ("garden", "apple tree", "tree", "white", "sun", "summer","The apple tree is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus."),
  ("garden", "vine", "shrub", "green", "sun", "autumn","A vine is any plant with a growth habit of trailing or scandent stems, lianas or runners. The word vine can also refer to such stems or runners themselves, for instance, when used in wicker work."),
  ("garden", "apricot tree", "tree", "orange", "sun", "summer","The apricot is a small tree, 8–12 m tall, with a trunk up to 40 cm in diameter and a dense, spreading canopy. The leaves are ovate, 5–9 cm long and 4–8 cm wide, with a rounded base, a pointed tip and a finely serrated margin. The flowers are 2–4.5 cm in diameter, with five white to pinkish petals; they are produced singly or in pairs in early spring before the leaves. The fruit is a drupe similar to a small peach, 1.5–2.5 cm diameter, from yellow to orange, often tinged red on the side most exposed to the sun; its surface can be smooth or velvety with very short hairs. The flesh is usually firm and not very juicy. Its taste can range from sweet to tart."),
  ("garden", "tulip", "flower", "pink", "sun", "spring","Tulips are spring-blooming perennials that grow from bulbs. Depending on the species, tulip plants can grow as short as 4 inches (10 cm) or as high as 28 inches (71 cm). The tulip's large flowers usually bloom on scapes with leaves in a rosette at ground level and a single flowering stalk arising from amongst the leaves."),
  ("garden", "hydrangeas", "shrub", "blue", "shade", "summer","Hydrangea is a genus of 70–75 species of flowering plants native to southern and eastern Asia and the Americas. By far the greatest species diversity is in eastern Asia, notably China, Japan, and Korea. Most are shrubs 1 to 3 meters tall, but some are small trees, and others lianas reaching up to 30 m (98 ft) by climbing up trees."),
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
  ("tropical", "bird of paradise", "flower", "orange", "sun", "summer"),
  ("tropical", "alpinia galanga", "flower", "red", "sun", "summer"),
  ("tropical", "palm tree", "tree", "green", "sun", "summer"),
  ("tropical", "hibiscus", "flower", "pink", "sun", "summer"),
  ("tropical", "heliconia", "flower", "red", "sun", "summer"),
  ("tropical", "plumeria", "flower", "pink", "sun", "summer"),
  ("tropical", "blue torch cactus", "flower", "blue", "sun", "summer"),
  ("tropical", "passiflora foetida", "flower", "white", "sun", "summer"),
  ("tropical", "santa rita cactus", "flower", "purple", "sun", "summer"),
  ("tropical", "dracunculus vulgaris", "flower", "maroon", "sun", "summer"),
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
  ("medicinal", "salvia", "shrub", "purple", "sun", "all"),
  ("medicinal", "dandelion", "herb", "yellow", "sun", "spring"),
  ("medicinal", "cowberry", "herb", "red", "sun", "summer"),
  ("medicinal", "saint john's wort", "herb", "yellow", "sun", "summer"),
  ("medicinal", "ashwagandha", "herb", "green", "sun", "summer"),
  ("medicinal", "evening primrose", "herb", "yellow", "sun", "summer"),
  ("medicinal", "mint", "herb", "green", "sun", "summer"),
  ("medicinal", "chamomile", "herb", "white", "sun", "summer"),
  ("medicinal", "echinacea", "herb", "purple", "sun", "summer"),
  ("medicinal", "hawthorn", "herb", "red", "sun", "summer"),
  ("medicinal", "cat's claw", "herb", "yellow", "sun", "summer"),
  ("medicinal", "milk thistle", "herb", "pink", "sun", "summer"),
  ("medicinal", "valerian", "herb", "purple", "sun", "summer"),
  ("medicinal", "turmeric", "herb", "yellow", "sun", "summer"),
  ("medicinal", "ginkgo biloba", "herb", "green", "sun", "summer"),
  ("medicinal", "rosemary", "herb", "green", "sun", "summer"),
  ("medicinal", "black cohosh", "herb", "white", "sun", "summer"),
  ("medicinal", "thyme", "herb", "green", "sun", "summer"),
  ("medicinal", "panax", "herb", "red", "sun", "summer"),
  ("medicinal", "aloe vera medicinal", "plant", "green", "water", "all")
  `,
  (err) => {
    if (err) {
      console.error(err.message);
    }
  }
);

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
