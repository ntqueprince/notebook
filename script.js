// Initialize Supabase
const supabaseUrl = 'https://amsrxpzwgjleqebacgpl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtc3J4cHp3Z2psZXFlYmFjZ3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDQ1MDcsImV4cCI6MjA2NzMyMDUwN30.rka0TwVVu2virQPNThD5q4uBxVwQjjBUp5Odzag2JYc';

// CHANGE: Variable ka naam 'supabase' se badal kar 'supabaseClient' kar diya hai taaki conflict na ho
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

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
const toggleAuthLink = document.getElementById('toggleAuthLink');
const nameGroup = document.getElementById('nameGroup');
const verificationGroup = document.getElementById('verificationGroup');
const notesContainer = document.getElementById('notesContainer');
const addNoteBtn = document.getElementById('addNoteBtn');
const addNoteTopBtn = document.getElementById('addNoteTopBtn');

// Modal Elements
const noteModal = document.getElementById('noteModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
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
let currentNoteId = null;
let dropdownOpen = false;
let isFullscreen = false;
let isSavingNote = false;

// Top Button Event Listener
if (addNoteTopBtn) {
    addNoteTopBtn.addEventListener('click', () => {
        currentNoteId = null;
        modalTitle.textContent = 'Create New Note';
        noteTitle.value = '';
        noteContent.value = '';
        noteModal.style.display = 'flex';
    });
}

// Function to create particles
function createParticles() {
    const colors = ['#4361ee', '#7209b7', '#f72585', '#4cc9f0', '#f9c74f'];

    if (!particlesContainer) return; // Safety check

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

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
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Profile Dropdown Toggle
if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownOpen = !dropdownOpen;
        dropdownContent.classList.toggle('show', dropdownOpen);
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (dropdownOpen && !e.target.closest('.profile-dropdown')) {
        dropdownOpen = false;
        dropdownContent.classList.remove('show');
    }
});

// Fullscreen toggle
if (fullscreenToggle) {
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
}

// Auth Mode Toggle
if (toggleAuthLink) {
    toggleAuthLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        updateAuthUI();
    });
}

function updateAuthUI() {
    if (isLoginMode) {
        authTitle.textContent = 'Welcome Back!';
        authSubtitle.textContent = 'Please sign in to access your notebook';
        authSubmit.textContent = 'Sign In';
        toggleAuthLink.textContent = 'Sign Up';
        document.querySelector('#authToggle p').innerHTML = 'Don\'t have an account? <a href="#" id="toggleAuthLink">Sign Up</a>';
        nameGroup.style.display = 'none';
        verificationGroup.style.display = 'none';
    } else {
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join us to start your notebook journey';
        authSubmit.textContent = 'Sign Up';
        toggleAuthLink.textContent = 'Sign In';
        document.querySelector('#authToggle p').innerHTML = 'Already have an account? <a href="#" id="toggleAuthLink">Sign In</a>';
        nameGroup.style.display = 'block';
        verificationGroup.style.display = 'none';
    }
}

// --- Supabase Auth Integration ---
if (authForm) {
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const name = document.getElementById('name').value;

        if (isLoginMode) {
            // Updated to use supabaseClient
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showToast(error.message, 'error');
            } else {
                showToast('Login successful!', 'success');
            }
        } else {
            // Updated to use supabaseClient
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                showToast(error.message, 'error');
            } else if (data.user) {
                showToast('Signup successful! Please check your email for verification.', 'info');
                isLoginMode = true;
                updateAuthUI();
            }
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        // Updated to use supabaseClient
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            showToast(error.message, 'error');
        } else {
            showToast('Logged out successfully', 'success');
        }
    });
}

// Supabase Auth State Change Listener
// Updated to use supabaseClient
supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        currentUser = session.user;
        updateUIAfterAuth();
    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        authSection.style.display = 'flex';
        notesSection.style.display = 'none';
        profileDropdown.style.display = 'none';
        authButtons.style.display = 'flex';
        dropdownOpen = false;
        dropdownContent.classList.remove('show');
        notesContainer.innerHTML = '';
        if (addNoteBtn) notesContainer.appendChild(addNoteBtn);
    }
});

// --- Note Management ---
if (addNoteBtn) {
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
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        noteModal.style.display = 'none';
    });
}

if (cancelNoteBtn) {
    cancelNoteBtn.addEventListener('click', () => {
        noteModal.style.display = 'none';
    });
}

// Save Note Button
if (saveNoteBtn) {
    saveNoteBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (isSavingNote) {
            console.log('Already saving, ignoring duplicate request.');
            return;
        }

        const title = noteTitle.value;
        const content = noteContent.value;

        if (!title || !content) {
            showToast('Please fill both title and content', 'error');
            return;
        }

        if (!currentUser) {
            showToast('Please login to save notes.', 'error');
            return;
        }

        isSavingNote = true;
        saveNoteBtn.disabled = true;
        saveNoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            if (currentNoteId) {
                // Updated to use supabaseClient
                const { data, error } = await supabaseClient
                    .from('notes')
                    .update({ title, content })
                    .eq('id', currentNoteId)
                    .select();

                if (error) {
                    showToast(error.message, 'error');
                } else {
                    showToast('Note updated successfully', 'success');
                    fetchNotes();
                }
            } else {
                // Updated to use supabaseClient
                const { data, error } = await supabaseClient
                    .from('notes')
                    .insert([
                        { title, content, user_id: currentUser.id }
                    ])
                    .select();

                if (error) {
                    showToast(error.message, 'error');
                } else if (data && data.length > 0) {
                    showToast('Note created successfully', 'success');
                    fetchNotes();
                } else {
                    showToast('Note creation failed: No data returned.', 'error');
                }
            }
        } catch (networkError) {
            showToast('An unexpected error occurred: ' + networkError.message, 'error');
        } finally {
            isSavingNote = false;
            saveNoteBtn.disabled = false;
            saveNoteBtn.innerHTML = '<i class="fas fa-save"></i> Save Note';
            noteModal.style.display = 'none';
        }
    });
}

