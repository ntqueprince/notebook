// Initialize Supabase
const supabaseUrl = 'https://amsrxpzwgjleqebacgpl.supabase.co'; //
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtc3J4cHp3Z2psZXFlYmFjZ3BsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NDQ1MDcsImV4cCI6MjA2NzMyMDUwN30.rka0TwVVu2virQPNThD5q4uBxVwQjjBUp5Odzag2JYc'; //
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
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const fullNameInput = document.getElementById('fullName');
const signupFields = document.getElementById('signupFields');
const submitAuthBtn = document.getElementById('submitAuthBtn');
const switchAuthModeBtn = document.getElementById('switchAuthModeBtn');
const noteTitleInput = document.getElementById('noteTitle');
const noteContentInput = document.getElementById('noteContent');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesGrid = document.getElementById('notesGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const filterSelect = document.getElementById('filterSelect');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const noteModal = document.getElementById('noteModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalNoteTitle = document.getElementById('modalNoteTitle');
const modalNoteContent = document.getElementById('modalNoteContent');
const modalNoteTags = document.getElementById('modalNoteTags');
const noteTagsInput = document.getElementById('noteTags');


let currentUser = null;
let isSignUpMode = false;
let editingNoteId = null; // To keep track of the note being edited


// Particle Animation (from original index.html)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particlesContainer.appendChild(particle);
        }
    }
}


// Theme Toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.querySelector('i').className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
}


// Auth UI Functions
function updateAuthUI() {
    if (authButtons) authButtons.style.display = 'flex';
    if (profileDropdown) profileDropdown.style.display = 'none';
    if (notesSection) notesSection.style.display = 'none';
    if (authSection) authSection.style.display = 'flex'; // Ensure auth section is visible, using 'flex' as it's a common container display
    isSignUpMode = false; // Default to login
    updateAuthFormUI();
}

function updateUIAfterAuth() {
    if (authButtons) authButtons.style.display = 'none';
    if (profileDropdown) profileDropdown.style.display = 'flex';
    if (notesSection) notesSection.style.display = 'block';
    if (authSection) authSection.style.display = 'none';
    const userFullName = currentUser.user_metadata?.full_name || currentUser.email;
    if (userName) userName.textContent = userFullName;
    if (userEmail) userEmail.textContent = currentUser.email;

    fetchNotes(); // Fetch notes after successful login
}

function updateAuthFormUI() {
    if (!authTitle || !signupFields || !submitAuthBtn || !switchAuthModeBtn) return;

    if (isSignUpMode) {
        authTitle.textContent = 'Sign Up';
        signupFields.style.display = 'block';
        submitAuthBtn.textContent = 'Sign Up';
        switchAuthModeBtn.innerHTML = 'Already have an account? <span>Login</span>';
    } else {
        authTitle.textContent = 'Login';
        signupFields.style.display = 'none';
        submitAuthBtn.textContent = 'Login';
        switchAuthModeBtn.innerHTML = "Don't have an account? <span>Sign Up</span>";
    }
    // Clear form fields
    if (emailInput) emailInput.value = '';
    if (passwordInput) passwordInput.value = '';
    if (confirmPasswordInput) confirmPasswordInput.value = '';
    if (fullNameInput) fullNameInput.value = '';
}

// Event Listeners for Login/Signup buttons in header
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        console.log("Login button clicked.");
        isSignUpMode = false;
        updateAuthFormUI();
        if (authSection) {
            authSection.style.display = 'flex'; // Use flex
            console.log("Auth section display set to flex.");
        } else {
            console.error("authSection not found.");
        }
        if (notesSection) {
            notesSection.style.display = 'none';
            console.log("Notes section display set to none.");
        } else {
            console.error("notesSection not found.");
        }
    });
} else {
    console.error("Login button not found.");
}

if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        console.log("Sign Up button clicked.");
        isSignUpMode = true;
        updateAuthFormUI();
        if (authSection) {
            authSection.style.display = 'flex'; // Use flex
            console.log("Auth section display set to flex.");
        } else {
            console.error("authSection not found.");
        }
        if (notesSection) {
            notesSection.style.display = 'none';
            console.log("Notes section display set to none.");
        } else {
            console.error("notesSection not found.");
        }
    });
} else {
    console.error("Sign Up button not found.");
}


