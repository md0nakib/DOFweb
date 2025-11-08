
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('mainContent');
  
  

// Load theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle.onclick = () => {
  body.classList.toggle('dark');
  
  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  }
};
  // ☰ সাইডবার টগল
  menuBtn.onclick = () => sidebar.classList.toggle('show');
  const closeSidebar = () => sidebar.classList.remove('show');


  // 📘 ডাইনামিক embed-link
  document.querySelectorAll('.embed-link').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();

      const src = link.getAttribute('data-src');
      const hash = link.getAttribute('href'); // যেমন #etc

      // ✅ URL আপডেট (reload ছাড়া)
      history.pushState(null, "", hash);

      // ✅ iframe লোড করো
      content.innerHTML = `<iframe src="${src}" loading="lazy"></iframe>`;
      closeSidebar();
    };
  });

  // 🔄 রিফ্রেশ করলে একই হ্যাশ থাকলে iframe আবার লোড হবে
  window.addEventListener('load', () => {
    const currentHash = window.location.hash;
    if (currentHash) {
      const link = document.querySelector(`a[href="${currentHash}"]`);
      if (link && link.classList.contains('embed-link')) {
        const src = link.getAttribute('data-src');
        content.innerHTML = `<iframe src="${src}" loading="lazy"></iframe>`;
      }
    }
  });
  
  
