// recommendation.js
const accessKey = "mhn1bf_6krB1bc1YlRGbcqD-llHPZk-LL8hMUHGxJlk";
const fetchPhotos = async () => {
  try {
    const response = await fetch(
      "https://api.unsplash.com/search/photos?query=plants&per_page=12",
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch photos:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const photoData = await fetchPhotos();
    console.log(photoData.results);
    //to_process = photoData[0].urls.regular;

    const feedContainer = document.getElementById("feed-container");

    photoData.results.forEach((photo) => {
      console.log(photo);
      // Create container for each photo and attribution
      const photoContainer = document.createElement("div");
      photoContainer.classList.add("photo-container");

      // Create image element
      const imgElement = document.createElement("img");
      imgElement.src = photo.urls.regular;
      imgElement.alt = photo.alt_description;

      // Create attribution element
      const attributionElement = document.createElement("p");
      attributionElement.classList.add("attribution");
      // attributionElement.classList.add("text_resize");
      attributionElement.textContent = `Photo by ${photo.user.name} on Unsplash`;

      // Create link element
      const linkElement = document.createElement("a");
      linkElement.classList.add("attribution");
      linkElement.href = photo.links.html;
      linkElement.onclick = this.href;
      linkElement.target = "_blank";
      linkElement.rel = "noopener noreferrer";
      linkElement.appendChild(attributionElement);

      // Append elements to photo container
      photoContainer.appendChild(imgElement);
      photoContainer.appendChild(linkElement);

      // Append photo container to feed container
      feedContainer.appendChild(photoContainer);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
