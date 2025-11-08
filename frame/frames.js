// DOM
    const imageUpload = document.getElementById('image-upload');
    const uploadBtn = document.getElementById('upload-btn');
    const cropContainer = document.getElementById('crop-container');
    const cropImage = document.getElementById('crop-image');
    const framesGrid = document.getElementById('frames-grid');
    const previewCanvas = document.getElementById('preview-canvas');
    const cropBtn = document.getElementById('crop-btn');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const loading = document.getElementById('loading');
    const loadingText = document.getElementById('loading-text');

    let cropper = null;
    let selectedFrameUrl = null;
    let highResCanvas = null; // 4000x4000

    // Render Frames
    function renderFrames() {
        framesGrid.innerHTML = '';
        frames.forEach(frame => {
            const div = document.createElement('div');
            div.className = 'frame-item';
            div.innerHTML = `<img src="${frame.thumb}" alt="Frame ${frame.id}" loading="lazy">`;
            div.onclick = () => selectFrame(frame.url, div);
            framesGrid.appendChild(div);
        });
    }

    // Select Frame
    function selectFrame(url, el) {
        document.querySelectorAll('.frame-item').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        selectedFrameUrl = url;
        updatePreview();
        showToast('ফ্রেম নির্বাচিত হয়ছে!');
    }

    // Upload
    uploadBtn.onclick = () => imageUpload.click();
    imageUpload.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        loading.style.display = 'flex';
        loadingText.textContent = 'ছবি লোড লইতাছে...';
        const reader = new FileReader();
        reader.onload = (ev) => {
            cropImage.src = ev.target.result;
            cropContainer.style.display = 'block';
            initCropper();
            loading.style.display = 'none';
            showToast('ছবি আপলোড সফল হইলো নাকী!');
        };
        reader.readAsDataURL(file);
    };

    // Init Cropper
    function initCropper() {
        if (cropper) cropper.destroy();
        cropper = new Cropper(cropImage, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 0.85,
            responsive: true,
            zoomable: true,
            scalable: true,
            cropBoxResizable: true,
            cropBoxMovable: true,
            toggleDragModeOnDblclick: false,
        });
    }

    // Update Preview (500x500)
    function updatePreview() {
        if (!cropper) return;
        const cropped = cropper.getCroppedCanvas({
            width: 500,
            height: 500,
            imageSmoothingQuality: 'high'
        });

        const ctx = previewCanvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        previewCanvas.width = 500 * dpr;
        previewCanvas.height = 500 * dpr;
        previewCanvas.style.width = '100%';
        previewCanvas.style.height = 'auto';
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(cropped, 0, 0, 500, 500);

        if (selectedFrameUrl) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => ctx.drawImage(img, 0, 0, 500, 500);
            img.src = selectedFrameUrl;
        }
    }

    // Generate 4000x4000 Image
    async function generateHighResImage() {
        loading.style.display = 'flex';
        loadingText.textContent = 'ছবি তৈরি হচ্ছে...';

        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const cropped = cropper.getCroppedCanvas({
                    width: 4000,
                    height: 4000,
                    imageSmoothingQuality: 'high'
                });

                const offscreen = new OffscreenCanvas(4000, 4000);
                const ctx = offscreen.getContext('2d');
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(cropped, 0, 0, 4000, 4000);

                if (selectedFrameUrl) {
                    const frameImg = new Image();
                    frameImg.crossOrigin = 'anonymous';
                    frameImg.onload = () => {
                        ctx.drawImage(frameImg, 0, 0, 4000, 4000);
                        resolve(offscreen);
                    };
                    frameImg.onerror = () => resolve(offscreen);
                    frameImg.src = selectedFrameUrl;
                } else {
                    resolve(offscreen);
                }
            });
        });
    }

    // Crop Button
    cropBtn.onclick = () => {
        if (cropper) {
            updatePreview();
            showToast('ক্রপ সম্পন্ন হয়ছে!');
        } else {
            showToast('প্রথমে ছবি আপলোড করুন।কেমন 😁', 'error');
        }
    };

    // Download 4000x4000
    downloadBtn.onclick = async () => {
        if (!cropper) return showToast('প্রথমে ছবি আপলোড করুন।কেমন🫠', 'error');
        const highRes = await generateHighResImage();
        highRes.convertToBlob({ type: 'image/png' }).then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `D. M O faruk fan frame -${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
            loading.style.display = 'none';
            showToast(' ডাউনলোড হচ্ছে!');
        });
    };

    // Share 4000x4000
    shareBtn.onclick = async () => {
        if (!cropper) return showToast('প্রথমে ছবি আপলোড করুন। কেমন', 'error');
        const highRes = await generateHighResImage();
        const blob = await highRes.convertToBlob({ type: 'image/png' });
        const file = new File([blob], 'D.M Osman Faruk Fan photo frame.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    files: [file],
                    title: 'আমার  ফ্রেমযুক্ত ছবি',
                    text: 'দেখুন আমার সুন্দর ছবি!',
                });
                showToast('শেয়ার সফল!');
            } catch (err) {
                showToast('শেয়ার ব্যর্থ।', 'error');
            }
        } else {
            showToast('শেয়ার সমর্থিত নয়। ডাউনলোড করুন।', 'error');
        }
        loading.style.display = 'none';
    };

    // Toast
    function showToast(msg, type = 'info') {
        Toastify({
            text: msg,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: type === 'error' ? '#ef476f' : 'linear-gradient(135deg, #06d6a0, #1b9aaa)',
        }).showToast();
    }

    // Init
    renderFrames();