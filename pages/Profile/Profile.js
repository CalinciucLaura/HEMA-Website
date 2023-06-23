const plantName = localStorage.getItem("plant");
const divElement = document.getElementById("favorites");

divElement.innerHTML += ` <div class="PLANT-BOX">
<img src="../../images/Main/${plantName.replace(/\s/g, "")}.jpg" />
<div class = "TEXT-BOX">
 <h3>${plantName}</h3>
 </div>
 </div>
`;
localStorage.removeItem("plant");