// Handle Auth Form Submission
if (authForm) {
    authForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = emailInput ? emailInput.value : '';
        const password = passwordInput ? passwordInput.value : '';
        const fullName = fullNameInput ? fullNameInput.value : '';
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

        if (isSignUpMode) {
            if (password !== confirmPassword) {
                showToast('Passwords do not match!', 'error');
                return;
            }
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { full_name: fullName }
                }
            });
            if (error) {
                showToast(error.message, 'error');
            } else {
                showToast('Sign Up successful! Please check your email to confirm.', 'success');
            }
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                showToast(error.message, 'error');
            } else {
                currentUser = data.user;
                showToast('Login successful!', 'success');
                updateUIAfterAuth();
            }
        }
    });
}


// Switch Auth Mode
if (switchAuthModeBtn) {
    switchAuthModeBtn.addEventListener('click', () => {
        isSignUpMode = !isSignUpMode;
        updateAuthFormUI();
    });
}


// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            showToast(error.message, 'error');
        } else {
            currentUser = null;
            showToast('Logged out successfully!', 'success');
            updateAuthUI();
        }
    });
}


// Profile Dropdown Toggle
if (profileBtn && dropdownContent) {
    profileBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent global click listener from immediately closing
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (profileDropdown && !profileDropdown.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
}


// CRUD Operations for Notes

// Add/Update Note
if (addNoteBtn) {
    addNoteBtn.addEventListener('click', async () => {
        const title = noteTitleInput ? noteTitleInput.value.trim() : '';
        const content = noteContentInput ? noteContentInput.value.trim() : '';
        const tags = noteTagsInput ? noteTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];

        if (!title || !content) {
            showToast('Please enter both title and content for the note.', 'warning');
            return;
        }

        if (editingNoteId) {
            // Update existing note
            const { error } = await supabase
                .from('notes')
                .update({ title, content, tags, updated_at: new Date().toISOString() })
                .eq('id', editingNoteId);

            if (error) {
                showToast('Error updating note: ' + error.message, 'error');
            } else {
                showToast('Note updated successfully!', 'success');
                if (noteTitleInput) noteTitleInput.value = '';
                if (noteContentInput) noteContentInput.value = '';
                if (noteTagsInput) noteTagsInput.value = '';
                addNoteBtn.textContent = 'Add Note'; // Reset button text
                editingNoteId = null; // Clear editing state
                fetchNotes();
            }
        } else {
            // Add new note
            const { data, error } = await supabase
                .from('notes')
                .insert([{ user_id: currentUser.id, title, content, tags }]);

            if (error) {
                showToast('Error adding note: ' + error.message, 'error');
            } else {
                showToast('Note added successfully!', 'success');
                if (noteTitleInput) noteTitleInput.value = '';
                if (noteContentInput) noteContentInput.value = '';
                if (noteTagsInput) noteTagsInput.value = '';
                fetchNotes();
            }
        }
    });
}


