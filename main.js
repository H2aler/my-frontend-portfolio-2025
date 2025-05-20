// 프로젝트 데이터
const projects = [
    {
        title_ko: '프론트엔드 개발자 포트폴리오',
        title_en: 'Frontend Developer Portfolio',
        description_ko: '프랑스에서의 학업 경험과 한국에서의 실무 경험을 바탕으로 한 프론트엔드 개발자 포트폴리오입니다. 웹 개발 프로젝트, HTML5 게임 개발 등 다양한 프로젝트 이력을 확인하실 수 있습니다.',
        description_en: 'This is a frontend developer portfolio based on academic experience in France and practical experience in Korea. You can check various project histories such as web development projects and HTML5 game development.',
        github: 'https://github.com/H2aler/my-frontend-portfolio-2025',
        tags: ['HTML5', 'CSS3', 'JavaScript']
    }
];

// 현재 언어 상태 관리
let currentLang = 'ko';

// 언어 변경 함수
function updateTypingText() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    // 새 span 요소 생성
    const line1 = document.createElement('span');
    line1.className = 'line-1';
    line1.setAttribute('data-ko', '안녕하세요,');
    line1.setAttribute('data-en', 'Hello,');
    line1.textContent = currentLang === 'ko' ? '안녕하세요,' : 'Hello,';

    const line2 = document.createElement('span');
    line2.className = 'line-2';
    line2.setAttribute('data-ko', '프론트엔드 개발자');
    line2.setAttribute('data-en', "I'm a Frontend Dev");
    line2.textContent = currentLang === 'ko' ? '프론트엔드 개발자' : "I'm a Frontend Dev";

    const line3 = document.createElement('span');
    line3.className = 'line-3';
    line3.setAttribute('data-ko', '김재현입니다');
    line3.setAttribute('data-en', 'Jaehyun Kim');
    line3.textContent = currentLang === 'ko' ? '김재현입니다' : 'Jaehyun Kim';

    // 기존 span 모두 제거
    typingText.innerHTML = '';
    typingText.appendChild(line1);
    typingText.appendChild(line2);
    typingText.appendChild(line3);

    // 타이핑 애니메이션 재실행
    setTimeout(restartTypingAnimation, 0);
}

function toggleLanguage() {
    currentLang = currentLang === 'ko' ? 'en' : 'ko';
    
    // 모든 data-ko, data-en 속성을 가진 요소의 텍스트 변경
    document.querySelectorAll('[data-ko][data-en]').forEach(element => {
        // 타이핑 텍스트는 updateTypingText에서 처리하므로 제외
        if (element.classList.contains('line-1') || element.classList.contains('line-2') || element.classList.contains('line-3')) return;
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            // 아이콘이 있는 경우 아이콘은 유지
            const icon = element.querySelector('i');
            if (icon) {
                element.innerHTML = icon.outerHTML + text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // 프로젝트 카드 다시 렌더링
    createProjectCards(currentLang);

    // 타이핑 텍스트 갱신 및 애니메이션 재실행
    updateTypingText();
}

// 타이핑 애니메이션 재실행 함수
function restartTypingAnimation() {
    const line1 = document.querySelector('.typing-text .line-1');
    const line2 = document.querySelector('.typing-text .line-2');
    const line3 = document.querySelector('.typing-text .line-3');
    if (!line1 || !line2 || !line3) return;

    [line1, line2, line3].forEach(line => {
        line.style.animation = 'none';
        void line.offsetWidth;
    });

    line1.style.animation =
        'typing 1.5s steps(20, end) forwards, blink .75s step-end infinite';
    line2.style.animation =
        'typing 2s steps(20, end) 1.5s forwards, blink .75s step-end infinite';
    line3.style.animation =
        'typing 1.5s steps(20, end) 3.5s forwards, blink .75s step-end infinite';
}

// 언어 토글 버튼 이벤트 리스너
document.querySelector('.language-toggle').addEventListener('click', toggleLanguage);

// 프로젝트 카드 생성
function createProjectCards(currentLang = 'ko') {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;
    projectGrid.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const tags = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        card.innerHTML = `
            <h3>${project[`title_${currentLang}`]}</h3>
            <p>${project[`description_${currentLang}`]}</p>
            <div class="project-tags">${tags}</div>
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="github-link" data-ko="GitHub 프로필에서 자세히 보기" data-en="View on GitHub Profile">
                <i class="fab fa-github"></i> <span>${currentLang === 'ko' ? 'GitHub 프로필에서 자세히 보기' : 'View on GitHub Profile'}</span>
            </a>
        `;
        projectGrid.appendChild(card);
    });
}

// 언어 변경 시 프로젝트 카드도 다시 렌더링할 수 있도록 window에 함수 등록
window.createProjectCards = createProjectCards;

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
    createAIParticles();
    animateCircuit();
    initTechStack();
    
    // 저장된 테마 적용
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// 로딩 애니메이션
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
});

