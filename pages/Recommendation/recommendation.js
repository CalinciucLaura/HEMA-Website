const accessKey = "mhn1bf_6krB1bc1YlRGbcqD-llHPZk-LL8hMUHGxJlk";

const fetchPhotos = async () => {
  try {
    // const seed = Date.now();
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

const fetchStatistics = async (photoID) => {
  try {
    const statistics = await fetch(
      "https://api.unsplash.com/photos/" + photoID + "/statistics",
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );
    if (!statistics.ok) {
      throw new Error("Failed to fetch photos");
    }

    return statistics.json();
  } catch (error) {
    console.error("Failed to fetch statistics:", error);
    throw error;
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const photoData = await fetchPhotos();
    const feedContainer = document.getElementById("feed-container");

    const combinedPromise = [];
    const combinedData = [];
    photoData.results.forEach((photo) => {
      const photoID = photo.id;
      combinedPromise.push(fetchStatistics(photoID));

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
      linkElement.target = "_blank";
      linkElement.rel = "noopener noreferrer";
      linkElement.appendChild(attributionElement);

      // Append elements to photo container
      photoContainer.appendChild(imgElement);
      photoContainer.appendChild(linkElement);

      // Append photo container to feed container
      feedContainer.appendChild(photoContainer);
    });
    const resolvedData = await Promise.all(combinedPromise);

    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    resolvedData.forEach((stat, index) => {
      const id = stat.id;
      const totalLikes = stat.likes.total;
      const totalDownloads = stat.downloads.total;
      const totalViews = stat.views.total;
      const photo = photoData.results[index];
      const photoName = photo.alt_description || photo.alt_description;

      const yPos = (index + 1) * 30; // Adjust the vertical position for each line

      doc.text(`Photo Name: ${photoName}`, 10, yPos);
      doc.text(`Photo ID: ${id}`, 120, yPos);
      doc.text(`Total Likes: ${totalLikes}`, 10, yPos + 10);
      doc.text(`Total Downloads: ${totalDownloads}`, 70, yPos + 10);
      doc.text(`Total Views: ${totalViews}`, 130, yPos + 10);

      const dataObject = {
        name: photoName,
        id: id,
        likes: totalLikes,
        downloads: totalDownloads,
        views: totalViews,
      };
      combinedData.push(dataObject);
    });

    //console.log(combinedData);

    // const combinedJSON = JSON.stringify(combinedData);
    // console.log(combinedJSON);

    const csvRows = [];
    const headers = Object.keys(combinedData[0]);
    csvRows.push(headers.join(","));
    combinedData.forEach((data) => {
      const values = Object.values(data);
      csvRows.push(values.join(","));
    });
    const csvContent = csvRows.join("\n");

    const downloadCSV = document.getElementById("downloadCSV");
    const downloadPDF = document.getElementById("downloadPDF");

    // Attach event listener to the button
    downloadCSV.addEventListener("click", () => {
      // Create a download link for the CSV file
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
      );
      downloadLink.setAttribute("download", "data.csv");
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });

    downloadPDF.addEventListener("click", () => {
      // doc.setFontSize(5);
      // doc.setFont("helvetica", "bold");
      const pdfContent = doc.output("blob");

      // Create a download link for the PDF file
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfContent);
      downloadLink.download = "data.pdf";
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
