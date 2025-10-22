// Riderz Net - Dynamic ISP Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSpeedTest();
    initializeCoverageChecker();
    initializeFAQ();
    initializeReviewsCarousel();
    initializeLiveChat();
    initializeScrollToTop();
    initializeContactForm();
    initializeSMSFunction();
    initializePageLoader();
    initializeRealTimeClock();
    
    // Mobile Menu Toggle
    function initializeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
            
            // Close menu when clicking on links
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                });
            });
        }
    }
    
    // Scroll Animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observe all fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Speed Test Functionality
    function initializeSpeedTest() {
        const startButton = document.getElementById('startSpeedTest');
        const speedValue = document.getElementById('speedValue');
        const downloadSpeed = document.getElementById('downloadSpeed');
        const uploadSpeed = document.getElementById('uploadSpeed');
        const pingValue = document.getElementById('pingValue');
        
        if (startButton) {
            startButton.addEventListener('click', function() {
                startButton.textContent = 'Testing...';
                startButton.disabled = true;
                
                // Simulate speed test
                simulateSpeedTest();
            });
        }
        
        function simulateSpeedTest() {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Set final values - showing 100 Mbps for both download and upload
                    const download = 100;
                    const upload = 100;
                    const ping = Math.floor(Math.random() * 20) + 10;
                    
                    speedValue.textContent = download;
                    downloadSpeed.textContent = download + ' Mbps';
                    uploadSpeed.textContent = upload + ' Mbps';
                    pingValue.textContent = ping + ' ms';
                    
                    startButton.textContent = 'Test Again';
                    startButton.disabled = false;
                    
                    showNotification('Speed test completed! Excellent speeds detected!', 'success');
                } else {
                    speedValue.textContent = Math.floor(progress);
                }
            }, 100);
        }
    }
    
    // Coverage Checker
    function initializeCoverageChecker() {
        const checkButton = document.getElementById('checkCoverage');
        const addressInput = document.getElementById('addressInput');
        const coverageStatus = document.getElementById('coverageStatus');
        
        // Define covered areas
        const coveredAreas = [
            'smchs', 'pechs', 'lines area', 'korangi', 'saddar mobile market', 
            'faisal plaza', 'saddar thana', 'police line', 'saddar', 'mobile market',
            'korangi town', 'korangi industrial', 'pechs phase', 'smchs block',
            'lines area karachi', 'faisal plaza saddar', 'police line karachi', 'II chundrigar' ,'zainab market',
            
        ];
        
        if (checkButton && addressInput && coverageStatus) {
            checkButton.addEventListener('click', function() {
                const address = addressInput.value.trim().toLowerCase();
                
                if (!address) {
                    showNotification('Please enter an address', 'error');
                    return;
                }
                
                checkButton.textContent = 'Checking...';
                checkButton.disabled = true;
                
                // Check if address contains any covered area
                const isCovered = coveredAreas.some(area => address.includes(area));
                
                // Simulate coverage check
                setTimeout(() => {
                    if (isCovered) {
                        coverageStatus.innerHTML = `
                            <div class="status-available">
                                <i class="fas fa-check-circle"></i>
                                <h3>Service Available!</h3>
                                <p>Great news! Riderz Net is available in your area. We provide high-speed internet services in ${getAreaName(address)}.</p>
                                <div class="coverage-details">
                                    <h4>Available Plans:</h4>
                                    <ul>
                                        <li>Basic Plan - 15 Mbps - ₨1,650/month</li>
                                        <li>Premium Plan - 25 Mbps - ₨2,050/month</li>
                                        <li>Ultra Plan - 30 Mbps - ₨2,550/month</li>
                                        <li>High Speed Plans - Up to 100 Mbps</li>
                                    </ul>
                                </div>
                                <a href="#contact" class="btn btn-primary">Get Connected</a>
                            </div>
                        `;
                    } else {
                        coverageStatus.innerHTML = `
                            <div class="status-unavailable">
                                <i class="fas fa-times-circle"></i>
                                <h3>Service Not Available</h3>
                                <p>Unfortunately, we don't currently serve this area. However, we're expanding our network!</p>
                                <div class="expansion-info">
                                    <h4>Currently Serving:</h4>
                                    <ul>
                                        <li>SMCHS</li>
                                        <li>PECHS</li>
                                        <li>Lines Area</li>
                                        <li>Korangi</li>
                                        <li>Saddar Mobile Market</li>
                                        <li>Faisal Plaza</li>
                                        <li>Saddar Thana</li>
                                        <li>Police Line</li>
                                    </ul>
                                </div>
                                <a href="#contact" class="btn btn-secondary">Request Service</a>
                            </div>
                        `;
                    }
                    
                    checkButton.textContent = 'Check Coverage';
                    checkButton.disabled = false;
                }, 2000);
            });
        }
        
        // Helper function to get area name
        function getAreaName(address) {
            if (address.includes('smchs')) return 'SMCHS';
            if (address.includes('pechs')) return 'PECHS';
            if (address.includes('lines area')) return 'Lines Area';
            if (address.includes('korangi')) return 'Korangi';
            if (address.includes('saddar mobile market')) return 'Saddar Mobile Market';
            if (address.includes('faisal plaza')) return 'Faisal Plaza';
            if (address.includes('saddar thana')) return 'Saddar Thana';
            if (address.includes('police line')) return 'Police Line';
            return 'your area';
        }
    }
    
    // FAQ Accordion
    function initializeFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Close other open FAQs
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== this) {
                        const otherAnswer = otherQuestion.nextElementSibling;
                        const otherIcon = otherQuestion.querySelector('i');
                        otherAnswer.style.display = 'none';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current FAQ
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    answer.style.display = 'block';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }
    
    // Reviews Carousel
    function initializeReviewsCarousel() {
        const reviews = [
            {
                stars: '★★★★★',
                text: '"Excellent service! Fast speeds and reliable connection. Customer support is outstanding."',
                author: 'Ahmed Khan',
                location: 'Karachi Customer'
            },
            {
                stars: '★★★★★',
                text: '"Best internet provider in Karachi. No downtime and excellent customer service."',
                author: 'Fatima Ali',
                location: 'Karachi Customer'
            },
            {
                stars: '★★★★★',
                text: '"Switched from another provider and couldn\'t be happier. Great speeds and fair pricing in Karachi."',
                author: 'Muhammad Hassan',
                location: 'Karachi Customer'
            },
            {
                stars: '★★★★★',
                text: '"Professional installation team and reliable service. Highly recommended for Karachi residents!"',
                author: 'Ayesha Malik',
                location: 'Karachi Customer'
            },
            {
                stars: '★★★★★',
                text: '"Amazing internet speeds in Karachi! Perfect for work from home and online streaming."',
                author: 'Usman Sheikh',
                location: 'Karachi Customer'
            },
            {
                stars: '★★★★★',
                text: '"Outstanding service in Karachi. Fast, reliable, and affordable internet connection."',
                author: 'Sara Ahmed',
                location: 'Karachi Customer'
            }
        ];
        
        let currentReview = 0;
        const reviewCard = document.getElementById('reviewCard');
        const prevButton = document.getElementById('prevReview');
        const nextButton = document.getElementById('nextReview');
        
        function updateReview() {
            if (reviewCard) {
                const review = reviews[currentReview];
                reviewCard.innerHTML = `
                    <div class="review-stars">${review.stars}</div>
                    <p class="review-text">${review.text}</p>
                    <div class="review-author">
                        <strong>${review.author}</strong>
                        <span>${review.location}</span>
                    </div>
                `;
            }
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentReview = (currentReview - 1 + reviews.length) % reviews.length;
                updateReview();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                currentReview = (currentReview + 1) % reviews.length;
                updateReview();
            });
        }
        
        // Auto-rotate reviews
        setInterval(() => {
            currentReview = (currentReview + 1) % reviews.length;
            updateReview();
        }, 5000);
        
        updateReview();
    }
    
    // Live Chat Widget
    function initializeLiveChat() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const chatClose = document.getElementById('chatClose');
        const chatSend = document.getElementById('chatSend');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        
        let isOpen = false;
        let chatSessionId = generateSessionId();
        let messageCount = 0;
        
        // Staff responses (simulated)
        const staffResponses = [
            "Hello! Thank you for contacting Riderz Net. How can I assist you today?",
            "I'm here to help you with your internet service needs. What would you like to know?",
            "Great question! Let me provide you with the information you need.",
            "I can help you find the perfect internet plan for your requirements.",
            "Would you like me to schedule a service call for you?",
            "Our technical support team is standing by to help you.",
            "Is there anything else I can assist you with regarding our services?",
            "Thank you for choosing Riderz Net! We're here to help."
        ];
        
        if (chatToggle) {
            chatToggle.addEventListener('click', function() {
                if (!isOpen) {
                    chatWindow.style.display = 'flex';
                    isOpen = true;
                }
            });
        }
        
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatWindow.style.display = 'none';
                isOpen = false;
            });
        }
        
        function addMessage(message, isUser = false, showCallButton = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${isUser ? 'user' : 'bot'}`;
            
            let messageContent = `<p>${message}</p>`;
            if (showCallButton) {
                messageContent += `
                    <div class="chat-action-buttons">
                        <button class="btn btn-primary chat-call-btn" onclick="window.open('tel:03111000314')">
                            <i class="fas fa-phone"></i> Call Help Line
                        </button>
                    </div>
                `;
            }
            
            messageDiv.innerHTML = messageContent;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatInput.value = '';
                messageCount++;
                
                // Send message to helpline via WhatsApp
                sendToHelpline(message, messageCount);
                
                // Simulate staff response
                setTimeout(() => {
                    const response = staffResponses[Math.floor(Math.random() * staffResponses.length)];
                    addMessage(response, false);
                    
                    // Show typing indicator
                    showTypingIndicator();
                }, 2000);
            }
        }
        
        // Send message to helpline
        function sendToHelpline(message, messageNumber) {
            const helplineMessage = `💬 *Live Chat Message #${messageNumber}*

📱 *Session ID:* ${chatSessionId}
💬 *Customer Message:* ${message}
🕒 *Time:* ${new Date().toLocaleString()}

Please respond to this customer in the live chat system.`;

            // Open WhatsApp with the message
            const whatsappUrl = `https://wa.me/923111000314?text=${encodeURIComponent(helplineMessage)}`;
            window.open(whatsappUrl, '_blank');
        }
        
        // Generate unique session ID
        function generateSessionId() {
            return 'CHAT_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        // Show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'chat-message bot typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Remove typing indicator after 2 seconds
            setTimeout(() => {
                if (typingDiv.parentNode) {
                    typingDiv.remove();
                }
            }, 2000);
        }
        
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
    
    // Scroll to Top Button
    function initializeScrollToTop() {
        const scrollButton = document.getElementById('scrollToTop');
        
        if (scrollButton) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollButton.style.display = 'block';
                } else {
                    scrollButton.style.display = 'none';
                }
            });
            
            // Scroll to top when clicked
            scrollButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }
    
    // Contact Form
    function initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Create WhatsApp message with form data
                const whatsappMessage = createWhatsAppMessage(data);
                
                setTimeout(() => {
                    // Open WhatsApp with pre-filled message
                    const whatsappUrl = `https://wa.me/923111000314?text=${encodeURIComponent(whatsappMessage)}`;
                    window.open(whatsappUrl, '_blank');
                    
                    showNotification('Form submitted! Opening WhatsApp to send details to our helpline.', 'success');
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            });
        }
    }
    
    // Create WhatsApp message from form data
    function createWhatsAppMessage(data) {
        const message = `🏢 *Riderz Net - New Customer Inquiry*

👤 *Customer Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}

🔧 *Service Interest:*
• ${data.service}

💬 *Message:*
${data.message}

📅 *Submitted:* ${new Date().toLocaleString()}

Please contact this customer for further assistance.`;

        return message;
    }
    
    // SMS functionality
    function initializeSMSFunction() {
        const smsButton = document.getElementById('sendSMS');
        const contactForm = document.getElementById('contactForm');
        
        if (smsButton && contactForm) {
            smsButton.addEventListener('click', function() {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);
                
                // Validate form
                if (!data.name || !data.phone || !data.service) {
                    showNotification('Please fill in Name, Phone, and Service fields for SMS.', 'error');
                    return;
                }
                
                // Create SMS message
                const smsMessage = createSMSMessage(data);
                
                // Open SMS app
                const smsUrl = `sms:03111000314?body=${encodeURIComponent(smsMessage)}`;
                window.open(smsUrl, '_blank');
                
                showNotification('Opening SMS app to send details to our helpline.', 'success');
            });
        }
    }
    
    // Create SMS message from form data
    function createSMSMessage(data) {
        const message = `Riderz Net Inquiry:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Service: ${data.service}
Message: ${data.message}
Time: ${new Date().toLocaleString()}`;
        
        return message;
    }
    
    // Page Loader
    function initializePageLoader() {
        const pageLoader = document.getElementById('pageLoader');
        
        if (pageLoader) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    pageLoader.style.opacity = '0';
                    setTimeout(() => {
                        pageLoader.style.display = 'none';
                    }, 500);
                }, 1000);
            });
        }
    }
    
    // Real-time Clock
    function initializeRealTimeClock() {
        const clockElement = document.createElement('div');
        clockElement.className = 'real-time-clock';
        clockElement.innerHTML = '<i class="fas fa-clock"></i><span id="currentTime"></span>';
        
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.appendChild(clockElement);
        }
        
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const timeElement = document.getElementById('currentTime');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        }
        
        updateClock();
        setInterval(updateClock, 1000);
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
                <button class="notification-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll-to-top button styles
    const scrollToTopStyle = document.createElement('style');
    scrollToTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #2a5298;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            display: none;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .scroll-to-top:hover {
            background: #1e3c72;
            transform: translateY(-2px);
        }
        
        .speed-test-section {
            padding: 80px 0;
            background: #f8f9fa;
        }
        
        .speed-test-widget {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            margin: 2rem 0;
            text-align: center;
        }
        
        .speed-test-widget h3 {
            color: #1e3c72;
            margin-bottom: 1.5rem;
        }
        
        .speed-meter {
            margin: 2rem 0;
        }
        
        .speed-circle {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            background: linear-gradient(45deg, #2a5298, #1e3c72);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: white;
            margin: 0 auto;
            position: relative;
        }
        
        .speed-value {
            font-size: 2.5rem;
            font-weight: bold;
        }
        
        .speed-unit {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .speed-details {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .speed-item {
            text-align: center;
        }
        
        .speed-label {
            display: block;
            color: #6c757d;
            font-size: 0.9rem;
        }
        
        .speed-number {
            display: block;
            font-weight: bold;
            color: #1e3c72;
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .speed-details {
                grid-template-columns: 1fr;
            }
            
            .scroll-to-top {
                bottom: 80px;
            }
        }
    `;
    document.head.appendChild(scrollToTopStyle);
    
    // Register Service Worker for PWA functionality
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
    
    console.log('Riderz Net website initialized successfully!');
});