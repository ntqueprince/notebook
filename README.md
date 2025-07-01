
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shivang Notebook</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics-compat.js"></script>

    <script>
      // आपकी वेब ऐप की Firebase कॉन्फ़िगरेशन
      // यह जानकारी आपकी Firebase कंसोल इमेज से ली गई है।
      const firebaseConfig = {
        apiKey: "AIzaSyA03PvsFpFUIm-h6-h7Jf1L1l0xnu0mchc",
        authDomain: "myshivangnotebook.firebaseapp.com",
        projectId: "myshivangnotebook",
        storageBucket: "myshivangnotebook.appspot.com",
        messagingSenderId: "792729299641",
        appId: "1:792729299641:web:7ffaf5f410f44725656968"
        // measurementId: "G-YOUR_MEASUREMENT_ID" // अगर आपके कंसोल में यह है तो यहाँ जोड़ें
      };
      // Firebase को Initialize करें (शुरू करें)
      const app = firebase.initializeApp(firebaseConfig);
      // Firebase Authentication और Firestore के ऑब्जेक्ट बनाएं ताकि हम उन्हें अपने कोड में आसानी से इस्तेमाल कर सकें
      const auth = firebase.auth();
      // ऑथेंटिकेशन (लॉगिन/साइनअप) के लिए
      const db = firebase.firestore();
      // Firestore डेटाबेस (डेटा स्टोरेज) के लिए

      // Firebase Analytics को Initialize करें (अगर आपने एनालिटिक्स चालू किया है)
      // अगर आपने firebase-analytics-compat.js जोड़ा है और analytics इनेबल किया है, तो इस लाइन को अनकमेंट करें
      // const analytics = firebase.analytics();
    </script>
    <style>
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            color: #333;
        }

        /* Rainbow Gradient Text for Branding */
        .brand-text {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff);
            background-size: 400% 400%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: rainbow 3s ease-in-out infinite;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            margin-bottom: 20px;
            letter-spacing: 1px;
        }

        @keyframes rainbow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        /* Container Layout */
        .container {
            display: flex;
            min-height: 100vh;
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
        }

        /* Sidebar Styles */
        .sidebar {
            width: 300px;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            overflow-y: auto;
            transition: transform 0.3s ease;
        }

        .sidebar h1 {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 30px;
            text-align: center;
            color: #fff;
        }

        .sidebar-section {
            margin-bottom: 30px;
        }

        .sidebar-section h3 {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #e8eaf6;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-list {
            list-style: none;
        }

        .section-item {
            background: rgba(255, 255, 255, 0.1);
            margin-bottom: 8px;
            border-radius: 12px;
            transition: all 0.3s ease;
            cursor: pointer;
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .section-item:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
        }

        .section-item.active {
            background: rgba(255, 255, 255, 0.25);
            border-left: 4px solid #feca57;
        }

        .section-name {
            font-weight: 500;
            flex-grow: 1;
        }

        .section-actions {
            display: flex;
            gap: 8px;
        }

        .action-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: background 0.2s ease;
            font-size: 12px;
        }

        .action-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .add-section-btn {
            width: 100%;
            background: linear-gradient(45deg, #feca57, #ff9ff3);
            border: none;
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            font-size: 14px;
        }

        .add-section-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(254, 202, 87, 0.4);
        }

        .logout-btn {
            width: 100%;
            background: linear-gradient(45deg, #ff6b6b, #ee5a52);
            border: none;
            color: white;
            padding: 12px 20px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            font-size: 14px;
        }

        .logout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
        }

        /* Main Content Area */
        .main-content {
            flex: 1;
            padding: 30px;
            background: #fafbfc;
            overflow-y: auto;
        }

        .welcome-screen {
            text-align: center;
            padding: 60px 20px;
        }

        .welcome-screen h2 {
            font-size: 32px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 20px;
        }

        .welcome-screen p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
        }

        .note-editor {
            display: none;
        }

        .note-editor.active {
            display: block;
        }

        .editor-header {
            background: white;
            padding: 20px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
        }

        .editor-title {
            font-size: 28px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 10px;
        }

        .editor-subtitle {
            color: #666;
            font-size: 16px;
        }

        .editor-content {
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            padding: 20px;
        }

        .note-textarea {
            width: 100%;
            min-height: 400px;
            border: 2px solid #e8eaf6;
            border-radius: 12px;
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            line-height: 1.6;
            resize: vertical;
            transition: border-color 0.3s ease;
            background: #fafbfc;
        }

        .note-textarea:focus {
            outline: none;
            border-color: #667eea;
            background: white;
        }

        .save-btn {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            border: none;
            color: white;
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 20px;
            font-size: 16px;
        }

        .save-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(78, 205, 196, 0.4);
        }

        /* Mobile Responsive */
        .mobile-toggle {
            display: none;
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: #667eea;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
        }

        @media (max-width: 768px) {
            .container {
                flex-direction: column;
            }

            .mobile-toggle {
                display: block;
            }

            .sidebar {
                position: fixed;
                top: 0;
                left: 0;
                height: 100vh;
                z-index: 999;
                transform: translateX(-100%);
                width: 280px;
            }

            .sidebar.open {
                transform: translateX(0);
            }

            .main-content {
                padding: 80px 20px 20px;
            }

            .brand-text {
                font-size: 12px;
            }

            .welcome-screen h2 {
                font-size: 24px;
            }

            .welcome-screen p {
                font-size: 16px;
            }

            .editor-title {
                font-size: 24px;
            }

            .note-textarea {
                min-height: 300px;
                font-size: 14px;
            }
        }

        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 2000;
            justify-content: center;
            align-items: center;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
        }

        .modal-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e8eaf6;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            margin-bottom: 20px;
        }

        .modal-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .modal-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        .modal-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .modal-btn.primary {
            background: #667eea;
            color: white;
        }

        .modal-btn.secondary {
            background: #e8eaf6;
            color: #333;
        }

        .modal-btn:hover {
            transform: translateY(-1px);
        }

        /* Success Message */
        .success-message {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(78, 205, 196, 0.4);
            z-index: 1500;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 600;
        }

        .success-message.show {
            transform: translateX(0);
        }

        /* Login/Signup Styles - यहाँ से नए CSS स्टाइल शुरू होते हैं */
        .login-signup-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
        }

        .auth-box {
            background: white;
            padding: 40px 30px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        .auth-box h2 {
            font-size: 28px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 30px;
        }

        /* Password input container for toggle */
        .password-input-container {
            position: relative;
            margin-bottom: 15px; /* Adjust as needed */
        }

        .auth-input {
            width: calc(100% - 20px);
            padding: 12px 10px;
            border: 2px solid #e8eaf6;
            border-radius: 8px;
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            transition: border-color 0.3s ease;
        }

        .auth-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .toggle-password {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #667eea;
            font-size: 18px;
        }

        .auth-button {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 18px;
            margin-top: 10px;
        }

        .primary-auth-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
        }

        .primary-auth-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.5);
        }

        .auth-toggle-text {
            margin-top: 20px;
            font-size: 15px;
            color: #666;
        }

        .toggle-link {
            color: #667eea;
            font-weight: 600;
            cursor: pointer;
            text-decoration: underline;
        }

        .toggle-link:hover {
            color: #45b7d1;
        }

        .auth-error-message {
            color: #ff6b6b;
            font-size: 14px;
            margin-top: 15px;
            text-align: center;
            display: none; /* JavaScript से दिखाएंगे */
        }
    </style>