// Fetch Notes
async function fetchNotes() {
    if (!currentUser || !notesGrid) return; // Ensure currentUser and notesGrid exist

    let query = supabase
        .from('notes')
        .select('*')
        .eq('user_id', currentUser.id);

    // Apply search filter
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
    }

    // Apply tag filter
    const filterTag = filterSelect ? filterSelect.value : 'all';
    if (filterTag && filterTag !== 'all') {
        query = query.filter('tags', 'cs', `{${filterTag}}`);
    }

    // Apply sort order
    const sortBy = sortSelect ? sortSelect.value : 'newest';
    if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
    } else if (sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true });
    } else if (sortBy === 'title-asc') {
        query = query.order('title', { ascending: true });
    } else if (sortBy === 'title-desc') {
        query = query.order('title', { ascending: false });
    }


    const { data: notes, error } = await query;

    if (error) {
        showToast('Error fetching notes: ' + error.message, 'error');
        return;
    }

    notesGrid.innerHTML = '';
    if (notes.length === 0) {
        notesGrid.innerHTML = '<p class="no-notes-message">No notes found. Start by adding a new note!</p>';
        return;
    }

    // Group notes by date
    const groupedNotes = notes.reduce((acc, note) => {
        const date = new Date(note.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(note);
        return acc;
    }, {});

    // Display notes with date separators
    for (const date in groupedNotes) {
        const dateSeparator = document.createElement('div');
        dateSeparator.classList.add('note-date-separator');
        dateSeparator.innerHTML = `<span>${date}</span>`;
        notesGrid.appendChild(dateSeparator);

        groupedNotes[date].forEach(note => {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');
            noteCard.dataset.id = note.id;
            noteCard.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content.substring(0, 100)}${note.content.length > 100 ? '...' : ''}</p>
                ${note.tags && note.tags.length > 0 ? `<div class="note-tags">${note.tags.map(tag => `<span>#${tag}</span>`).join('')}</div>` : ''}
                <div class="note-actions">
                    <button class="btn btn-sm btn-outline view-btn" data-id="${note.id}"><i class="fas fa-eye"></i> View</button>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${note.id}"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${note.id}"><i class="fas fa-trash"></i> Delete</button>
                </div>
            `;
            notesGrid.appendChild(noteCard);
        });
    }


    // Add event listeners to new buttons
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', (event) => viewNote(event.target.dataset.id));
    });
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (event) => editNote(event.target.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (event) => deleteNote(event.target.dataset.id));
    });
}


// View Note (Modal)
async function viewNote(id) {
    const { data: note, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        showToast('Error fetching note details: ' + error.message, 'error');
        return;
    }
    if (modalNoteTitle) modalNoteTitle.textContent = note.title;
    if (modalNoteContent) modalNoteContent.textContent = note.content;
    if (modalNoteTags) modalNoteTags.innerHTML = note.tags && note.tags.length > 0 ? note.tags.map(tag => `<span>#${tag}</span>`).join('') : 'No tags';
    if (noteModal) noteModal.style.display = 'flex'; // Show modal
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        if (noteModal) noteModal.style.display = 'none'; // Hide modal
    });
}

window.addEventListener('click', (event) => {
    if (event.target === noteModal) {
        noteModal.style.display = 'none';
    }
});


// Edit Note
async function editNote(id) {
    const { data: note, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        showToast('Error fetching note for editing: ' + error.message, 'error');
        return;
    }

    if (noteTitleInput) noteTitleInput.value = note.title;
    if (noteContentInput) noteContentInput.value = note.content;
    if (noteTagsInput) noteTagsInput.value = note.tags ? note.tags.join(', ') : '';
    if (addNoteBtn) addNoteBtn.textContent = 'Update Note'; // Change button text
    editingNoteId = note.id; // Set editing state
    // Scroll to the top to make sure the form is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Delete Note
async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

    if (error) {
        showToast('Error deleting note: ' + error.message, 'error');
    } else {
        showToast('Note deleted successfully!', 'success');
        fetchNotes();
    }
}

// Search and Filter/Sort Event Listeners
if (searchInput) searchInput.addEventListener('input', fetchNotes);
if (sortSelect) sortSelect.addEventListener('change', fetchNotes);
if (filterSelect) filterSelect.addEventListener('change', fetchNotes);


function showToast(message, type = 'success') {
    if (toastMessage && toast) {
        toastMessage.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize
createParticles();
supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
        currentUser = session.user;
        updateUIAfterAuth();
    } else {
        updateAuthUI();
    }
});

// Global click listener to close all expanded cards if click is outside any note card
document.addEventListener('click', (event) => {
    // Check if the click target is outside any note-card and not part of the add-note button
    // This listener will only trigger if the click is truly outside any note card or the add note button.
    if (!event.target.closest('.note-card') && !event.target.closest('#addNoteBtn')) {
        document.querySelectorAll('.note-card.expanded').forEach(card => {
            card.classList.remove('expanded');
        });
    }
});