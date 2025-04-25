(function () {
    'use strict';

    const profileContainer = document.querySelector('.profile-container');
    const profileIcon = document.querySelector('.profile-icon');
    const profileDetails = document.querySelector('.profile-details');

    if (profileIcon && profileDetails && profileContainer) {
        profileIcon.addEventListener('click', function () {
            profileDetails.classList.toggle('visible');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (event) {
            if (!profileContainer.contains(event.target)) {
                profileDetails.classList.remove('visible');
            }
        });
    } else {
        console.error('Profile icon, details element, or container not found.');
    }
})();