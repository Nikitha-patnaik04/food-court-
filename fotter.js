// JavaScript to handle social media icon clicks
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(event) {
        const platform = this.getAttribute('data-platform');
        console.log(`Navigating to ${platform}`);
    });
});