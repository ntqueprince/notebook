<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CVang Notebook</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        :root {
            --primary: #4361ee;
            --primary-dark: #3a56d4;
            --secondary: #7209b7;
            --accent: #f72585;
            --success: #4cc9f0;
            --warning: #f9c74f;
            --danger: #f94144;
            --light: #f8f9fa;
            --dark: #212529;
            --gray: #6c757d;
            --border-radius: 12px;
            --transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.15);
            --gradient: linear-gradient(135deg, #4361ee, #3a0ca3);
            --gradient-2: linear-gradient(135deg, #f72585, #7209b7);
            --gradient-3: linear-gradient(135deg, #4cc9f0, #4361ee);
        }

        .dark-mode {
            --light: #121212;
            --dark: #f8f9fa;
            --gray: #adb5bd;
            --shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.5);
            --gradient: linear-gradient(135deg, #3a56d4, #7209b7);
            --gradient-2: linear-gradient(135deg, #e11573, #5a0a8f);
            --gradient-3: linear-gradient(135deg, #3aa8d0, #3a56d4);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: var(--light);
            color: var(--dark);
            transition: var(--transition);
            min-height: 100vh;
            overflow-x: hidden;
            background-image: radial-gradient(rgba(67, 97, 238, 0.1) 2px, transparent 2px);
            background-size: 40px 40px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header Styles */
        header {
            background: var(--gradient);
            padding: 15px 0;
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
            animation: headerSlideDown 0.8s ease-out;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
            transform-origin: left;
            animation: logoSpring 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo h1 {
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(to right, #fff, #f9c74f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .logo i {
            font-size: 2.2rem;
            color: #fff;
            animation: pulse 2s infinite;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .header-actions {
            display: flex;
            gap: 15px;
            align-items: center;
            position: relative;
        }

        .theme-toggle {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
            font-size: 1.2rem;
            color: white;
        }

        .theme-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05) rotate(15deg);
        }

        .auth-buttons {
            display: flex;
            gap: 10px;
            animation: fadeIn 0.8s ease-out 0.3s forwards;
            opacity: 0;
        }

        .btn {
            padding: 10px 20px;
            border-radius: 50px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transform-origin: center;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .btn::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            opacity: 0;
            transition: all 0.4s ease;
        }

        .btn:hover::after {
            opacity: 1;
            transform: translateX(100%);
        }

        .btn-primary {
            background: var(--gradient-2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(231, 15, 119, 0.3);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid white;
            color: white;
        }

        .btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        /* Profile Dropdown */
        .profile-dropdown {
            position: relative;
        }

        .profile-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
            font-size: 1.2rem;
            color: white;
        }

        .profile-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
        }

        .dropdown-content {
            position: absolute;
            top: 60px;
            right: 0;
            background: var(--light);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            width: 250px;
            padding: 20px;
            z-index: 1000;
            display: none;
            animation: fadeInScale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: top right;
            background: var(--gradient-3);
        }

        .dropdown-content.show {
            display: block;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
            animation: rotate 8s linear infinite;
        }

        .user-details h3 {
            color: white;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }

        .user-details p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9rem;
        }

        .dropdown-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .dropdown-action {
            padding: 10px 15px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: var(--transition);
            color: white;
            text-decoration: none;
            background: rgba(255, 255, 255, 0.1);
        }

        .dropdown-action:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(5px);
        }

        .dropdown-action i {
            width: 20px;
            text-align: center;
        }

        /* Auth Section */
        .auth-section {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 0;
            animation: fadeIn 0.8s ease-out;
        }

        .auth-container {
            background: var(--light);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            width: 100%;
            max-width: 450px;
            padding: 35px;
            transition: var(--transition);
            animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
        }

        .dark-mode .auth-container {
            background: linear-gradient(145deg, #1a1a1a, #222222);
        }

        .auth-header {
            text-align: center;
            margin-bottom: 25px;
            animation: fadeIn 0.6s ease-out 0.2s forwards;
            opacity: 0;
        }

        .auth-header h2 {
            font-size: 1.8rem;
            margin-bottom: 10px;
            color: var(--primary);
            background: var(--gradient-2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .auth-header p {
            color: var(--gray);
            font-size: 0.95rem;
        }

        .form-group {
            margin-bottom: 18px;
            animation: fadeIn 0.6s ease-out forwards;
            opacity: 0;
        }

        .form-group:nth-child(1) { animation-delay: 0.3s; }
        .form-group:nth-child(2) { animation-delay: 0.4s; }
        .form-group:nth-child(3) { animation-delay: 0.5s; }
        .form-group:nth-child(4) { animation-delay: 0.6s; }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--dark);
            font-size: 0.95rem;
        }

        .form-control {
            width: 100%;
            padding: 14px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 0.95rem;
            transition: var(--transition);
            background: var(--light);
            color: var(--dark);
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
        }

        .form-control:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
            transform: translateY(-2px);
        }

        .form-footer {
            margin-top: 20px;
            text-align: center;
            animation: fadeIn 0.6s ease-out 0.7s forwards;
            opacity: 0;
        }

        .form-footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
        }

        .form-footer a:hover {
            text-decoration: underline;
        }

        /* Notes Section */
        .notes-section {
            padding: 40px 0;
            display: none;
            animation: fadeIn 0.8s ease-out;
        }

        .welcome-message {
            margin-bottom: 30px;
            text-align: center;
            animation: fadeInSlideUp 0.8s ease-out;
        }

        .welcome-message h2 {
            font-size: 2.2rem;
            margin-bottom: 15px;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .welcome-message p {
            color: var(--gray);
            max-width: 600px;
            margin: 0 auto;
            font-size: 1.05rem;
        }

        .notes-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
        }

        .note-card {
            background: var(--light);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            padding: 25px;
            transition: var(--transition);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            transform-origin: center;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            overflow: hidden;
        }

        .dark-mode .note-card {
            background: linear-gradient(145deg, #1e1e1e, #252525);
        }

        .note-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: var(--accent);
        }

        .note-card:nth-child(2)::before { background: var(--success); }
        .note-card:nth-child(3)::before { background: var(--warning); }
        .note-card:nth-child(4)::before { background: var(--primary); }

        .note-card:nth-child(1) { animation-delay: 0.1s; }
        .note-card:nth-child(2) { animation-delay: 0.2s; }
        .note-card:nth-child(3) { animation-delay: 0.3s; }
        .note-card:nth-child(4) { animation-delay: 0.4s; }
        .note-card:nth-child(5) { animation-delay: 0.5s; }

        .note-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: var(--shadow-lg);
        }

        .note-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }

        .note-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--primary);
        }

        .note-date {
            font-size: 0.8rem;
            color: var(--gray);
        }

        .note-content {
            margin-bottom: 20px;
            line-height: 1.6;
            color: var(--dark);
            font-size: 0.95rem;
        }

        .note-actions {
            display: flex;
            gap: 10px;
        }

        .action-btn {
            padding: 8px 15px;
            border-radius: 8px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .edit-btn {
            background: rgba(76, 201, 240, 0.15);
            color: var(--success);
        }

        .edit-btn:hover {
            background: rgba(76, 201, 240, 0.25);
            transform: translateY(-2px);
        }

        .delete-btn {
            background: rgba(249, 65, 68, 0.15);
            color: var(--danger);
        }

        .delete-btn:hover {
            background: rgba(249, 65, 68, 0.25);
            transform: translateY(-2px);
        }

        .add-note {
            background: rgba(67, 97, 238, 0.1);
            border: 2px dashed var(--primary);
            border-radius: var(--border-radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 200px;
            cursor: pointer;
            transition: var(--transition);
            animation: pulseBorder 2s infinite;
            background: linear-gradient(145deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
        }

        .add-note:hover {
            background: linear-gradient(145deg, rgba(67, 97, 238, 0.15), rgba(58, 12, 163, 0.15));
            transform: scale(1.03);
            animation: none;
        }

        .add-note i {
            font-size: 2.8rem;
            color: var(--primary);
            margin-bottom: 15px;
            transition: var(--transition);
        }

        .add-note:hover i {
            transform: scale(1.2);
        }

        .add-note p {
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--primary);
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
            background: var(--light);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            width: 100%;
            max-width: 700px;
            padding: 25px;
            position: relative;
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            flex-direction: column;
            height: 80vh;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
        }

        .dark-mode .modal-content {
            background: linear-gradient(145deg, #1e1e1e, #252525);
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray);
            transition: var(--transition);
            z-index: 10;
        }

        .close-modal:hover {
            color: var(--danger);
            transform: rotate(90deg);
        }

        .modal-header {
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: var(--gradient-3);
            padding: 15px;
            border-radius: var(--border-radius);
            color: white;
        }

        .modal-header h3 {
            font-size: 1.6rem;
            color: white;
        }

        .modal-body {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .modal-footer {
            margin-top: 15px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .fullscreen-toggle {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
            color: white;
        }

        .fullscreen-toggle:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }

        .form-group-modal {
            margin-bottom: 15px;
        }

        .form-group-modal label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--dark);
        }

        .modal-title-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: var(--transition);
            background: var(--light);
            color: var(--dark);
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
        }

        .modal-title-input:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }

        .modal-content-textarea {
            flex: 1;
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: var(--transition);
            background: var(--light);
            color: var(--dark);
            resize: none;
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.05);
        }

        .modal-content-textarea:focus {
            border-color: var(--primary);
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.2);
        }

        .modal-content.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            max-width: 100%;
            border-radius: 0;
            z-index: 2000;
            padding: 20px;
        }

        .modal-content.fullscreen .modal-body {
            height: calc(100% - 100px);
        }

        .modal-content.fullscreen .modal-content-textarea {
            height: 100%;
        }

        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            background: var(--light);
            color: var(--dark);
            box-shadow: var(--shadow-lg);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(110%);
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            border-left: 5px solid;
        }

        .toast.show {
            transform: translateX(0);
        }

        .toast.success {
            border-left-color: var(--success);
            background: linear-gradient(to right, rgba(76, 201, 240, 0.1), var(--light));
        }

        .toast.error {
            border-left-color: var(--danger);
            background: linear-gradient(to right, rgba(249, 65, 68, 0.1), var(--light));
        }

        .toast.info {
            border-left-color: var(--primary);
            background: linear-gradient(to right, rgba(67, 97, 238, 0.1), var(--light));
        }

        .toast i {
            font-size: 1.5rem;
        }

        /* Particles */
        #particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            border-radius: 50%;
            background: var(--accent);
            animation: float 15s infinite linear;
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes fadeInSlideUp {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes scaleIn {
            from { 
                opacity: 0;
                transform: scale(0.8);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes headerSlideDown {
            from { 
                transform: translateY(-100%);
            }
            to { 
                transform: translateY(0);
            }
        }

        @keyframes logoSpring {
            0% { 
                transform: translateX(-50px) scale(0.8);
                opacity: 0;
            }
            70% { 
                transform: translateX(10px) scale(1.1);
            }
            100% { 
                transform: translateX(0) scale(1);
                opacity: 1;
            }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        @keyframes pulseBorder {
            0% { border-color: var(--primary); }
            50% { border-color: var(--success); }
            100% { border-color: var(--primary); }
        }

        @keyframes fadeInScale {
            from { 
                opacity: 0;
                transform: scale(0.9);
            }
            to { 
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        @keyframes float {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(100px) rotate(360deg);
                opacity: 0;
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                gap: 15px;
            }
            
            .notes-container {
                grid-template-columns: 1fr;
            }
            
            .auth-container {
                padding: 25px 15px;
            }
            
            .btn {
                padding: 8px 15px;
            }
            
            .logo h1 {
                font-size: 1.8rem;
            }
            
            .logo i {
                font-size: 2rem;
            }
            
            .modal-content {
                width: 95%;
                height: 85vh;
            }
        }
    </style>
</head>
<body>
    <!-- Particles for background effects -->
    <div id="particles"></div>
    
    <!-- Header -->
    <header>
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-book-open"></i>
                    <h1>CVang Notebook</h1>
                </div>
                <div class="header-actions">
                    <button class="theme-toggle" id="themeToggle">
                        <i class="fas fa-moon"></i>
                    </button>
                    <div class="auth-buttons" id="authButtons">
                        <button class="btn btn-outline" id="loginBtn">
                            <i class="fas fa-sign-in-alt"></i> Login
                        </button>
                        <button class="btn btn-primary" id="signupBtn">
                            <i class="fas fa-user-plus"></i> Sign Up
                        </button>
                    </div>
                    <div class="profile-dropdown" id="profileDropdown" style="display: none;">
                        <button class="profile-btn" id="profileBtn">
                            <i class="fas fa-user"></i>
                        </button>
                        <div class="dropdown-content" id="dropdownContent">
                            <div class="user-info">
                                <div class="user-avatar">
                                    <i class="fas fa-user"></i>
                                </div>
                                <div class="user-details">
                                    <h3 id="userName">John Doe</h3>
                                    <p id="userEmail">john@example.com</p>
                                </div>
                            </div>
                            <div class="dropdown-actions">
                                <a href="#" class="dropdown-action">
                                    <i class="fas fa-cog"></i> Settings
                                </a>
                                <a href="#" class="dropdown-action">
                                    <i class="fas fa-user-edit"></i> Edit Profile
                                </a>
                                <a href="#" class="dropdown-action" id="dropdownLogoutBtn">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Auth Section -->
    <section class="auth-section" id="authSection">
        <div class="auth-container">
            <div class="auth-header">
                <h2 id="authTitle">Welcome Back!</h2>
                <p id="authSubtitle">Please sign in to access your notebook</p>
            </div>
            <form id="authForm">
                <div class="form-group" id="nameGroup" style="display: none;">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" class="form-control" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" class="form-control" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" placeholder="Enter your password">
                </div>
                <div class="form-group" id="verificationGroup" style="display: none;">
                    <label for="verificationCode">Verification Code</label>
                    <input type="text" id="verificationCode" class="form-control" placeholder="Enter verification code">
                </div>
                <button type="submit" class="btn btn-primary" id="authSubmit" style="width: 100%;">
                    Sign In
                </button>
            </form>
            <div class="form-footer">
                <p id="authToggle">Don't have an account? <a href="#" id="toggleAuth">Sign Up</a></p>
            </div>
        </div>
    </section>

    <!-- Notes Section -->
    <section class="notes-section container" id="notesSection">
        <div class="welcome-message">
            <h2>Your Personal Notebook</h2>
            <p>Create, organize, and manage your notes, tasks, and routines all in one place.</p>
        </div>
        <div class="notes-container" id="notesContainer">
            <!-- Notes will be dynamically added here -->
            <div class="note-card add-note" id="addNoteBtn">
                <i class="fas fa-plus-circle"></i>
                <p>Add New Note</p>
            </div>
        </div>
    </section>

    <!-- Note Modal -->
    <div class="modal" id="noteModal">
        <div class="modal-content" id="modalContent">
            <button class="close-modal" id="closeModal">&times;</button>
            <div class="modal-header">
                <h3 id="modalTitle">Create New Note</h3>
                <button class="fullscreen-toggle" id="fullscreenToggle">
                    <i class="fas fa-expand"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group-modal">
                    <label for="noteTitle">Title</label>
                    <input type="text" id="noteTitle" class="modal-title-input" placeholder="Note title">
                </div>
                <textarea id="noteContent" class="modal-content-textarea" placeholder="Write your note here..."></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="action-btn delete-btn" id="cancelNoteBtn">
                    <i class="fas fa-times"></i> Cancel
                </button>
                <button type="submit" class="action-btn edit-btn" id="saveNoteBtn">
                    <i class="fas fa-save"></i> Save Note
                </button>
            </div>
        </div>
    </div>

    <!-- Toast Notification -->
    <div class="toast" id="toast">
        <i class="fas fa-check-circle"></i>
        <span id="toastMessage">Operation completed successfully!</span>
    </div>

    <script>
        // Initialize Supabase
        const supabaseUrl = 'https://your-supabase-url.supabase.co';
        const supabaseKey = 'your-supabase-public-key';
        const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

        // DOM Elements
        const themeToggle = document.getElementById('themeToggle');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const logoutBtn = document.getElementById('dropdownLogoutBtn');
        const authButtons = document.getElementById('authButtons');
        const profileDropdown = document.getElementById('profileDropdown');
        const profileBtn = document.getElementById('profileBtn');
        const dropdownContent = document.getElementById('dropdownContent');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        const authSection = document.getElementById('authSection');
        const notesSection = document.getElementById('notesSection');
        const authForm = document.getElementById('authForm');
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        const authSubmit = document.getElementById('authSubmit');
        const toggleAuth = document.getElementById('toggleAuth');
        const nameGroup = document.getElementById('nameGroup');
        const verificationGroup = document.getElementById('verificationGroup');
        const notesContainer = document.getElementById('notesContainer');
        const addNoteBtn = document.getElementById('addNoteBtn');
        const noteModal = document.getElementById('noteModal');
        const closeModal = document.getElementById('closeModal');
        const modalTitle = document.getElementById('modalTitle');
        const noteForm = document.getElementById('noteForm');
        const noteTitle = document.getElementById('noteTitle');
        const noteContent = document.getElementById('noteContent');
        const cancelNoteBtn = document.getElementById('cancelNoteBtn');
        const saveNoteBtn = document.getElementById('saveNoteBtn');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const fullscreenToggle = document.getElementById('fullscreenToggle');
        const modalContent = document.getElementById('modalContent');
        const particlesContainer = document.getElementById('particles');

        // State variables
        let isLoginMode = true;
        let currentUser = null;
        let isVerificationMode = false;
        let currentNoteId = null;
        let dropdownOpen = false;
        let isFullscreen = false;

        // Create particles
        function createParticles() {
            const colors = ['#4361ee', '#7209b7', '#f72585', '#4cc9f0', '#f9c74f'];
            
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random properties
                const size = Math.random() * 8 + 2;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const animationDuration = Math.random() * 15 + 10;
                const delay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.background = color;
                particle.style.animation = `float ${animationDuration}s ${delay}s infinite linear`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Theme Toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                createParticles();
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Profile Dropdown Toggle
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownOpen = !dropdownOpen;
            dropdownContent.classList.toggle('show', dropdownOpen);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (dropdownOpen && !e.target.closest('.profile-dropdown')) {
                dropdownOpen = false;
                dropdownContent.classList.remove('show');
            }
        });

        // Fullscreen toggle
        fullscreenToggle.addEventListener('click', () => {
            isFullscreen = !isFullscreen;
            modalContent.classList.toggle('fullscreen', isFullscreen);
            const icon = fullscreenToggle.querySelector('i');
            if (isFullscreen) {
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
            } else {
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            }
        });

        // Auth Mode Toggle
        toggleAuth.addEventListener('click', (e) => {
            e.preventDefault();
            isLoginMode = !isLoginMode;
            updateAuthUI();
        });

        function updateAuthUI() {
            if (isLoginMode) {
                authTitle.textContent = 'Welcome Back!';
                authSubtitle.textContent = 'Please sign in to access your notebook';
                authSubmit.textContent = 'Sign In';
                toggleAuth.textContent = 'Sign Up';
                document.querySelector('#authToggle p').innerHTML = 'Don\'t have an account? <a href="#" id="toggleAuth">Sign Up</a>';
                nameGroup.style.display = 'none';
                verificationGroup.style.display = 'none';
            } else {
                authTitle.textContent = 'Create Account';
                authSubtitle.textContent = 'Join us to start your notebook journey';
                authSubmit.textContent = 'Sign Up';
                toggleAuth.textContent = 'Sign In';
                document.querySelector('#authToggle p').innerHTML = 'Already have an account? <a href="#" id="toggleAuth">Sign In</a>';
                nameGroup.style.display = 'block';
                verificationGroup.style.display = 'none';
            }
            
            // Reattach event listener after updating content
            document.getElementById('toggleAuth').addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode = !isLoginMode;
                updateAuthUI();
            });
        }

        // Form Submission
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = document.getElementById('name').value;
            
            if (isVerificationMode) {
                const verificationCode = document.getElementById('verificationCode').value;
                // Verify the code (implementation needed)
                showToast('Account verified successfully!', 'success');
                isVerificationMode = false;
                verificationGroup.style.display = 'none';
                isLoginMode = true;
                updateAuthUI();
                return;
            }
            
            if (isLoginMode) {
                // Simulate login
                if (email && password) {
                    currentUser = {
                        id: 'user123',
                        email: email,
                        name: name || 'John Doe'
                    };
                    showToast('Login successful!', 'success');
                    updateUIAfterAuth();
                } else {
                    showToast('Please fill all fields', 'error');
                }
            } else {
                // Simulate signup
                if (email && password && name) {
                    // Show verification step
                    isVerificationMode = true;
                    verificationGroup.style.display = 'block';
                    showToast('Verification code sent to your email', 'info');
                } else {
                    showToast('Please fill all fields', 'error');
                }
            }
        });

        // Logout
        logoutBtn.addEventListener('click', () => {
            currentUser = null;
            authSection.style.display = 'flex';
            notesSection.style.display = 'none';
            profileDropdown.style.display = 'none';
            authButtons.style.display = 'flex';
            dropdownOpen = false;
            dropdownContent.classList.remove('show');
            showToast('Logged out successfully', 'success');
        });

        // Note Management
        addNoteBtn.addEventListener('click', () => {
            currentNoteId = null;
            noteTitle.value = '';
            noteContent.value = '';
            modalTitle.textContent = 'Create New Note';
            noteModal.style.display = 'flex';
            isFullscreen = false;
            modalContent.classList.remove('fullscreen');
            const icon = fullscreenToggle.querySelector('i');
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        });

        closeModal.addEventListener('click', () => {
            noteModal.style.display = 'none';
        });

        cancelNoteBtn.addEventListener('click', () => {
            noteModal.style.display = 'none';
        });

        saveNoteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const title = noteTitle.value;
            const content = noteContent.value;
            
            if (!title || !content) {
                showToast('Please fill both title and content', 'error');
                return;
            }
            
            if (currentNoteId) {
                // Update existing note
                showToast('Note updated successfully', 'success');
            } else {
                // Create new note
                createNoteCard(title, content);
                showToast('Note created successfully', 'success');
            }
            
            noteModal.style.display = 'none';
        });

        // Create sample notes
        function createSampleNotes() {
            const sampleNotes = [
                { id: 1, title: 'Meeting Notes', content: 'Discussed project timeline and deliverables for Q3. Need to follow up with design team.', date: '2 hours ago' },
                { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread, Fruits, Vegetables, Coffee', date: 'Yesterday' },
                { id: 3, title: 'Project Ideas', content: '1. Mobile app for task management\n2. E-commerce platform\n3. Fitness tracking application', date: 'Jun 15, 2023' },
                { id: 4, title: 'Book Recommendations', content: '1. Atomic Habits - James Clear\n2. Deep Work - Cal Newport\n3. The Psychology of Money - Morgan Housel', date: 'Jun 10, 2023' }
            ];
            
            sampleNotes.forEach(note => {
                createNoteCard(note.title, note.content, note.date, note.id);
            });
        }
        
        function createNoteCard(title, content, date = 'Just now', id = null) {
            const noteCard = document.createElement('div');
            noteCard.className = 'note-card';
            noteCard.dataset.id = id || Date.now();
            
            noteCard.innerHTML = `
                <div class="note-header">
                    <h3 class="note-title">${title}</h3>
                    <span class="note-date">${date}</span>
                </div>
                <div class="note-content">
                    ${content.replace(/\n/g, '<br>')}
                </div>
                <div class="note-actions">
                    <button class="action-btn edit-btn edit-note">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn delete-note">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            // Insert before the add note button
            notesContainer.insertBefore(noteCard, addNoteBtn);
            
            // Add event listeners
            noteCard.querySelector('.edit-note').addEventListener('click', () => {
                currentNoteId = noteCard.dataset.id;
                noteTitle.value = title;
                noteContent.value = content;
                modalTitle.textContent = 'Edit Note';
                noteModal.style.display = 'flex';
                isFullscreen = false;
                modalContent.classList.remove('fullscreen');
                const icon = fullscreenToggle.querySelector('i');
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            });
            
            noteCard.querySelector('.delete-note').addEventListener('click', () => {
                noteCard.style.animation = 'fadeOut 0.5s forwards';
                setTimeout(() => {
                    noteCard.remove();
                }, 500);
                showToast('Note deleted', 'success');
            });
        }
        
        function updateUIAfterAuth() {
            authSection.style.display = 'none';
            notesSection.style.display = 'block';
            profileDropdown.style.display = 'block';
            authButtons.style.display = 'none';
            userName.textContent = currentUser.name;
            userEmail.textContent = currentUser.email;
            
            // Clear existing notes and add sample ones
            notesContainer.innerHTML = '';
            notesContainer.appendChild(addNoteBtn);
            createSampleNotes();
        }
        
        function showToast(message, type = 'success') {
            toastMessage.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Initialize
        createParticles();
        updateAuthUI();
    </script>
</body>
</html>