</head>
<body>
    <div class="login-signup-container" id="loginSignupContainer" style="display: none;">
        <div class="auth-box">
            <h2 id="authTitle">Login to Shivang Notebook</h2>
            <input type="email" id="emailInput" placeholder="Email" class="auth-input">
            <div class="password-input-container">
                <input type="password" id="passwordInput" placeholder="Password" class="auth-input">
                <span class="toggle-password" id="togglePassword">👁️</span>
            </div>
           
            <button id="authButton" class="auth-button primary-auth-btn">Login</button>
            <p class="auth-toggle-text">
                Don't have an account? <span id="toggleAuthMode" class="toggle-link">Sign Up</span>
            </p>
            <p class="auth-toggle-text">
                <span id="forgotPasswordLink" class="toggle-link">Forgot Password?</span>
            </p>
            <div id="authError" class="auth-error-message"></div>
        </div>
    </div>

    <button class="mobile-toggle" onclick="toggleSidebar()">☰</button>

    <div class="container">
        <div class="sidebar" id="sidebar">
            <div class="brand-text">✨ Created by Shivang ✨</div>
            <h1>📓 Shivang Notebook</h1>
       
            <div class="sidebar-section">
                <h3>📂 Sections</h3>
                <ul class="section-list" id="sectionList">
                    </ul>
                <button class="add-section-btn" onclick="showAddSectionModal()">
         
                    ➕ Add Section
                </button>
            </div>

            <button class="logout-btn" onclick="logout()">
                🚪 Logout
            </button>
        </div>

        <div class="main-content">
            <div class="brand-text">✨ Created by Shivang ✨</div>
            <div class="welcome-screen" id="welcomeScreen">
                <h2>Welcome to Your Notebook! 📝</h2>
                <p>Select a section from the sidebar to start writing your notes.</p>
                <p>You can add new sections, rename existing ones, and organize your thoughts beautifully!</p>
            </div>

            <div class="note-editor" id="noteEditor">
                <div class="editor-header">
                    <div class="editor-title" id="editorTitle">Section Name</div>
                    <div class="editor-subtitle">Write your thoughts and ideas here...</div>
                </div>
                <div class="editor-content">
                    <textarea
                        class="note-textarea"
                        id="noteTextarea"
                        placeholder="Start writing your notes here... ✍️"
                    ></textarea>
                    <button class="save-btn" onclick="saveNote()">
                        💾 Save Note
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="addSectionModal">
        <div class="modal-content">
            <div class="modal-title">Add New Section</div>
            <input
                type="text"
                class="modal-input"
                id="newSectionName"
                placeholder="Enter section name..."
                maxlength="50"
            >
            <div class="modal-buttons">
                <button class="modal-btn secondary" onclick="hideAddSectionModal()">Cancel</button>
                <button class="modal-btn primary" onclick="addSection()">Add Section</button>
            </div>
        </div>
    </div>

    <div class="modal" id="renameSectionModal">
        <div class="modal-content">
            <div class="modal-title">Rename Section</div>
            <input
                type="text"
                class="modal-input"
                id="renameSectionName"
                placeholder="Enter new section name..."
                maxlength="50"
            >
            <div class="modal-buttons">
                <button class="modal-btn secondary" onclick="hideRenameSectionModal()">Cancel</button>
                <button class="modal-btn primary" onclick="renameSection()">Rename</button>
            </div>
        </div>
    </div>

    <div class="success-message" id="successMessage">
        Note saved successfully! ✅
    </div>

    <script>
        // Application State
        // **IMPORTANT:** अब हम डेटा Firebase से मैनेज करेंगे, localStorage से नहीं।
        // इसलिए, यह `sections` array अब सिर्फ़ UI को रेंडर करने के लिए एक टेम्परेरी जगह होगी।
        // असली डेटा Firebase Firestore से आएगा।
        let sections = [];
        // इसे खाली रखें या पुराने डेटा के लिए एक प्रारंभिक सेट दें, जो बाद में Firebase से लोड होगा।
        let currentSection = null;
        let renamingSectionId = null;
        let isLoginMode = true; // ट्रैक करने के लिए कि हम लॉगिन मोड में हैं या साइनअप मोड में

        // Initialize the application
        function init() {
            // loadSections(); // यह लाइन अब Firebase से डेटा लोड करने के लिए बदलेगी
            renderSections();
            // Load saved data from localStorage - यह लाइन हट जाएगी या बदल जाएगी
            // const savedSections = localStorage.getItem('shivangNotebookSections');
            // if (savedSections) {
            //     sections = JSON.parse(savedSections);
            //     renderSections();
            // }

            // Add event listeners for Modals and Textarea
            document.getElementById('newSectionName').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    addSection();
                }
            });
            document.getElementById('renameSectionName').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    renameSection();
                }
            });

            // Close modals when clicking outside
            document.getElementById('addSectionModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    hideAddSectionModal();
                }
            });
            document.getElementById('renameSectionModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    hideRenameSectionModal();
                }
            });

            // Firebase Authentication State Listener को यहाँ कॉल करेंगे
            setupFirebaseAuthListener();

            // Auth UI Event Listeners - इनको init के अंदर ही कॉल करें ताकि DOM लोड होने पर ये लगें
            document.getElementById('authButton').addEventListener('click', handleAuth);
            document.getElementById('emailInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') handleAuth();
            });
            document.getElementById('passwordInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') handleAuth();
            });

            // "Show Password" toggle
            document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);

            // "Forgot Password" link
            document.getElementById('forgotPasswordLink').addEventListener('click', sendPasswordResetEmail);


            // initial call for toggleAuthMode, will be re-added inside updateAuthUI()
            document.getElementById('toggleAuthMode').addEventListener('click', toggleAuthModeHandler);
            updateAuthUI(); // init पर UI टेक्स्ट को सही मोड पर सेट करें
        }

        // Render sections in the sidebar
        function renderSections() {
            const sectionList = document.getElementById('sectionList');
            sectionList.innerHTML = '';
            if (sections.length === 0) {
                sectionList.innerHTML = '<li style="color: rgba(255,255,255,0.7); padding: 12px; text-align: center; cursor: default;">No sections yet. Add one!</li>';
            }
            sections.forEach(section => {
                const li = document.createElement('li');
                li.className = 'section-item';
                if (currentSection && currentSection.id === section.id) {
                    li.classList.add('active');
                }
                li.innerHTML = `
                    <span class="section-name" onclick="selectSection('${section.id}')">${section.name}</span>
                    <div class="section-actions">
                        <button class="action-btn" onclick="showRenameSectionModal('${section.id}')" title="Rename">✏️</button>
                        <button class="action-btn" onclick="deleteSection('${section.id}')" title="Delete">🗑️</button>
                    </div>
                `;
                sectionList.appendChild(li);
            });
        }

        // Select a section
        function selectSection(sectionId) {
            // Save current note before switching (यह अब Firebase में सेव होगा)
            if (currentSection) {
                saveCurrentNote();
            }
            currentSection = sections.find(s => s.id === sectionId);
            if (currentSection) {
                document.getElementById('welcomeScreen').style.display = 'none';
                document.getElementById('noteEditor').classList.add('active');
                document.getElementById('editorTitle').textContent = currentSection.name;
                document.getElementById('noteTextarea').value = currentSection.content || '';
                renderSections(); // Update active state
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('open');
                }
            }
        }

        // Save current note content (यह अब Firebase में सेव होगा)
        function saveCurrentNote() {
            if (currentSection && auth.currentUser) { // चेक करें कि यूजर लॉग इन है
                const content = document.getElementById('noteTextarea').value;
                const userId = auth.currentUser.uid;
                const sectionId = currentSection.id;
                db.collection('users').doc(userId).collection('sections').doc(sectionId).update({
                    content: content,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp() // अंतिम अपडेट का समय
                })
                .then(() => {
                    console.log("Note content updated in Firebase!");
                    currentSection.content = content; // UI में भी अपडेट करें
                    showSuccessMessage();
                })
                .catch((error) => {
                    console.error("Error updating note content: ", error);
                    alert("Error saving note: " + error.message);
                });
            }
        }

        // Save note and show success message
        function saveNote() {
            saveCurrentNote();
            // showSuccessMessage() saveCurrentNote के अंदर कॉल हो रहा है
        }

        // Show success message
        function showSuccessMessage() {
            const message = document.getElementById('successMessage');
            message.classList.add('show');
            setTimeout(() => {
                message.classList.remove('show');
            }, 3000);
        }

        // Show Add Section Modal
        function showAddSectionModal() {
            document.getElementById('addSectionModal').classList.add('active');
            document.getElementById('newSectionName').focus();
        }

        // Hide Add Section Modal
        function hideAddSectionModal() {
            document.getElementById('addSectionModal').classList.remove('active');
            document.getElementById('newSectionName').value = '';
        }

        // Add a new section (यह अब Firebase में डेटा जोड़ेगा)
        function addSection() {
            const newSectionName = document.getElementById('newSectionName').value.trim();
            if (newSectionName && auth.currentUser) { // चेक करें कि यूजर लॉग इन है
                const userId = auth.currentUser.uid;
                db.collection('users').doc(userId).collection('sections').add({
                    name: newSectionName,
                    content: '', // Initial empty content
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) => {
                    console.log("Section added with ID: ", docRef.id);
                    // UI में जोड़ने से पहले sections array में नया सेक्शन जोड़ें
                    sections.push({ id: docRef.id, name: newSectionName, content: '' });
                    renderSections();
                    hideAddSectionModal();
                    selectSection(docRef.id); // Automatically select the new section
                })
                .catch((error) => {
                    console.error("Error adding section: ", error);
                    alert("Error adding section: " + error.message);
                });
            } else {
                alert('Please enter a section name.');
            }
        }

        // Show Rename Section Modal
        function showRenameSectionModal(sectionId) {
            renamingSectionId = sectionId;
            const section = sections.find(s => s.id === sectionId);
            if (section) {
                document.getElementById('renameSectionName').value = section.name;
                document.getElementById('renameSectionModal').classList.add('active');
                document.getElementById('renameSectionName').focus();
            }
        }

        // Hide Rename Section Modal
        function hideRenameSectionModal() {
            document.getElementById('renameSectionModal').classList.remove('active');
            document.getElementById('renameSectionName').value = '';
            renamingSectionId = null;
        }

        // Rename a section (यह अब Firebase में डेटा अपडेट करेगा)
        function renameSection() {
            const newName = document.getElementById('renameSectionName').value.trim();
            if (newName && renamingSectionId && auth.currentUser) { // चेक करें कि यूजर लॉग इन है
                const userId = auth.currentUser.uid;
                db.collection('users').doc(userId).collection('sections').doc(renamingSectionId).update({
                    name: newName,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    console.log("Section renamed in Firebase!");
                    const sectionIndex = sections.findIndex(s => s.id === renamingSectionId);
                    if (sectionIndex !== -1) {
                        sections[sectionIndex].name = newName;
                        if (currentSection && currentSection.id === renamingSectionId) {
                            currentSection.name = newName;
                            document.getElementById('editorTitle').textContent = newName;
                        }
                    }
                    renderSections();
                    hideRenameSectionModal();
                })
                .catch((error) => {
                    console.error("Error renaming section: ", error);
                    alert("Error renaming section: " + error.message);
                });
            } else {
                alert('Please enter a new name.');
            }
        }

        // Delete a section (यह अब Firebase से डेटा हटाएगा)
        function deleteSection(sectionId) {
            if (confirm('Are you sure you want to delete this section?')) {
                if (auth.currentUser) { // चेक करें कि यूजर लॉग इन है
                    const userId = auth.currentUser.uid;
                    db.collection('users').doc(userId).collection('sections').doc(sectionId).delete()
                    .then(() => {
                        console.log("Section successfully deleted from Firebase!");
                        sections = sections.filter(s => s.id !== sectionId);
                        if (currentSection && currentSection.id === sectionId) {
                            currentSection = null;
                            document.getElementById('noteEditor').classList.remove('active');
                            document.getElementById('welcomeScreen').style.display = 'block';
                        }
                        renderSections();
                    })
                    .catch((error) => {
                        console.error("Error removing section: ", error);
                        alert("Error deleting section: " + error.message);
                    });
                }
            }
        }

        // Toggle sidebar for mobile
        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
        }

        // Firebase Authentication Listener
        function setupFirebaseAuthListener() {
            auth.onAuthStateChanged((user) => {
                const loginSignupContainer = document.getElementById('loginSignupContainer');
                const mainAppContainer = document.querySelector('.container');
                const mobileToggleBtn = document.querySelector('.mobile-toggle');

                if (user) {
                    // User is signed in.
                    console.log("User logged in:", user.email);
                    loginSignupContainer.style.display = 'none';
                    mainAppContainer.style.display = 'flex'; // Show main app
                    mobileToggleBtn.style.display = 'block'; // Show mobile toggle
                    loadUserSections(user.uid); // Load sections for the logged-in user
                } else {
                    // User is signed out.
                    console.log("User logged out.");
                    loginSignupContainer.style.display = 'flex'; // Show login/signup
                    mainAppContainer.style.display = 'none'; // Hide main app
                    mobileToggleBtn.style.display = 'none'; // Hide mobile toggle
                    sections = []; // Clear sections
                    currentSection = null;
                    renderSections(); // Update UI
                    document.getElementById('noteEditor').classList.remove('active');
                    document.getElementById('welcomeScreen').style.display = 'block';
                }
            });
        }

        // Load user-specific sections from Firestore
        function loadUserSections(userId) {
            db.collection('users').doc(userId).collection('sections').orderBy('createdAt', 'asc').onSnapshot((snapshot) => {
                sections = [];
                snapshot.forEach((doc) => {
                    sections.push({ id: doc.id, ...doc.data() });
                });
                renderSections();
                // If a section was previously selected and still exists, re-select it
                if (currentSection && sections.some(s => s.id === currentSection.id)) {
                    selectSection(currentSection.id);
                } else if (sections.length > 0) {
                    selectSection(sections[0].id); // Select the first section if available
                } else {
                    // No sections, show welcome screen
                    currentSection = null;
                    document.getElementById('noteEditor').classList.remove('active');
                    document.getElementById('welcomeScreen').style.display = 'block';
                }
            }, (error) => {
                console.error("Error loading sections: ", error);
                alert("Error loading sections: " + error.message);
            });
        }

        // Handle Login/Signup Button Click
        function handleAuth() {
            const email = document.getElementById('emailInput').value;
            const password = document.getElementById('passwordInput').value;
            const authError = document.getElementById('authError');
            authError.style.display = 'none'; // Clear previous errors

            if (!email || !password) {
                authError.textContent = "Please enter both email and password.";
                authError.style.display = 'block';
                return;
            }

            if (isLoginMode) {
                // Login
                auth.signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log("Logged in successfully:", user.email);
                        // UI को onAuthStateChanged हैंडल करेगा
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        let errorMessage = "Login failed. Please check your email and password."; // Updated message
                        if (errorCode === "auth/invalid-credential" || errorCode === "auth/user-not-found" || errorCode === "auth/wrong-password") {
                            errorMessage = "Invalid email or password."; // Simplified
                        } else if (errorCode === "auth/invalid-api-key") {
                            errorMessage = "Configuration error: Please check Firebase API Key."; // Simplified
                        } else if (errorCode === "auth/too-many-requests") {
                            errorMessage = "Too many login attempts. Please try again later."; // Added for brute-force
                        }
                        console.error("Login Error:", errorCode, error.message);
                        authError.textContent = errorMessage;
                        authError.style.display = 'block';
                    });
            } else {
                // Sign Up
                auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log("Signed up successfully:", user.email);
                        // UI को onAuthStateChanged हैंडल करेगा
                        alert("Account created successfully! You are now logged in.");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        let errorMessage = "Signup failed. Please try again."; // Updated message
                        if (errorCode === "auth/email-already-in-use") {
                            errorMessage = "This email is already registered. Please login or use a different email."; // Simplified
                        } else if (errorCode === "auth/weak-password") {
                            errorMessage = "Password is too weak. Use at least 6 characters."; // Simplified
                        } else if (errorCode === "auth/invalid-email") {
                            errorMessage = "Invalid email format."; // Simplified
                        } else if (errorCode === "auth/invalid-api-key") {
                            errorMessage = "Configuration error: Please check Firebase API Key."; // Simplified
                        }
                        console.error("Signup Error:", errorCode, error.message);
                        authError.textContent = errorMessage;
                        authError.style.display = 'block';
                    });
            }
        }

        // Toggle between Login and Signup modes
        function toggleAuthModeHandler() {
            isLoginMode = !isLoginMode;
            updateAuthUI();
        }

        function updateAuthUI() {
            const authTitle = document.getElementById('authTitle');
            const authButton = document.getElementById('authButton');
            const toggleAuthMode = document.getElementById('toggleAuthMode');
            const forgotPasswordLink = document.getElementById('forgotPasswordLink'); // Get the forgot password link

            if (isLoginMode) {
                authTitle.textContent = "Login to Shivang Notebook";
                authButton.textContent = "Login";
                toggleAuthMode.textContent = "Sign Up";
                forgotPasswordLink.style.display = 'block'; // Show forgot password link in login mode
            } else {
                authTitle.textContent = "Sign Up for Shivang Notebook";
                authButton.textContent = "Sign Up";
                toggleAuthMode.textContent = "Login";
                forgotPasswordLink.style.display = 'none'; // Hide forgot password link in signup mode
            }
            document.getElementById('authError').style.display = 'none'; // Clear errors on mode switch
        }

        // Logout function
        function logout() {
            auth.signOut().then(() => {
                console.log("User signed out.");
                alert("You have been logged out.");
            }).catch((error) => {
                console.error("Error signing out:", error);
                alert("Error logging out: " + error.message);
            });
        }

        // Function to toggle password visibility
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('passwordInput');
            const togglePassword = document.getElementById('togglePassword');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                togglePassword.textContent = '🙈'; // Hide icon
            } else {
                passwordInput.type = 'password';
                togglePassword.textContent = '👁️'; // Show icon
            }
        }

        // Function to send password reset email
        function sendPasswordResetEmail() {
            const email = document.getElementById('emailInput').value;
            const authError = document.getElementById('authError');
            authError.style.display = 'none';

            if (!email) {
                authError.textContent = "Please enter your email to reset password.";
                authError.style.display = 'block';
                return;
            }

            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert("Password reset email sent to " + email + ". Please check your inbox.");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let errorMessage = "Error sending password reset email. Please try again.";
                    if (errorCode === "auth/user-not-found") {
                        errorMessage = "No account found with this email."; // Simplified
                    } else if (errorCode === "auth/invalid-email") {
                        errorMessage = "Invalid email format."; // Simplified
                    } else if (errorCode === "auth/invalid-api-key") {
                        errorMessage = "Configuration error: Please check Firebase API Key."; // Simplified
                    }
                    console.error("Password Reset Error:", errorCode, error.message);
                    authError.textContent = errorMessage;
                    authError.style.display = 'block';
                });
        }


        // Initialize the application when page loads
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