// 모달 관련 코드
const modal = document.getElementById('contactModal');
const contactButton = document.querySelector('.contact-button');
const closeButton = document.querySelector('.close-button');
const contactItems = document.querySelectorAll('.contact-item');

function openModal() {
    modal.classList.add('show');
    // 애니메이션 초기화
    contactItems.forEach(item => {
        item.classList.remove('animate');
    });
    // 애니메이션 시작
    setTimeout(() => {
        contactItems.forEach(item => {
            item.classList.add('animate');
        });
    }, 100);
}

function closeModal() {
    modal.classList.remove('show');
}

// 이벤트 리스너
contactButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// PDF 다운로드 기능
document.getElementById('downloadPDF').addEventListener('click', () => {
    window.print();
});

// 다크 테마 토글
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const themes = ['ai', 'default', 'dark'];
let currentThemeIndex = 0;

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    currentThemeIndex = themes.indexOf(savedTheme);
} else {
    // 기본값으로 AI 테마 설정
    document.body.setAttribute('data-theme', 'ai');
    localStorage.setItem('theme', 'ai');
}

// 테마 아이콘 업데이트
function updateThemeIcon() {
    const icons = ['fa-robot', 'fa-palette', 'fa-moon'];
    themeToggle.innerHTML = `<i class="fas ${icons[currentThemeIndex]}"></i>`;
}

// 초기 아이콘 설정
updateThemeIcon();

// 테마 전환
themeToggle.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    document.body.setAttribute('data-theme', newTheme === 'default' ? '' : newTheme);
    localStorage.setItem('theme', newTheme === 'default' ? '' : newTheme);
    
    updateThemeIcon();
    
    // 부드러운 전환 효과
    document.body.style.transition = 'all 0.5s ease';
});

// 모바일 메뉴 토글 개선
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    nav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (isMenuOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        document.body.style.overflow = ''; // 스크롤 허용
    }
}

menuToggle.addEventListener('click', toggleMenu);

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && isMenuOpen) {
            toggleMenu();
        }
    });
});

// ESC 키로 모바일 메뉴 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        toggleMenu();
    }
});

// 화면 크기 변경 시 메뉴 상태 초기화
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMenu();
    }
});

// 스크롤 탑 버튼 기능
const scrollToTopButton = document.getElementById('scrollToTop');

// 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

// 클릭 이벤트 리스너
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hero 섹션 애니메이션
const floatingElements = document.querySelectorAll('.floating-element');
const heroSection = document.querySelector('.hero');

function animateFloatingElements() {
    floatingElements.forEach((element, index) => {
        const delay = index * 0.2;
        element.style.animation = `float ${3 + index}s ease-in-out ${delay}s infinite`;
    });
}

function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const { left, top, width, height } = heroSection.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    floatingElements.forEach((element) => {
        const speed = element.dataset.speed || 20;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// 스크롤 애니메이션
function handleScroll() {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollPosition < heroHeight) {
        const opacity = 1 - (scrollPosition / heroHeight);
        const scale = 1 - (scrollPosition / (heroHeight * 2));
        
        heroSection.style.opacity = opacity;
        heroSection.style.transform = `scale(${scale})`;
    }
}

// 이벤트 리스너 등록
if (heroSection) {
    animateFloatingElements();
    heroSection.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
}

// AI 파티클 생성
function createAIParticles() {
    const particlesContainer = document.querySelector('.ai-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 랜덤 위치와 크기
        const size = Math.random() * 4 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: particleMove ${Math.random() * 10 + 5}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// 회로 애니메이션
function animateCircuit() {
    const circuitLines = document.querySelectorAll('.circuit-line');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    circuitLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
    
    circuitNodes.forEach((node, index) => {
        node.style.animationDelay = `${index * 0.5}s`;
    });
}

// 기술 스택 호버 효과
function initTechStack() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.1)';
            item.style.boxShadow = 'var(--neon-glow)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
        });
    });
} 