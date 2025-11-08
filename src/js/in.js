// **আপনার দেওয়া চূড়ান্ত Web App URL এখানে বসানো হয়েছে**
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzZ4MHvLNxy7rn8U90TCiatulhDk8wzEGrql97FfjYPafzPz8Xm8NF00hul0Hpu0yvz/exec';

// Visitor-এর তথ্য সংগ্রহ এবং Apps Script-এ পাঠানো
function trackVisitorAndDisplayCount() {
    
    const userAgent = navigator.userAgent; 
    
    let visitorData = {
        url: window.location.href,
        lat: 'N/A: Permission Denied/Not Supported',
        lon: 'N/A: Permission Denied/Not Supported',
        userAgent: userAgent 
    };

    // Geolocation API ব্যবহার করে Location সংগ্রহ
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                visitorData.lat = position.coords.latitude;
                visitorData.lon = position.coords.longitude;
                sendData(visitorData);
            },
            (error) => {
                sendData(visitorData); 
            },
            {
                timeout: 5000, 
                maximumAge: 0
            }
        );
    } else {
        sendData(visitorData);
    }
}

// Apps Script-এ POST রিকোয়েস্ট পাঠানো
function sendData(data) {
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'text/plain', 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const countElement = document.getElementById('visitorCount');
        if (countElement && result.count !== undefined) {
            countElement.textContent = result.count;
        } else if (result.error) {
             console.error('Apps Script Error:', result.error);
             if(countElement) countElement.textContent = 'Error!';
        }
    })
    .catch(error => {
        console.error('Network Error:', error);
    });
}

// পেজ লোড হওয়া সম্পূর্ণ হলে ফাংশনটি কল করা
window.onload = trackVisitorAndDisplayCount;
