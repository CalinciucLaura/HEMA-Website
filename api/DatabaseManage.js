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
  `INSERT INTO plantAbout (category, name, type, color, conditions, season,description) VALUES 
  ("house", "orchid", "flower", "pink", "sun", "spring", "Orchids are a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant. The definition of orchidaceae is any of numerous plants of the orchid family usually having flowers of unusual shapes and beautiful colors"),
  ("house", "peace lily", "flower", "white", "shade", "summer", "Peace lilies are tropical, evergreen plants that thrive on the forest floor, where they receive dappled sunlight and consistent moisture. Replicating these conditions in the home is the key to getting your peace lily to be happy, healthy, and thriving."),
  ("house", "anthurium", "flower", "red", "shade", "autumn", "Anthuriums are tropical plants, so they thrive in high humidity. They also need bright, indirect light and should be watered regularly. The soil should be kept moist, but not wet. If the leaves start to turn yellow, it may be a sign that the plant is getting too much light."),
  ("house", "kaffir lily", "flower", "white", "sun", "summer", ),
  ("house", "rubber plant", "plant", "green", "sun", "all", ),
  ("house", "aloe vera", "plant", "green", "water", "all"),
  ("house", "philondron", "plant", "green", "sun", "all"),
  ("house", "zz plant", "plant", "green", "shade", "all"),
  ("house", "poinsettia", "plant", "red", "sun", "winter"),
  ("house", "jasmine", "flower", "white", "sun", "summer"),
  ("house", "gloxinia", "flower", "red", "sun", "summer"),
  ("house", "ameryllis", "flower", "red", "sun", "winter"),
  ("house", "spider plant", "plant", "green", "sun", "all"),
  ("house", "chinese evergreen", "plant", "green", "shade", "all"),
  ("house", "snake plant", "plant", "green", "sun", "all", ),
  ("house", "bird's nest fern", "plant", "green", "shade", "all", "The bird's nest fern, scientifically known as Asplenium nidus, is a unique and visually captivating fern species. It earned its name due to the shape of its leaves, which resemble a nest or a bird's roosting place. Native to tropical regions and rainforests, the bird's nest fern is often found growing on trees or rocks, absorbing moisture and nutrients from the air and surrounding environment."),
  ("house", "monsterra", "plant", "green", "sun", "all", "Monstera, also known as Monstera deliciosa or the Swiss cheese plant, is a popular and visually striking tropical houseplant. Its large, glossy, and uniquely perforated leaves give it the nickname "Swiss cheese plant" due to their resemblance to holey cheese. The Monstera is native to the tropical rainforests of Central and South America and has gained immense popularity for its aesthetic appeal and ease of care."),
  ("house", "bromeliad", "plant", "red", "sun", "all", "Bromeliads are stunning and versatile tropical plants that belong to the Bromeliaceae family. Known for their vibrant colors, unique rosette-shaped foliage, and exotic flower spikes, bromeliads are popular for their ornamental value."),
  ("house", "succulent", "plant", "green", "sun", "all","Succulents are charming, low-maintenance plants known for their fleshy leaves and ability to store water. These unique plants come in a wide variety of shapes, sizes, and colors, making them a favorite among plant enthusiasts. With their thick, juicy leaves and often compact growth habits, succulents are well-suited for indoor and outdoor spaces alike." ),
  ("house", "devil's ivy", "plant", "green", "sun", "all", "Devil's ivy is a popular houseplant that is tolerant of a wide range of growing conditions. It can be grown in low light or bright light, and it can be grown in soil or in water. It is also a very easy plant to propagate, and it can be grown from cuttings or from seed."),
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
  ("garden", "daisy", "flower", "white", "sun", "summer"),
  ("garden", "chrysanthemum", "flower", "red", "sun", "autumn"),
  ("garden", "snowdrop", "flower", "white", "sun", "spring"),
  ("garden", "crocus", "flower", "purple", "sun", "spring"),
  ("garden", "cherry tree", "tree", "pink", "sun", "summer"),
  ("garden", "apple tree", "tree", "white", "sun", "summer"),
  ("garden", "vine", "shrub", "green", "sun", "autumn"),
  ("garden", "apricot tree", "tree", "orange", "sun", "summer"),
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
  INSERT INTO plantAbout (category, name, type, color, conditions, season,description ) VALUES
  ("tropical", "bird of paradise", "flower", "orange", "sun", "summer", "The bird of paradise is a very popular tropical flower that is widely used for wedding bouquets and table arrangements. The bird of paradise is also known as crane flower because of its shape that resembles a crane. The bird of paradise is native to South Africa and requires a lot of sunlight to bloom. The bird of paradise is a very popular tropical flower that is widely used for wedding bouquets and table arrangements. The bird of paradise is also known as crane flower because of its shape that resembles a crane. The bird of paradise is native to South Africa and requires a lot of sunlight to bloom."),
  ("tropical", "alpinia galanga", "flower", "red", "sun", "summer", "Alpinia galanga, a plant in the ginger family, bears a rhizome used largely as an herb in Unani medicine and as a spice in Arab cuisine and Southeast Asian cookery. It is one of four plants known as galangal and is differentiated from the others with the common name greater galangal."),
  ("tropical", "palm tree", "tree", "green", "sun", "summer", "Palm trees are a botanical family of perennial lianas, shrubs, and trees. They are the only members of the family Arecaceae, which is the only family in the order Arecales. They grow in hot climates."),
  ("tropical", "hibiscus", "flower", "pink", "sun", "summer", "Hibiscus is a genus of flowering plants in the mallow family, Malvaceae. The genus is quite large, comprising several hundred species that are native to warm temperate, subtropical and tropical regions throughout the world."),
  ("tropical", "heliconia", "flower", "red", "sun", "summer", "Heliconia, derived from the Greek word Ἑλικώνιος, is a genus of flowering plants in the monotypic family Heliconiaceae. Most of the ca 194 known species are native to the tropical Americas, but a few are indigenous to certain islands of the western Pacific and Maluku."),
  ("tropical", "plumeria", "flower", "pink", "sun", "summer",  "Plumeria is a genus of flowering plants in the family Apocynaceae. Most species are deciduous shrubs or small trees. The species variously are endemic to Mexico, Central America and the Caribbean, and as far south as Brazil and north as Florida, but are grown as cosmopolitan ornamentals in warm regions."),
  ("tropical", "blue torch cactus", "flower", "blue", "sun", "summer", "The blue torch cactus is a columnar cactus that is native to South America. The blue torch cactus is a columnar cactus that is native to South America. The blue torch cactus is a columnar cactus that is native to South America."),
  ("tropical", "passiflora foetida", "flower", "white", "sun", "summer", "Passiflora foetida is a species of passion flower that is native to the southwestern United States, Mexico, the Caribbean, Central America, and much of South America. It has been introduced to tropical regions around the world, such as Southeast Asia and Hawaii."),
  ("tropical", "santa rita cactus", "flower", "purple", "sun", "summer", "The santa rita cactus is a columnar cactus that is native to South America. The santa rita cactus is a columnar cactus that is native to South America. The santa rita cactus is a columnar cactus that is native to South America."),
  ("tropical", "dracunculus vulgaris", "flower", "maroon", "sun", "summer", "Dracunculus vulgaris, the dragon arum, is a species of flowering plant in the family Araceae, native to the Balkans and southwestern Asia. It is related to the cuckoo pint of Britain, and is also known as the black arum, black dragon, black lily, dragonwort, ragons, snake lily, stink lily, voodoo lily, and wine lily."),
  ("tropical", "dietes grandiflora", "flower", "white", "sun", "summer", "Dietes grandiflora, the large wild iris, fairy iris, butterfly iris, Fortnight lily or African iris, is a species of flowering plant in the family Iridaceae, native to Southern Africa. It is a rhizomatous perennial plant, evergreen where rainfall and temperatures are adequate, deciduous where there is a dry season."),
  ("tropical", "calotropis procera", "flower", "white", "sun", "summer", "Calotropis procera is a species of flowering plant in the family Apocynaceae that is native to North Africa, Tropical Africa, Western Asia, South Asia, and Indochina. The green globes are actually seed pods that contain hundreds of seeds each. The green globes are actually seed pods that contain hundreds of seeds each. The green globes are actually seed pods that contain hundreds of seeds each."),
  ("tropical", "calliandra tergemina", "flower", "pink", "sun", "summer", "Calliandra is a genus of flowering plants in the pea family, Fabaceae, subfamily Mimosoideae. The genus comprises about 140 species of trees and shrubs that are native to tropical and subtropical regions of the Americas."),
  ("tropical", "antigonon leptopus", "flower", "pink", "sun", "summer", "Antigonon leptopus, commonly known as coral vine, coral creeper, Mexican creeper, chain of love, hearts on a chain, hearts-on-a-rope, is a species of plant in the buckwheat family, Polygonaceae. It is native to Mexico and Central America."),
  ("tropical", "arisaema triphyllum", "flower", "green", "sun", "summer", "Arisaema triphyllum, commonly called Jack-in-the-pulpit, is a herbaceous perennial plant native to eastern North America, occurring in moist woodlands and thickets from Nova Scotia west to Minnesota, and south to southern Florida and Texas."),
  ("tropical", "ti plant", "flower", "red", "sun", "summer", "Cordyline fruticosa is an evergreen flowering plant in the family Asparagaceae. The plant is of great cultural importance to the traditional animistic religions of Austronesian and Papuan peoples of the Pacific Islands, New Zealand, Island Southeast Asia, and Papua New Guinea."),
  ("tropical", "areca palm", "flower", "orange", "sun", "summer", "Dypsis lutescens, also known as golden cane palm, areca palm, yellow palm, or butterfly palm, is a species of flowering plant in the family Arecaceae, native to Madagascar and naturalized in the Andaman Islands, Réunion, El Salvador, Cuba, Puerto Rico, the Canary Islands, southern Florida, Haiti, the Dominican Republic, Jamaica, the Leeward Islands and the Leeward Antilles."),
  ("tropical", "hoya", "flower", "brown", "shade", "summer", "Hoya is a genus of 200–300 species of tropical plants in the dogbane family, Apocynaceae. Most are native to several countries of Asia such as Philippines, India, Thailand, Malaysia, Vietnam, Bangladesh, Indonesia, Polynesia, New Guinea, and vast variety of species could also be found in Australia."),
  ("tropical", "orange tree", "tree", "orange", "sun", "summer", "The orange tree is an evergreen, flowering tree, with an average height of 9 to 10 m, although some very old specimens can reach 15 m. Its oval leaves, alternately arranged, have crenulate margins and are 4 to 10 cm long. The orange tree is an evergreen, flowering tree, with an average height of 9 to 10 m, although some very old specimens can reach 15 m. Its oval leaves, alternately arranged, have crenulate margins and are 4 to 10 cm long. The orange tree is an evergreen, flowering tree, with an average height of 9 to 10 m, although some very old specimens can reach 15 m. Its oval leaves, alternately arranged, have crenulate margins and are 4 to 10 cm long."),
  ("tropical", "lemon tree", "tree", "yellow", "sun", "summer", "The lemon, Citrus limon, is a species of small evergreen tree in the flowering plant family Rutaceae, native to South Asia, primarily North eastern India. The tree's ellipsoidal yellow fruit is used for culinary and non-culinary purposes throughout the world, primarily for its juice, which has both culinary and cleaning uses."),
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
  ("medicinal", "salvia", "shrub", "purple", "sun", "all", "Salvia is the largest genus of plants in the mint family, Lamiaceae, with nearly 1000 species of shrubs, herbaceous perennials, and annuals. Within the Lamiaceae, Salvia is part of the tribe Mentheae within the subfamily Nepetoideae."),
  ("medicinal", "dandelion", "herb", "yellow", "sun", "spring", "Taraxacum is a large genus of flowering plants in the family Asteraceae, which consists of species commonly known as dandelions. They are native to Eurasia and North America, but the two commonplace species worldwide, T. officinale and T. erythrospermum, were imports from Europe that now propagate as wildflowers."),
  ("medicinal", "cowberry", "herb", "red", "sun", "summer", "Vaccinium vitis-idaea is a short evergreen shrub in the heath family that bears edible fruit, native to boreal forest and Arctic tundra throughout the Northern Hemisphere from Eurasia to North America."),
  ("medicinal", "saint john's wort", "herb", "yellow", "sun", "summer", "Hypericum perforatum, known as perforate St John's-wort, common Saint John's wort, or simply St John's wort, is a flowering plant in the family Hypericaceae and the type species of the genus Hypericum."),
  ("medicinal", "ashwagandha", "herb", "green", "sun", "summer", "Withania somnifera, known commonly as ashwagandha, Indian ginseng, poison gooseberry, or winter cherry, is a plant in the Solanaceae or nightshade family. Several other species in the genus Withania are morphologically similar. Although commonly used as a medicinal herb in Ayurvedic medicine, there is no conclusive clinical evidence that it is effective for treating any ailment."),
  ("medicinal", "evening primrose", "herb", "yellow", "sun", "summer", "Oenothera biennis, commonly known as evening primrose, is a species of flowering plant in the family Onagraceae, native to eastern and central North America, from Newfoundland west to Alberta, southeast to Florida, and southwest to Texas, and widely naturalized elsewhere in temperate and subtropical regions."),
  ("medicinal", "mint", "herb", "green", "sun", "summer", "Mentha is a genus of plants in the family Lamiaceae. The exact distinction between species is unclear; it is estimated that 13 to 24 species exist. Hybridization occurs naturally where some species range overlap. Many hybrids and cultivars are known."),
  ("medicinal", "chamomile", "herb", "white", "sun", "summer", "Chamomile or camomile is the common name for several daisy-like plants of the family Asteraceae. Two of the species are commonly used to make herbal infusions for traditional medicine, and there is some evidence that chamomile has an effect on health."),
  ("medicinal", "echinacea", "herb", "purple", "sun", "summer", "Echinacea is a genus of herbaceous flowering plants in the daisy family. It has ten species, which are commonly called coneflowers. They are found only in eastern and central North America, where they grow in moist to dry prairies and open wooded areas."),
  ("medicinal", "hawthorn", "herb", "red", "sun", "summer", "Crataegus, commonly called hawthorn, quickthorn, thornapple, May-tree, whitethorn, or hawberry, is a genus of several hundred species of shrubs and trees in the family Rosaceae, native to temperate regions of the Northern Hemisphere in Europe, Asia, North Africa, and North America."),
  ("medicinal", "cat's claw", "herb", "yellow", "sun", "summer", "Uncaria is a genus of flowering plants in the family Rubiaceae. Their distribution covers a large area of the Americas, ranging from the southern part of Texas to the south of South America, being found in tropical and subtropical climates, with most species in the Americas, and Africa having a few species."),
  ("medicinal", "milk thistle", "herb", "pink", "sun", "summer", "Silybum marianum has other common names include cardus marianus, milk thistle, blessed milkthistle, Marian thistle, Mary thistle, Saint Mary's thistle, Mediterranean milk thistle, variegated thistle and Scotch thistle. This species is an annual or biennial plant of the family Asteraceae."),
  ("medicinal", "valerian", "herb", "purple", "sun", "summer", "Valerian is a perennial flowering plant native to Europe and Asia. In the summer when the mature plant may have a height of 1.5 metres, it bears sweetly scented pink or white flowers that attract many fly species, especially hoverflies of the genus Eristalis."),
  ("medicinal", "turmeric", "herb", "yellow", "sun", "summer", "Turmeric is a flowering plant, Curcuma longa of the ginger family, Zingiberaceae, the roots of which are used in cooking. The plant is a perennial, rhizomatous, herbaceous plant native to the Indian subcontinent and Southeast Asia, that requires temperatures between 20 and 30 °C and a considerable amount of annual rainfall to thrive."),
  ("medicinal", "ginkgo biloba", "herb", "green", "sun", "summer", "Ginkgo biloba, commonly known as ginkgo or gingko, also known as the maidenhair tree, is the only living species in the division Ginkgophyta, all others being extinct. It is a member of a very old genus, with some fossils dating back 270 million years."),
  ("medicinal", "rosemary", "herb", "green", "sun", "summer", "Rosmarinus officinalis, commonly known as rosemary, is a woody, perennial herb with fragrant, evergreen, needle-like leaves and white, pink, purple, or blue flowers, native to the Mediterranean region."),
  ("medicinal", "black cohosh", "herb", "white", "sun", "summer", "Actaea racemosa, black cohosh, black bugbane, black snakeroot, or fairy candle, is a species of flowering plant of the family Ranunculaceae. It is native to eastern North America from the extreme south of Ontario to central Georgia, and west to Missouri and Arkansas."),
  ("medicinal", "thyme", "herb", "green", "sun", "summer", "Thyme is any member of the genus Thymus of aromatic perennial evergreen herbs in the mint family Lamiaceae. Thymes are relatives of the oregano genus Origanum. They have culinary, medicinal, and ornamental uses, the species most commonly cultivated and used for culinary purposes being Thymus vulgaris."),
  ("medicinal", "panax", "herb", "red", "sun", "summer", "Panax ginseng, also known as Asian ginseng, Chinese ginseng, or Korean ginseng, is a species of plant whose root is the original source of ginseng. It is native to China, Korea, and Russia. It has been used in traditional Chinese medicine for thousands of years, often for improving stamina and mental performance."),
  ("medicinal", "aloe vera medicinal", "plant", "green", "water", "all", "Aloe vera is a succulent plant species of the genus Aloe. An evergreen perennial, it originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world. It is cultivated for agricultural and medicinal uses."),
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
