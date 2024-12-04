// DOM 元素
const promptBox = document.getElementById('promptBox');
const searchBox = document.getElementById('searchBox');
const questionInput = document.getElementById('questionInput');
const exploreBtn = document.getElementById('exploreBtn');
const planeContainer = document.getElementById('planeContainer');
const bookContainer = document.getElementById('bookContainer');
const answerContent = document.getElementById('answerContent');
const shareBtn = document.getElementById('shareBtn');
const askAgainBtn = document.getElementById('askAgainBtn');

// 音频元素
const clickSound = document.getElementById('clickSound');
const searchSound = document.getElementById('searchSound');
const planeSound = document.getElementById('planeSound');
const pageSound = document.getElementById('pageSound');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeStarryBackground();
    setupEventListeners();
});

// 创建星空背景
function initializeStarryBackground() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

// 设置事件监听器
function setupEventListeners() {
    promptBox.addEventListener('click', activateSearchBox);
    exploreBtn.addEventListener('click', handleExplore);
    questionInput.addEventListener('input', handleInput);
    shareBtn.addEventListener('click', handleShare);
    askAgainBtn.addEventListener('click', resetToInitial);
}

// 激活搜索框
function activateSearchBox() {
    playSound(clickSound);
    promptBox.classList.add('hidden');
    setTimeout(() => {
        searchBox.classList.remove('hidden');
        searchBox.style.transform = 'scale(1)';
        questionInput.focus();
    }, 300);
}

// 处理输入
function handleInput(e) {
    const text = e.target.value;
    if (text.length > 0) {
        exploreBtn.classList.add('active');
    } else {
        exploreBtn.classList.remove('active');
    }
}

// 处理探索按钮点击
function handleExplore() {
    if (!questionInput.value.trim()) return;
    
    playSound(searchSound);
    searchBox.classList.add('hidden');
    
    setTimeout(() => {
        startPlaneAnimation();
    }, 500);
}

// 开始飞机动画
function startPlaneAnimation() {
    planeContainer.classList.remove('hidden');
    playSound(planeSound);
    
    // 设置飞机飞行路径
    const path = [
        { x: '50%', y: '50%', scale: 1 },
        { x: '80%', y: '20%', scale: 0.8 },
        { x: '20%', y: '20%', scale: 0.8 },
        { x: '50%', y: '50%', scale: 1 }
    ];
    
    let currentPoint = 0;
    const animatePlane = () => {
        if (currentPoint >= path.length) {
            showBook();
            return;
        }
        
        const point = path[currentPoint];
        planeContainer.style.left = point.x;
        planeContainer.style.top = point.y;
        planeContainer.style.transform = `scale(${point.scale})`;
        
        currentPoint++;
        setTimeout(animatePlane, 1000);
    };
    
    animatePlane();
}

// 显示书籍
function showBook() {
    planeContainer.classList.add('hidden');
    bookContainer.classList.remove('hidden');
    
    setTimeout(() => {
        playSound(pageSound);
        document.querySelector('.book-cover').style.transform = 'rotateY(-180deg)';
        setTimeout(showAnswer, 1000);
    }, 500);
}

// 显示答案
function showAnswer() {
    const answers = [
        "宇宙会为你指明方向。",
        "相信你的直觉。",
        "是时候采取行动了。",
        "答案就在你心中。",
        "耐心等待最好的时机。"
    ];
    
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    answerContent.textContent = randomAnswer;
    
    // 添加打字机效果
    typeWriter(answerContent, randomAnswer);
}

// 打字机效果
function typeWriter(element, text, index = 0) {
    if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        setTimeout(() => typeWriter(element, text, index + 1), 100);
    }
}

// 处理分享
function handleShare() {
    playSound(clickSound);
    // 实现分享功能
    const answer = answerContent.textContent;
    const shareData = {
        title: '答案之书的启示',
        text: `答案之书告诉我：${answer}`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .catch((error) => console.log('分享失败:', error));
    } else {
        // 如果浏览器不支持原生分享API，可以实现自定义分享面板
        alert('复制成功！你可以将答案分享给朋友。');
    }
}

// 重置到初始状态
function resetToInitial() {
    playSound(clickSound);
    bookContainer.classList.add('hidden');
    document.querySelector('.book-cover').style.transform = 'rotateY(0deg)';
    questionInput.value = '';
    promptBox.classList.remove('hidden');
}

// 播放音效
function playSound(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(error => console.log('播放音效失败:', error));
}

// 添加星尘特效
const starDust = document.querySelector('.star-dust');
function updateStarDust(e) {
    const rect = starDust.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    starDust.style.background = `radial-gradient(circle at ${x}px ${y}px, 
        rgba(153, 204, 255, 0.2) 0%, 
        rgba(153, 204, 255, 0.1) 20%, 
        transparent 60%)`;
}

document.addEventListener('mousemove', updateStarDust);