// Fetch notes from Supabase
async function fetchNotes() {
    if (!currentUser) {
        notesContainer.innerHTML = '';
        if (addNoteBtn) notesContainer.appendChild(addNoteBtn);
        return;
    }

    // Clear existing notes but keep the add button
    const existingNotes = notesContainer.querySelectorAll('.note-card:not(.add-note)');
    existingNotes.forEach(note => note.remove());

    // Updated to use supabaseClient
    const { data, error } = await supabaseClient
        .from('notes')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

    if (error) {
        showToast(error.message, 'error');
    } else {
        const groupedNotes = {};
        data.forEach(note => {
            if (!groupedNotes[note.title]) {
                groupedNotes[note.title] = [];
            }
            groupedNotes[note.title].push(note);
        });

        // Ensure notesContainer is ready and has the button
        notesContainer.innerHTML = '';
        if (addNoteBtn) notesContainer.appendChild(addNoteBtn);

        for (const title in groupedNotes) {
            if (groupedNotes.hasOwnProperty(title)) {
                const notesForTitle = groupedNotes[title].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                let contentHtml = '';
                let lastDate = '';

                notesForTitle.forEach((note, index) => {
                    const noteDate = new Date(note.created_at);
                    const currentDateFormatted = noteDate.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });

                    // Add date separator if date changes
                    if (currentDateFormatted !== lastDate) {
                        contentHtml += `<div class="note-date-separator"><span>${currentDateFormatted}</span></div>`;
                        lastDate = currentDateFormatted;
                    }
                    contentHtml += `${note.content.replace(/\n/g, '<br>')}<br>`;
                });

                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.dataset.id = notesForTitle[0].id;

                noteCard.innerHTML = `
                    <div class="note-header">
                        <h3 class="note-title">${title}</h3>
                        <div class="note-header-right">
                            <span class="note-date">${new Date(notesForTitle[0].created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            <i class="fas fa-chevron-down expand-icon"></i>
                        </div>
                    </div>
                    <div class="note-content">
                        ${contentHtml}
                    </div>
                    <div class="note-actions">
                        <div class="left-actions">
                            <button class="action-btn edit-btn edit-note">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                        </div>
                        <button class="action-btn delete-btn delete-note">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                `;

                notesContainer.insertBefore(noteCard, addNoteBtn);

                // Event listener for the note header (for toggling expand/collapse)
                noteCard.querySelector('.note-header').addEventListener('click', (event) => {
                    document.querySelectorAll('.note-card.expanded').forEach(card => {
                        if (card !== noteCard) {
                            card.classList.remove('expanded');
                        }
                    });
                    noteCard.classList.toggle('expanded');
                });

                noteCard.querySelector('.note-content').addEventListener('click', (event) => {
                    event.stopPropagation(); 
                });

                // Edit Note
                noteCard.querySelector('.edit-note').addEventListener('click', (event) => {
                    event.stopPropagation();
                    currentNoteId = notesForTitle[0].id;
                    noteTitle.value = notesForTitle[0].title;
                    noteContent.value = notesForTitle[0].content;
                    modalTitle.textContent = 'Edit Note';
                    noteModal.style.display = 'flex';
                    isFullscreen = false;
                    modalContent.classList.remove('fullscreen');
                    const icon = fullscreenToggle.querySelector('i');
                    icon.classList.remove('fa-compress');
                    icon.classList.add('fa-expand');
                });

                // Delete Note
                noteCard.querySelector('.delete-note').addEventListener('click', async (event) => {
                    event.stopPropagation();
                    const noteIdToDelete = notesForTitle[0].id;
                    if (!noteIdToDelete) {
                        showToast('Error: Note ID missing.', 'error');
                        return;
                    }

                    if (!confirm('Are you sure you want to delete this note?')) return;

                    // Updated to use supabaseClient
                    const { error } = await supabaseClient
                        .from('notes')
                        .delete()
                        .eq('id', noteIdToDelete);

                    if (error) {
                        showToast(error.message, 'error');
                    } else {
                        if (notesForTitle.length === 1) {
                            noteCard.style.animation = 'fadeOut 0.5s forwards';
                            setTimeout(() => {
                                noteCard.remove();
                            }, 500);
                        } else {
                            fetchNotes();
                        }
                        showToast('Note deleted', 'success');
                    }
                });
            }
        }
    }
}

async function updateUIAfterAuth() {
    authSection.style.display = 'none';
    notesSection.style.display = 'block';
    profileDropdown.style.display = 'block';
    authButtons.style.display = 'none';

    const userFullName = currentUser.user_metadata?.full_name || currentUser.email;
    userName.textContent = userFullName;
    userEmail.textContent = currentUser.email;

    await fetchNotes();
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
// Updated to use supabaseClient
supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        currentUser = session.user;
        updateUIAfterAuth();
    } else {
        updateAuthUI();
    }
});

// Global click listener
document.addEventListener('click', (event) => {
    if (!event.target.closest('.note-card') && !event.target.closest('#addNoteBtn')) {
        document.querySelectorAll('.note-card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    }
});
