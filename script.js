document.addEventListener('DOMContentLoaded', () => {
    const clientId = '1350775177985921034';
    const redirectUri = encodeURIComponent('https://discord-ivory.vercel.app/callback'); // REPLACE WITH YOUR REDIRECT URI
    const discordLoginUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify`;
    
    const loginButton = document.getElementById('discord-login');
    const logoutButton = document.getElementById('logout-button');
    const loginSection = document.getElementById('login-section');
    const userSection = document.getElementById('user-section');
    const userPfp = document.getElementById('user-pfp');
    const userName = document.getElementById('user-name');
    
    // Check if user data is stored in localStorage
    const userData = JSON.parse(localStorage.getItem('discordUser'));
    if (userData) {
        loginSection.style.display = 'none';
        userSection.style.display = 'block';
        userName.textContent = userData.username;
        userPfp.src = userData.avatar;
    }
    
    loginButton.href = discordLoginUrl;
    
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('discordUser');
        loginSection.style.display = 'block';
        userSection.style.display = 'none';
        userName.textContent = '';
        userPfp.src = '';
    });
});
