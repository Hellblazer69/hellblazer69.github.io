   // Character data with categories
   const characters = {
    protagonists: [
        { image: "photos/photo1.jpeg" },
        { image: "photos/photo7.jpeg" }
    ],
    antagonists: [
        { image: "photos/photo2.jpeg" },
        { image: "photos/photo3.jpeg" },
        { image: "photos/photo4.jpeg" },
        { image: "photos/photo5.jpeg" }
    ]
};

// Get DOM elements first
const protagonistsGallery = document.getElementById('protagonistsGallery');
const antagonistsGallery = document.getElementById('antagonistsGallery');
const selectAllBtn = document.getElementById('selectAllBtn');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const submitBtn = document.getElementById('submitBtn');
let selectedCharacters = [];

// Function to get raw filename without extension
function getRawFilename(imagePath) {
    // Get everything after last slash and before last dot
    const filename = imagePath.split('/').pop().split('.')[0];
    return filename;
}

// Helper function to create character cards
function createCharacterCard(character, index, type, container) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';
    photoDiv.dataset.index = index;
    photoDiv.dataset.type = type;
    photoDiv.dataset.name = character.name;
    
    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    img.loading = 'lazy';
    
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';
    
    const nameLabel = document.createElement('div');
    nameLabel.className = 'character-name';
    nameLabel.textContent = character.name;
    nameLabel.style.position = 'absolute';
    nameLabel.style.bottom = '0';
    nameLabel.style.left = '0';
    nameLabel.style.right = '0';
    nameLabel.style.backgroundColor = 'rgba(0,0,0,0.7)';
    nameLabel.style.color = 'white';
    nameLabel.style.padding = '8px';
    nameLabel.style.textAlign = 'center';
    nameLabel.style.fontSize = '14px';
    
    photoDiv.appendChild(img);
    photoDiv.appendChild(checkbox);
    photoDiv.appendChild(nameLabel);
    container.appendChild(photoDiv);

    // Add click event to toggle selection
    photoDiv.addEventListener('click', (e) => {
        if (e.target === checkbox) return;
        
        photoDiv.classList.toggle('selected');
        updateSelectedCharacters(index, photoDiv.classList.contains('selected'), character.name, type);
    });
}

// Update selected characters array and toggle submit button
function updateSelectedCharacters(index, isSelected, name, type) {
    const character = { index, name, type };
    
    if (isSelected) {
        if (!selectedCharacters.some(c => c.index === index)) {
            selectedCharacters.push(character);
        }
    } else {
        selectedCharacters = selectedCharacters.filter(c => c.index !== index);
    }
    
    // Show/hide submit button based on selection
    submitBtn.style.display = selectedCharacters.length > 0 ? 'block' : 'none';
}

// Create photo elements for protagonists
characters.protagonists.forEach((character, index) => {
    character.name = getRawFilename(character.image);
    createCharacterCard(character, index, 'protagonist', protagonistsGallery);
});

// Create photo elements for antagonists
characters.antagonists.forEach((character, index) => {
    character.name = getRawFilename(character.image);
    createCharacterCard(character, index + characters.protagonists.length, 'antagonist', antagonistsGallery);
});

// Select all characters
selectAllBtn.addEventListener('click', () => {
    document.querySelectorAll('.photo').forEach(photo => {
        photo.classList.add('selected');
        const index = parseInt(photo.dataset.index);
        const name = photo.dataset.name;
        const type = photo.dataset.type;
        
        if (!selectedCharacters.some(c => c.index === index)) {
            selectedCharacters.push({ index, name, type });
        }
    });
    submitBtn.style.display = 'block';
});

// Clear selection
clearSelectionBtn.addEventListener('click', () => {
    document.querySelectorAll('.photo').forEach(photo => {
        photo.classList.remove('selected');
    });
    selectedCharacters = [];
    submitBtn.style.display = 'none';
});

// Submit selection
submitBtn.addEventListener('click', () => {
    // Group selected characters by type
    const selection = {
        protagonists: selectedCharacters.filter(c => c.type === 'protagonist'),
        antagonists: selectedCharacters.filter(c => c.type === 'antagonist')
    };
    
    // Display selection details
    alert(`You have submitted:
        \nProtagonists: ${selection.protagonists.map(c => c.name).join(', ') || 'None'}
        \nAntagonists: ${selection.antagonists.map(c => c.name).join(', ') || 'None'}`);
});