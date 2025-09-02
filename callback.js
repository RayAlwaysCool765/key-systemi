document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
        try {
            const clientId = '1350775177985921034';
            const clientSecret = '6CjCu5SmTnRUWrB2DwBc4GjNuQ-pgbmg';
            const redirectUri = 'https://discord-ivory.vercel.app/callback'; // REPLACE WITH YOUR REDIRECT URI
            
            // Exchange code for access token
            const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirectUri,
                    scope: 'identify',
                }),
            });
            
            const tokenData = await tokenResponse.json();
            if (tokenData.error) {
                throw new Error(tokenData.error_description);
            }
            
            const accessToken = tokenData.access_token;
            
            // Fetch user data
            const userResponse = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            
            const userData = await userResponse.json();
            if (userData.error) {
                throw new Error(userData.error_description);
            }
            
            // Store user data (username and avatar URL) in localStorage
            const avatarUrl = userData.avatar ?
                `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` :
                'https://cdn.discordapp.com/embed/avatars/0.png'; // Default avatar if none exists
            
            const userInfo = {
                username: `${userData.username}#${userData.discriminator}`,
                avatar: avatarUrl,
            };
            
            localStorage.setItem('discordUser', JSON.stringify(userInfo));
            
            // Redirect back to the main page
            window.location.href = '/';
        } catch (error) {
            console.error('Error during authentication:', error);
            document.querySelector('.container').innerHTML = `
                <h1>Authentication Failed</h1>
                <p>An error occurred: ${error.message}</p>
                <a href="/" class="discord-button">Go Back</a>
            `;
        }
    } else {
        document.querySelector('.container').innerHTML = `
            <h1>Authentication Failed</h1>
            <p>No authorization code provided.</p>
            <a href="/" class="discord-button">Go Back</a>
        `;
    }
});
