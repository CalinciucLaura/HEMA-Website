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
  ("house", "snake plant", "plant", "green", "sun", "all", "Snake plants, also known as Sansevieria or mother-in-law's tongue, are a popular houseplant known for their hardiness and ability to tolerate low light conditions. They are native to tropical regions of Africa and Asia and are characterized by their long, upright leaves with variegated patterns of green and yellow. Snake plants are valued for their ornamental appeal and air-purifying qualities, making them a common choice for indoor greenery."),
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
