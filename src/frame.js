// <script src="frame.js"></script>

//  <a href="#" id="frameLink">Frame</a> 
/* h1 {
  text-align: center;
  color: var(--text);
  margin-bottom: 10px;
  font-size: 2.5rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}


.container {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
}

.card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(46, 125, 50, 0.15);
  overflow: hidden;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid #81c784;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(46, 125, 50, 0.25);
}

.img {
  height: 200px;
  background: linear-gradient(135deg, #a5d6a7, #66bb6a);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.img::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.img img {
  width: 140px;
  height: 140px;
  border-radius: 0%;
  object-fit: cover;
  border: 5px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.text {
  padding: 20px;
  text-align: center;
}

.text h3 {
  margin: 0 0 10px;
  color: #2e7d32;
  font-size: 1.4rem;
}

.text p {
  margin: 0 0 18px;
  color: #4caf50;
  font-size: 0.95rem;
  line-height: 1.5;
}

.btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
  transition: all 0.3s ease;
}

.btn:hover {
  background: #388e3c;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(56, 142, 60, 0.4);
}

.btn a {
  color: white;
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    gap: 20px;
  }
  
  .card {
    width: 100%;
    max-width: 320px;
  }
}

*/



  const frameLink = document.getElementById('frameLink');
  
  //frame
  frameLink.onclick = (e) => {
    e.preventDefault();
    history.pushState(null, "", "#/frame");
    content.innerHTML = `
    <h1>প্রোফাইল ফ্রেম</h1>
    <div class="container">
        <!-- Card 1 -->
        <div class="card">
            <div class="img">
                <img src="https://via.placeholder.com/140?text=নাম" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -১</h3>
                <p>শুধু মাত্র নাম দিয়ে</p>
                <button class="btn"><a href="index.html#NakibLab" data-src="#">📘 Important Link 1</a></button>
            </div>
        </div>

        <!-- Card 2 -->
        <div class="card">
            <div class="img">
                <img src="https://i.ibb.co.com/Z6dZgDVh/anny-47.png?text=ছবি+নাম" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -২</h3>
                <p>ছবি ও নাম সহ</p>
                <button class="btn"><a href="#/etc" data-src="../k.html">📘 Important Link 2</a></button>
            </div>
        </div>

        <!-- Card 3 -->
        <div class="card">
            <div class="img">
                <img src="https://via.placeholder.com/140?text=পদবি" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -৩</h3>
                <p>নাম ও পদবি সহ</p>
                <button class="btn"><a href="#/etc" data-src="../k.html">📘 Important Link 3</a></button>
            </div>
        </div>

        <!-- Card 4 -->
        <div class="card">
            <div class="img">
                <img src="https://via.placeholder.com/140?text=বিবরণ" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -৪</h3>
                <p>সংক্ষিপ্ত বিবরণ সহ</p>
                <button class="btn"><a href="#/etc" data-src="../k.html">📘 Important Link 4</a></button>
            </div>
        </div>

        <!-- Card 5 -->
        <div class="card">
            <div class="img">
                <img src="https://via.placeholder.com/140?text=যোগাযোগ" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -৫</h3>
                <p>যোগাযোগ তথ্য সহ</p>
                <button class="btn"><a href="#/etc" data-src="../k.html">📘 Important Link 5</a></button>
            </div>
        </div>

        <!-- Card 6 -->
        <div class="card">
            <div class="img">
                <img src="https://via.placeholder.com/140?text=অভিজ্ঞতা" alt="প্রোফাইল ছবি">
            </div>
            <div class="text">
                <h3>ফ্রেম -৬</h3>
                <p>অভিজ্ঞতা ও দক্ষতা</p>
                <button class="btn"><a href="#/etc" data-src="k.html">📘 Important Link 6</a></button>
            </div>
        </div>
    </div>
    `;
    closeSidebar();
  };
