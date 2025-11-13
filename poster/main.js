
    const uploadImageInput = document.getElementById('uploadImage');
    const nameInput = document.getElementById('name');
    const postInput = document.getElementById('post');
    const preview = document.getElementById('preview');
    const nameView = document.getElementById('nameView');
    const postView = document.getElementById('postView');
    const downloadBtn = document.getElementById('downloadBtn');
    const status = document.getElementById('status');

    let userImageURL = null;
    const bgImageURL = '/src/img/pr1.png';
    const POSTER_WIDTH = 340;
    const POSTER_HEIGHT = 474.24;
    const INNER_WIDTH = 329;
    const INNER_HEIGHT = 464.24;
    const SCALE = 10; // 10x = ~900 DPI

    // Live Preview
    uploadImageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          userImageURL = ev.target.result;
          preview.style.backgroundImage = `url(${userImageURL})`;
        };
        reader.readAsDataURL(file);
      }
    });

    nameInput.addEventListener('input', () => {
      nameView.textContent = nameInput.value || 'আপনার নাম';
    });

    postInput.addEventListener('input', () => {
      postView.textContent = postInput.value || 'আপনার পদবি';
    });

    // High Quality Download
    downloadBtn.addEventListener('click', async () => {
      status.textContent = 'তৈরি হচ্ছে...';

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = POSTER_WIDTH * SCALE;
      canvas.height = POSTER_HEIGHT * SCALE;

      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load background image
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = bgImageURL;

      await new Promise(resolve => {
        bgImg.onload = () => {
          // Draw inner background (329x464.24) at (5,5) scaled
          const dx = 5 * SCALE;
          const dy = 5 * SCALE;
          const dWidth = INNER_WIDTH * SCALE;
          const dHeight = INNER_HEIGHT * SCALE;
          ctx.drawImage(bgImg, dx, dy, dWidth, dHeight);
          resolve();
        };
        bgImg.onerror = () => {
          status.textContent = 'ব্যাকগ্রাউন্ড ইমেজ লোড হয়নি!';
          resolve();
        };
      });

      // Draw user image
      if (userImageURL) {
        const userImg = new Image();
        userImg.src = userImageURL;
        await new Promise(resolve => {
          userImg.onload = () => {
            const imgX = (POSTER_WIDTH - 180) * SCALE;
            const imgY = (POSTER_HEIGHT - 200) * SCALE;
            const imgW = 180 * SCALE;
            const imgH = 200 * SCALE;
            ctx.drawImage(userImg, imgX, imgY, imgW, imgH);
            resolve();
          };
        });
      }

      // Draw green bar
      ctx.fillStyle = '#10572E';
      ctx.fillRect(0, (POSTER_HEIGHT - 35) * SCALE, POSTER_WIDTH * SCALE, 35 * SCALE);

      // Draw Name
      ctx.font = `bold ${16 * SCALE}px 'LSC', Tahoma, Arial, sans-serif`;
      ctx.fillStyle = '#EFEFEF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const nameText = nameInput.value || 'মো শফিকুল ইসলাম';
      ctx.fillText(nameText, (POSTER_WIDTH / 2) * SCALE, (POSTER_HEIGHT - 17.5) * SCALE);

      // Draw Post
      ctx.font = `${10 * SCALE}px 'LSC', Tahoma, Arial, sans-serif`;
      ctx.fillStyle = '#EFEFEF';
      const postText = postInput.value || 'সাধারণ সম্পাদক, ১নং ওয়ার্ড গুজাদিয়া';
      ctx.fillText(postText, (POSTER_WIDTH / 2) * SCALE, (POSTER_HEIGHT - 5.5) * SCALE);

      // Download
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `poster_4k_${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        status.textContent = 'ডাউনলোড সম্পূর্ণ!';
        setTimeout(() => status.textContent = '', 3000);
      }, 'image/png', 1.0);
    });

    // Initialize preview
    window.addEventListener('load', () => {
      preview.style.backgroundImage = `url(${bgImageURL})`;
      nameView.textContent = 'মো শফিকুল ইসলাম';
      postView.textContent = 'সাধারণ সম্পাদক, ১নং ওয়ার্ড গুজাদিয়া';
    });
