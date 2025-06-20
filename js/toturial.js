const SUPER_USER_PASSWORD = "jstf@john123";

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const submitLogin = document.getElementById('submitLogin');
const superUserPassword = document.getElementById('superUserPassword');
const loginError = document.getElementById('loginError');
const videoFormSection = document.getElementById('videoFormSection');
const videoForm = document.getElementById('videoForm');
const videosSection = document.getElementById('videos');
const videoType = document.getElementById('videoType');
const videoUrl = document.getElementById('videoUrl');
const videoFile = document.getElementById('videoFile');
const uploadProgressContainer = document.getElementById('uploadProgressContainer');
const uploadProgress = document.getElementById('uploadProgress');
const uploadPercent = document.getElementById('uploadPercent');

// Edit Modal Elements
const editModal = document.getElementById('editModal');
const closeEditModal = document.getElementById('closeEditModal');
const editVideoForm = document.getElementById('editVideoForm');
const editVideoTitle = document.getElementById('editVideoTitle');
const editVideoType = document.getElementById('editVideoType');
const editVideoUrl = document.getElementById('editVideoUrl');
const editVideoFile = document.getElementById('editVideoFile');
const editUploadProgressContainer = document.getElementById('editUploadProgressContainer');
const editUploadProgress = document.getElementById('editUploadProgress');
const editUploadPercent = document.getElementById('editUploadPercent');

let isSuperUser = false;
let videos = JSON.parse(localStorage.getItem('tutorialVideos') || '[]');
let editIndex = null;

function renderVideos() {
  videosSection.innerHTML = '';
  if (videos.length === 0) {
    videosSection.innerHTML = '<p>No videos posted yet.</p>';
    return;
  }
  videos.forEach((video, idx) => {
    const card = document.createElement('div');
    card.className = 'video-card';
    let content = `<h3>${video.title}</h3>`;
    if (video.type === 'link') {
      content += `<iframe src="https://www.youtube.com/embed/${extractYouTubeID(video.url)}" allowfullscreen></iframe>`;
    } else if (video.type === 'upload' && video.fileData) {
      content += `<video controls src="${video.fileData}"></video>`;
    } else if (video.type === 'other' && video.url) {
      content += `<video controls src="${video.url}"></video>`;
    }
    if (isSuperUser) {
      content += `
        <div class="crud-btns">
          <button class="edit-btn" data-idx="${idx}">Edit</button>
          <button class="delete-btn" data-idx="${idx}">Delete</button>
        </div>
      `;
    }
    card.innerHTML = content;
    videosSection.appendChild(card);
  });

  // Attach event listeners for edit/delete
  if (isSuperUser) {
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.onclick = function() {
        openEditModal(parseInt(this.dataset.idx));
      };
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.onclick = function() {
        if (confirm('Are you sure you want to delete this video?')) {
          videos.splice(parseInt(this.dataset.idx), 1);
          localStorage.setItem('tutorialVideos', JSON.stringify(videos));
          renderVideos();
        }
      };
    });
  }
}

function extractYouTubeID(url) {
  const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#]+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

// Super User Login Modal
loginBtn.onclick = () => {
  loginModal.style.display = 'block';
  superUserPassword.value = '';
  loginError.textContent = '';
};

closeModal.onclick = () => {
  loginModal.style.display = 'none';
};

submitLogin.onclick = () => {
  if (superUserPassword.value === SUPER_USER_PASSWORD) {
    isSuperUser = true;
    loginModal.style.display = 'none';
    videoFormSection.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    renderVideos();
  } else {
    loginError.textContent = 'Incorrect password.';
  }
};

logoutBtn.onclick = () => {
  isSuperUser = false;
  videoFormSection.style.display = 'none';
  loginBtn.style.display = 'inline-block';
  logoutBtn.style.display = 'none';
  renderVideos();
};

window.onclick = function(event) {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
  if (event.target === editModal) {
    editModal.style.display = 'none';
  }
};

// Show/hide input fields based on type
videoType.onchange = function() {
  if (videoType.value === 'link') {
    videoUrl.style.display = 'block';
    videoFile.style.display = 'none';
    videoUrl.placeholder = "YouTube Video URL";
    videoUrl.required = true;
    videoFile.required = false;
    uploadProgressContainer.style.display = 'none';
  } else if (videoType.value === 'upload') {
    videoUrl.style.display = 'none';
    videoFile.style.display = 'block';
    videoUrl.required = false;
    videoFile.required = true;
    uploadProgressContainer.style.display = 'none';
  } else {
    videoUrl.style.display = 'block';
    videoFile.style.display = 'none';
    videoUrl.placeholder = "Direct Video URL";
    videoUrl.required = true;
    videoFile.required = false;
    uploadProgressContainer.style.display = 'none';
  }
};

// Video Posting
videoForm.onsubmit = function(e) {
  e.preventDefault();
  const title = document.getElementById('videoTitle').value.trim();
  const type = videoType.value;
  if (!title) {
    alert('Please enter a title.');
    return;
  }
  if (type === 'link') {
    const url = videoUrl.value.trim();
    if (!url || !extractYouTubeID(url)) {
      alert('Please enter a valid YouTube URL.');
      return;
    }
    videos.unshift({ title, type, url });
    localStorage.setItem('tutorialVideos', JSON.stringify(videos));
    renderVideos();
    videoForm.reset();
    videoUrl.style.display = 'block';
    videoFile.style.display = 'none';
    uploadProgressContainer.style.display = 'none';
  } else if (type === 'upload') {
    const file = videoFile.files[0];
    if (!file) {
      alert('Please select a video file.');
      return;
    }
    uploadProgressContainer.style.display = 'flex';
    uploadProgress.value = 0;
    uploadPercent.textContent = '0%';

    // Simulate upload progress
    const reader = new FileReader();
    reader.onprogress = function(event) {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        uploadProgress.value = percent;
        uploadPercent.textContent = percent + '%';
      }
    };
    reader.onloadstart = function() {
      uploadProgress.value = 0;
      uploadPercent.textContent = '0%';
    };
    reader.onloadend = function(event) {
      uploadProgress.value = 100;
      uploadPercent.textContent = '100%';
      setTimeout(() => {
        uploadProgressContainer.style.display = 'none';
        videos.unshift({ title, type, fileData: event.target.result });
        localStorage.setItem('tutorialVideos', JSON.stringify(videos));
        renderVideos();
        videoForm.reset();
        videoUrl.style.display = 'block';
        videoFile.style.display = 'none';
      }, 500);
    };
    reader.readAsDataURL(file);
  } else if (type === 'other') {
    const url = videoUrl.value.trim();
    if (!url) {
      alert('Please enter a valid video URL.');
      return;
    }
    videos.unshift({ title, type, url });
    localStorage.setItem('tutorialVideos', JSON.stringify(videos));
    renderVideos();
    videoForm.reset();
    videoUrl.style.display = 'block';
    videoFile.style.display = 'none';
    uploadProgressContainer.style.display = 'none';
  }
};

