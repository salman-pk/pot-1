SALMAN AHMED PORTFOLIO + ADMIN (works on Netlify and Vercel, no PHP)

STEP 1  Go to supabase.com, sign up free, click New project. Wait until it is ready.
STEP 2  Left menu > SQL Editor > New query. Paste everything from supabase-setup.sql and click Run.
STEP 3  Left menu > Project Settings > API. Copy "Project URL" and the "anon public" key.
        Open config.js and paste them between the quotes. Save.
STEP 4  Left menu > Authentication > Users > Add user > Create new user.
        Email: admin@example.com   Password: Admin@123   (tick "Auto Confirm User")
        This is your TEST login. Change the password in Admin > Security right after logging in.
STEP 5  Authentication > Sign In / Providers (or Settings) > turn OFF "Allow new users to sign up". Important for safety.
STEP 6  Deploy:
        Netlify: go to app.netlify.com/drop and drag this whole folder in. Done.
        Vercel: put the folder in a GitHub repository, then on vercel.com click Add New > Project > import it > Deploy.
STEP 7  Open yourdomain/admin.html and log in.

YOUTUBE: upload on YouTube, make sure "Allow embedding" is ticked, copy the normal link, paste it in Admin > Portfolio & Videos.
