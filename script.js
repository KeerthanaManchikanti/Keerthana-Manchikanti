
const giftForm = document.getElementById('giftForm');
const recommendationsSection = document.getElementById('recommendations');
const giftList = document.getElementById('giftList');

// --- Paste the `giftDatabase` object here (the entire structure) ---

// Function to categorize the hobby input
function categorizeHobby(hobby) {
    const hobbyLower = hobby.toLowerCase().trim();
    if (hobbyLower.includes('read') || hobbyLower.includes('book') || hobbyLower.includes('literature')) return 'reading';
    if (hobbyLower.includes('gam') || hobbyLower.includes('play') || hobbyLower.includes('video') || hobbyLower.includes('board')) return 'gaming';
    if (hobbyLower.includes('cook') || hobbyLower.includes('bak') || hobbyLower.includes('chef') || hobbyLower.includes('kitchen')) return 'cooking';
    if (hobbyLower.includes('travel') || hobbyLower.includes('explor') || hobbyLower.includes('adventure') || hobbyLower.includes('tour')) return 'traveling';
    if (hobbyLower.includes('art') || hobbyLower.includes('paint') || hobbyLower.includes('draw') || hobbyLower.includes('sketch') || hobbyLower.includes('craft')) return 'art';
    if (hobbyLower.includes('sport') || hobbyLower.includes('run') || hobbyLower.includes('swim') || hobbyLower.includes('gym') || hobbyLower.includes('fit')) return 'sports';
    return 'other';
}

// Function to categorize the occasion input
function categorizeOccasion(occasion) {
    const occasionLower = occasion.toLowerCase().trim();
    if (occasionLower.includes('birth') || occasionLower.includes('bday')) return 'birthday';
    if (occasionLower.includes('anniv') || occasionLower.includes('wed') || occasionLower.includes('marriage') || occasionLower.includes('valentine')) return 'anniversary';
    if (occasionLower.includes('holi') || occasionLower.includes('christ') || occasionLower.includes('new year') || occasionLower.includes('diwali') || occasionLower.includes('fest')) return 'holiday';
    if (occasionLower.includes('grad') || occasionLower.includes('school') || occasionLower.includes('college') || occasionLower.includes('degree') || occasionLower.includes('congrat')) return 'graduation';
    return 'birthday';
}

giftForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const recipientName = document.getElementById('recipientName').value.trim();
    const hobbyInput = document.getElementById('hobby').value.trim();
    const occasionInput = document.getElementById('occasion').value.trim();

    if (!recipientName || !hobbyInput || !occasionInput) {
        alert('Please fill out all fields.');
        return;
    }

    const hobbyCategory = categorizeHobby(hobbyInput);
    const occasionCategory = categorizeOccasion(occasionInput);

    let recommendations;
    try {
        recommendations = giftDatabase[hobbyCategory][occasionCategory];
        if (!recommendations || recommendations.length === 0) {
            throw new Error('No recommendations available');
        }
    } catch (error) {
        giftList.innerHTML = '<p>No recommendations available for this combination. Try a different hobby or occasion.</p>';
        recommendationsSection.style.display = 'block';
        window.scrollTo(0, recommendationsSection.offsetTop);
        return;
    }

    giftList.innerHTML = '';

    recommendations.forEach(recommendation => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');
        giftItem.innerHTML = `
            <h3>${recommendation.gift} for ${recipientName} (${occasionInput})</h3>
            <p>${recommendation.reason}</p>
        `;
        giftList.appendChild(giftItem);
    });

    recommendationsSection.style.display = 'block';
    window.scrollTo(0, recommendationsSection.offsetTop);
});
