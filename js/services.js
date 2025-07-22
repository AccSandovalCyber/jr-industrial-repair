const services = {
  fabrication: {
    title: "Fabrication Services",
    description: "We provide custom metal fabrication services, including structural welding, heavy equipment repair, and more.",
    image: "images/fabrication.jpg"
  },

  machining: {
    title: "Rebuild & Machining Services",
    description: "We specialize in precision machining for custom parts and machinery.",
    image: "images/services.jpeg"
  } 
}



function showContent(section) {
  const contentDiv = document.getElementById('content');
  const service = services[section];

  contentDiv.innerHTML = `
    <h4 class="text-xl font-bold mb-4">${service.title}</h4>
    <p>${service.description}</p>
    <img src="${service.image}" alt="${service.title}" class="w-full mt-4 opacity-0" /> 
  `;
  
  const image = contentDiv.querySelector('img');
  image.onload = () => {
    image.classList.remove("opacity-0"); // Fade in the image when it's loaded
    image.classList.add("opacity-100");  // Ensure opacity is 100% after load
  };
}
