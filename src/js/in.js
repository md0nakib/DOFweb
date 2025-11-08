// **গুরুত্বপূর্ণ: আপনার Web App URL এখানে বসান**
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzZ4MHvLNxy7rn8U90TCiatulhDk8wzEGrql97FfjYPafzPz8Xm8NF00hul0Hpu0yvz/exec';

// Visitor-এর তথ্য সংগ্রহ এবং Apps Script-এ পাঠানো
function trackVisitorAndDisplayCount() {
    
    // ব্রাউজার এবং ডিভাইস সংক্রান্ত তথ্য
    const userAgent = navigator.userAgent; 
    
    let visitorData = {
        url: window.location.href,
        lat: 'N/A: Permission Denied/Not Supported',
        lon: 'N/A: Permission Denied/Not Supported',
        userAgent: userAgent 
    };

    // Geolocation API ব্যবহার করে Location সংগ্রহ
    if (navigator.geolocation) {
        // ইউজার যদি লোকেশন শেয়ার করার অনুমতি দেয়
        navigator.geolocation.getCurrentPosition(
            (position) => {
                visitorData.lat = position.coords.latitude;
                visitorData.lon = position.coords.longitude;
                sendData(visitorData);
            },
            (error) => {
                // অনুমতি না দিলে বা কোনো এরর হলে
                sendData(visitorData); 
            },
            {
                // অপশন: সর্বোচ্চ ৫ সেকেন্ড অপেক্ষা করবে, ক্যাশ করা লোকেশন দেবে না
                timeout: 5000, 
                maximumAge: 0
            }
        );
    } else {
        // Geolocation API সাপোর্ট না করলে
        sendData(visitorData);
    }
}

// Apps Script-এ POST রিকোয়েস্ট পাঠানো
function sendData(data) {
    fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'cors',
        // Content-Type: 'text/plain' ব্যবহার করা আবশ্যক যাতে Apps Script JSON ডেটা পার্স করতে পারে
        headers: {
            'Content-Type': 'text/plain', 
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // প্রাপ্ত সংখ্যাটি ওয়েবসাইটে দেখানো
        const countElement = document.getElementById('visitorCount');
        if (countElement) {
            countElement.textContent = result.count;
        }
    })
    .catch(error => {
        console.error('Error saving data or fetching count:', error);
        const countElement = document.getElementById('visitorCount');
        if (countElement) {
            countElement.textContent = 'Error!';
        }
    });
}

// পেজ লোড হওয়া সম্পূর্ণ হলে ফাংশনটি কল করা
window.onload = trackVisitorAndDisplayCount;