// Edit Modal Logic
function openEditModal(idx) {
  editIndex = idx;
  const video = videos[idx];
  editVideoTitle.value = video.title;
  editVideoType.value = video.type;
  if (video.type === 'link') {
    editVideoUrl.style.display = 'block';
    editVideoFile.style.display = 'none';
    editVideoUrl.value = video.url;
    editVideoUrl.placeholder = "YouTube Video URL";
    editVideoUrl.required = true;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  } else if (video.type === 'upload') {
    editVideoUrl.style.display = 'none';
    editVideoFile.style.display = 'block';
    editVideoUrl.value = '';
    editVideoUrl.required = false;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  } else {
    editVideoUrl.style.display = 'block';
    editVideoFile.style.display = 'none';
    editVideoUrl.value = video.url;
    editVideoUrl.placeholder = "Direct Video URL";
    editVideoUrl.required = true;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  }
  editModal.style.display = 'block';
}

closeEditModal.onclick = () => {
  editModal.style.display = 'none';
};

editVideoType.onchange = function() {
  if (editVideoType.value === 'link') {
    editVideoUrl.style.display = 'block';
    editVideoFile.style.display = 'none';
    editVideoUrl.placeholder = "YouTube Video URL";
    editVideoUrl.required = true;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  } else if (editVideoType.value === 'upload') {
    editVideoUrl.style.display = 'none';
    editVideoFile.style.display = 'block';
    editVideoUrl.required = false;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  } else {
    editVideoUrl.style.display = 'block';
    editVideoFile.style.display = 'none';
    editVideoUrl.placeholder = "Direct Video URL";
    editVideoUrl.required = true;
    editVideoFile.required = false;
    editUploadProgressContainer.style.display = 'none';
  }
};

editVideoForm.onsubmit = function(e) {
  e.preventDefault();
  const title = editVideoTitle.value.trim();
  const type = editVideoType.value;
  if (!title) {
    alert('Please enter a title.');
    return;
  }
  if (type === 'link') {
    const url = editVideoUrl.value.trim();
    if (!url || !extractYouTubeID(url)) {
      alert('Please enter a valid YouTube URL.');
      return;
    }
    videos[editIndex] = { title, type, url };
    localStorage.setItem('tutorialVideos', JSON.stringify(videos));
    renderVideos();
    editModal.style.display = 'none';
  } else if (type === 'upload') {
    const file = editVideoFile.files[0];
    if (!file) {
      // If no new file selected, keep the old fileData
      const oldFileData = videos[editIndex].fileData;
      videos[editIndex] = { title, type, fileData: oldFileData };
      localStorage.setItem('tutorialVideos', JSON.stringify(videos));
      renderVideos();
      editModal.style.display = 'none';
      return;
    }
    editUploadProgressContainer.style.display = 'flex';
    editUploadProgress.value = 0;
    editUploadPercent.textContent = '0%';

    const reader = new FileReader();
    reader.onprogress = function(event) {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        editUploadProgress.value = percent;
        editUploadPercent.textContent = percent + '%';
      }
    };
    reader.onloadstart = function() {
      editUploadProgress.value = 0;
      editUploadPercent.textContent = '0%';
    };
    reader.onloadend = function(event) {
      editUploadProgress.value = 100;
      editUploadPercent.textContent = '100%';
      setTimeout(() => {
        editUploadProgressContainer.style.display = 'none';
        videos[editIndex] = { title, type, fileData: event.target.result };
        localStorage.setItem('tutorialVideos', JSON.stringify(videos));
        renderVideos();
        editModal.style.display = 'none';
      }, 500);
    };
    reader.readAsDataURL(file);
  } else if (type === 'other') {
    const url = editVideoUrl.value.trim();
    if (!url) {
      alert('Please enter a valid video URL.');
      return;
    }
    videos[editIndex] = { title, type, url };
    localStorage.setItem('tutorialVideos', JSON.stringify(videos));
    renderVideos();
    editModal.style.display = 'none';
  }
};

// On load
if (isSuperUser) {
  videoFormSection.style.display = 'block';
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'inline-block';
} else {
  videoFormSection.style.display = 'none';
  loginBtn.style.display = 'inline-block';
  logoutBtn.style.display = 'none';
}
renderVideos();