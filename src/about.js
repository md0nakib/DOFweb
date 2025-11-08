
  // <script src="about.js"></script>
  //<a href="#" id="aboutLink">👤 অ্যাবাউট</a>
  
 




const aboutLink = document.getElementById('aboutLink');
aboutLink.onclick = (e) => {
    e.preventDefault();
    history.pushState(null, "", "#/about");
    content.innerHTML = `

    `;
    closeSidebar();
  };