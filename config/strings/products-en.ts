import type { Product } from '@/lib/products';

type TranslatedProduct = Pick<Product, 'name' | 'subtitle' | 'summary' | 'description' | 'features' | 'platform' | 'tags' | 'privacy' | 'screenshots'>;

/** The Vietnamese product catalog lives in content/products.json. Generated content: keep both files in sync. */
export const productsEn: Record<string, TranslatedProduct> = {
  'paper-war': {
    "name": "Paper War",
    "subtitle": "Battle Paper · Chiến Tranh Giấy",
    "summary": "Flick pens across folded paper — two players on one device.",
    "description": "Paper War brings the Vietnamese schoolkid game of poking a pen through folded paper to mobile, plus a Battleship mode. Secretly place soldiers or ships, fold the sheet, and poke to take out your opponent. Play a friend on one device or the computer on 3 difficulty levels, fully offline.",
    "features": [
      "Two games in one: Paper War and Battleship",
      "Pass-and-play for two, with a cover screen that hides each formation",
      "Versus the computer on Easy / Medium / Hard",
      "Customize 9 pens, 13 paper styles and 3 backgrounds",
      "Lively 2.5D paper folding and pen-poking effects",
      "Auto-save, win/loss stats, fully offline"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Versus",
      "Folk game"
    ],
    "screenshots": [
      {
        "src": "/apps/paper-war/shots/en-01.webp",
        "caption": "Home: play a friend or the computer"
      },
      {
        "src": "/apps/paper-war/shots/en-02.webp",
        "caption": "Set up a game against the computer"
      },
      {
        "src": "/apps/paper-war/shots/en-03.webp",
        "caption": "The computer pokes through the paper"
      }
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Paper War is an offline game. We do not require an account, do not ask for your name, email or phone number, and do not sell your data.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings (language, sound) and game progress are stored in the app’s private storage. We have no server that this data is uploaded to. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows banner and interstitial ads through Google AdMob. The ad provider may process your device advertising ID, app set ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Notifications and updates</h2>\n<p>The app uses Firebase Cloud Messaging for optional notifications, Firebase Remote Config for configuration and Google Play In-App Update to announce new versions. These services may process your notification token, device information, app version and region.</p>\n<p>Notifications are optional: the app asks for permission when needed, and you can decline or turn them off in system settings without affecting gameplay.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>, <a href=\"https://www.apple.com/legal/privacy/\" rel=\"noopener\">Apple</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. All of the app’s network connections are encrypted over HTTPS. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'triangle-master': {
    "name": "Triangle Master",
    "subtitle": "Pencil Puzzle · Nối Chấm",
    "summary": "Connect the dots into triangles with as few strokes as possible.",
    "description": "Triangle Master is a pencil-sketch puzzle: connect dots into triangles without crossing lines, reach the triangle target and cover every dot — in as few strokes as possible. Every level has a solver-verified optimal stroke count.",
    "features": [
      "160 levels across 8 chapters",
      "1–3 stars based on strokes versus the optimal solution",
      "Smart hints, free undo and dead-end warnings",
      "Collect 9 pens and 6 paper themes",
      "Pinch-zoom and pan the board; left-handed mode",
      "Sound effects, relaxing music, vibration; plays offline"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Puzzle",
      "Brain"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Triangle Master is an offline puzzle game. We do not require an account, do not ask for your name, email or phone number, and do not sell your data.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Game progress (completed levels, strokes, stars) and settings (sound, paper, pen) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows interstitial ads and optional rewarded ads through Google AdMob. The ad provider may process your device advertising ID, app set ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. All of the app’s network connections are encrypted over HTTPS. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'o-quan-viet': {
    "name": "Mandarin Square Capturing",
    "subtitle": "Ô Quan Việt · Folk Strategy",
    "summary": "The Vietnamese folk board game for 2–4 players.",
    "description": "Ô Quan Việt brings the Vietnamese folk game Ô ăn quan (Mandarin square capturing) to mobile for 2–4 players on rectangular, triangular or square boards. Play friends or the computer on 3 difficulty levels, with hints, undo, achievements and hand-drawn rural ground art.",
    "features": [
      "Rectangle board for 2, triangle for 3, square for 4 players",
      "Play friends on one device or the computer on Easy / Medium / Hard",
      "Move hints, undo and auto-save",
      "Tutorial, statistics and 6 achievements",
      "5 hand-drawn grounds: dirt, cement and brick with stick, chalk and charcoal lines",
      "Accessibility: reduced motion, color-blind symbols, light/dark theme"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Folk game",
      "Strategy"
    ],
    "screenshots": [
      {
        "src": "/apps/o-quan-viet/shots/01.webp",
        "caption": "Two-player game on the rectangle board"
      },
      {
        "src": "/apps/o-quan-viet/shots/02.webp",
        "caption": "Three-player game on the triangle board"
      },
      {
        "src": "/apps/o-quan-viet/shots/03.webp",
        "caption": "Four-player game on the square board"
      },
      {
        "src": "/apps/o-quan-viet/shots/04.webp",
        "caption": "Versus the computer: pick players and difficulty"
      },
      {
        "src": "/apps/o-quan-viet/shots/05.webp",
        "caption": "Play with friends: set player names"
      }
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Mandarin Square Capturing (Ô Quan Việt) is an offline game. We do not require an account and do not collect your name, email or phone number. Player names you enter are stored only on your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings (language, sound, difficulty) and progress are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows banner and interstitial ads through Google AdMob. The ad provider may process your device advertising ID, app set ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Update services</h2>\n<p>Firebase Remote Config, Google Play In-App Update and the Shorebird patch service may process the app version and device information to announce or deliver fixes. This data is retained under the providers’ policies.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. All of the app’s network connections are encrypted over HTTPS. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'iron-turn': {
    "name": "VPN Tank",
    "subtitle": "Iron Turn · Xe Tăng VPN",
    "summary": "Turn-based tank combat with crisp 2D roguelike visuals.",
    "description": "Turn-based battles with a tank squad: play campaigns, manage in-game money and items, then fight the computer or friends in online rooms. Runs on the web (installable PWA), iOS and Android.",
    "features": [
      "Turn-based tank campaigns",
      "Fight the computer or friends in online rooms",
      "Play as a guest or register to keep progress"
    ],
    "platform": "Web (PWA) · Android · iOS",
    "tags": [
      "Strategy",
      "Online"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>VPN Tank has accounts to save progress and connect friends for online play. This policy describes what data is stored and where.</p>\n</section>\n<section>\n<h2>Accounts</h2>\n<p>You can play as a guest: just enter a display name and the system creates a guest key stored on your device to recognize you.</p>\n<p>You can also register with a username and password. Passwords are one-way hashed before storage; we never store the original password.</p>\n</section>\n<section>\n<h2>Data stored on our servers</h2>\n<p>When you play online, the server stores your display name, campaign progress, in-game money and items, friend list and room invitations, and match results (room, mode, turns, winner). Guest account data is kept until you register or ask for deletion.</p>\n</section>\n<section>\n<h2>Stored on your device</h2>\n<p>Progress and settings are stored on your device so you can keep playing offline.</p>\n</section>\n<section>\n<h2>Infrastructure and updates</h2>\n<p>Our hosting provider may process technical data such as IP address and access times to operate the service. The app may download updates from our servers; this collects no additional personal data.</p>\n</section>\n<section>\n<h2>Ads and analytics</h2>\n<p>VPN Tank currently shows no ads and uses no third-party behavioral analytics.</p>\n</section>\n<section>\n<h2>Data retention</h2>\n<p>Account data is kept while the account is active. On-device data is removed when you clear browser data or uninstall the app.</p>\n</section>\n<section id=\"xoa-tai-khoan\">\n<h2>Delete your VPN Tank account</h2>\n<p>To delete your VPN Tank account and all associated data:</p>\n<ol><li>Email <a href=\"mailto:contact@vpndigital.io.vn?subject=Delete%20VPN%20Tank%20account\">contact@vpndigital.io.vn</a> with the subject “Delete VPN Tank account”.</li><li>Include your username or display name.</li><li>We confirm and complete the deletion within 30 days.</li></ol>\n<p>Deleted data: display name, login details, campaign progress, in-game money and items, friend list, room invitations and match results. We keep no data after deletion unless required by law.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. All of the app’s network connections are encrypted over HTTPS. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  '100-dot-tre': {
    "name": "100 Bamboo Joints",
    "subtitle": "100 Đốt Tre · Path Puzzle",
    "summary": "Link paths through bamboo joints — no internet needed.",
    "description": "A path-linking puzzle across bamboo joints. Fully offline, no ads and no account.",
    "features": [
      "Link paths through bamboo joints",
      "Fully offline",
      "No ads"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Puzzle",
      "Relaxing"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>100 Đốt Tre works offline. It requires no account, collects no personal information and sends no data off your device. The app has no ads.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Any game progress lives only in the app’s storage on your device. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'dung-de-thay-thay': {
    "name": "Don't Let Teacher See!",
    "subtitle": "Đừng Để Thầy Thấy! · Classroom Mischief",
    "summary": "A funny stealth game set in a Vietnamese classroom.",
    "description": "A 2D stealth-comedy game set in a Vietnamese classroom, built with Flutter and Flame. Plays offline.",
    "features": [
      "Sneak around a Vietnamese classroom",
      "Funny 2D style",
      "Plays offline"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Comedy",
      "Stealth"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Đừng Để Thầy Thấy! works offline. It requires no account, collects no personal information and sends no data off your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Game progress and settings (sound, language) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'keo': {
    "name": "KEO – Cross the Lines",
    "subtitle": "KEO · Vượt Phòng Tuyến",
    "summary": "Break through the guard lines — an offline game.",
    "description": "KEO – Cross the Lines is a short-session action game: read the guards’ patrol rhythm, slip past 5 lines to the goal, then return without getting caught. It has 10 progressively harder levels, 3 characters and best-time records.",
    "features": [
      "Cross 5 guarded lines to the goal, then run back to start",
      "10 levels with more guards and rising difficulty",
      "Virtual joystick controls",
      "Choose one of 3 characters: Kéo, Mai, Nam",
      "Unlock levels and keep best-time records",
      "Plays offline; music, sound and vibration settings"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Action",
      "Folk game"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>KEO – Vượt Phòng Tuyến works offline. It requires no account, collects no personal information and sends no data off your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings and level progress are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'hidden-vision': {
    "name": "Hidden Vision",
    "subtitle": "Secrets in Color · Bí Mật Trong Màu Sắc",
    "summary": "Find numbers, letters, shapes, animals and objects hidden in 30 color-dot plates.",
    "description": "Hidden Vision is a 2D puzzle game: spot numbers, letters, shapes, animals and objects hidden in 30 Ishihara-inspired color-dot plates. It is for entertainment only, not a vision test.",
    "features": [
      "30 dot plates across 5 palettes and 5 content groups",
      "Two modes: Classic (3 lives) and Relax (no life loss), no timer",
      "Up to 180 points and 3 stars per level, unlocking the next",
      "Earn coins for Color Boost and 50/50 helpers",
      "Free accessibility: high contrast, text quiz, reduced motion",
      "Player profile, sound/vibration, progress reset"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Puzzle",
      "Color"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Bí Mật Trong Màu Sắc (Hidden Vision) works offline. It requires no account, collects no personal information and sends no data off your device. The app has no ads.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Progress and settings (sound) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>The dot plates are for entertainment only and are not a vision diagnosis. Results are never sent anywhere.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'my-eyes': {
    "name": "My Eyes",
    "subtitle": "See Through My Eyes · Đôi Mắt",
    "summary": "An offline app to simulate and compare differences in color vision.",
    "description": "My Eyes is an offline app for experiencing and comparing how color-vision deficiencies change what you see, using the live camera, your photos or sample scenes. It also offers color-separation aids, simulated color-blind glasses and an indicative color-vision test. It is educational and does not diagnose.",
    "features": [
      "Simulate red, green, blue and no-color vision with adjustable strength",
      "Live camera (with “Freeze and compare”), your photos or 6 sample scenes",
      "Compare with the original via a split divider or side by side",
      "Color-separation aids and simulated color-blind glasses",
      "Indicative 20-question color-vision test",
      "Explore and Learn sections with references"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Education",
      "Color"
    ],
    "screenshots": [
      {
        "src": "/apps/my-eyes/shots/01.webp",
        "caption": "Sample scene: traffic"
      },
      {
        "src": "/apps/my-eyes/shots/02.webp",
        "caption": "Sample scene: food"
      },
      {
        "src": "/apps/my-eyes/shots/03.webp",
        "caption": "Sample scene: charts"
      },
      {
        "src": "/apps/my-eyes/shots/04.webp",
        "caption": "Sample scene: classroom"
      }
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>My Eyes processes all images on your device. It requires no account, has no ads and never uploads photos or personal data to a server.</p>\n</section>\n<section>\n<h2>Camera and photos</h2>\n<p>The app asks for camera permission when you open the camera screen to show a real-time simulation, and photo access when you pick a photo to simulate. Images are processed only in device memory and are never saved or sent. The app does not record audio.</p>\n<p>You can revoke these permissions at any time in system settings.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Your settings are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>External links</h2>\n<p>Some content links to external reference pages, which open in your browser and are governed by those sites’ policies.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>Simulations are educational only and are not a vision diagnosis.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'lumiverse': {
    "name": "LumiVerse",
    "subtitle": "Interactive Live Wallpapers",
    "summary": "3D-style interactive live wallpapers for Android — preview and apply in the app.",
    "description": "LumiVerse is an interactive live-wallpaper app for Android: touch, tilt or shake and the scene reacts. Browse templates by category, try them live in the app, save favourites to your library and set them through Android’s wallpaper picker.",
    "features": [
      "Live wallpapers that react to touch and tilt",
      "Browse 6 categories: Anime, Cute, Nature, Physics, Relax, Space",
      "Interactive full-screen preview with a time-of-day picker",
      "Set as home and/or lock screen wallpaper",
      "A library for your favourite templates",
      "Device compatibility check; 5 interface languages"
    ],
    "platform": "Android",
    "tags": [
      "Wallpaper",
      "Personalization"
    ],
    "screenshots": [
      {
        "src": "/apps/lumiverse/shots/01.webp",
        "caption": "A selection of live wallpaper templates"
      },
      {
        "src": "/apps/lumiverse/shots/02.webp",
        "caption": "The cute animal collection"
      }
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>LumiVerse requires no account and does not collect your name, email or phone number.</p>\n</section>\n<section>\n<h2>Wallpaper template sync</h2>\n<p>The app downloads the wallpaper catalog and template files from our server. Our server and hosting provider may process technical data such as IP address and access times to operate the service. The catalog is cached on your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Selected templates, customizations and settings are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows optional rewarded ads through Google AdMob. The ad provider may process your device advertising ID, app set ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>We store no personal data on our servers. Infrastructure technical logs are retained under the provider’s policies.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. All of the app’s network connections are encrypted over HTTPS. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'colorsense': {
    "name": "ColorSense",
    "subtitle": "Educational Color Exercises · Cảm Nhận Màu Sắc",
    "summary": "An educational app for adults (18+) with color exercises based on simulated scenarios.",
    "description": "ColorSense is an educational app for adults (18+) with three short color-discrimination exercises, each preceded by a safety check. It also includes a color-name helper and knowledge articles, all offline with no account.",
    "features": [
      "3 exercises: dot plates, color strip ordering and odd-tile spotting",
      "Safety check before each exercise, pointing to a specialist if warning signs appear",
      "Pause/resume and an educational result report",
      "Opt-in history profile; delete one entry or everything",
      "Color-name helper",
      "Knowledge articles on color; Vietnamese and English interface"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Education",
      "Color"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>ColorSense works entirely on your device. It requires no account, has no ads and sends no data off your device.</p>\n</section>\n<section>\n<h2>Exercise results</h2>\n<p>Results are saved only with your consent and are encrypted in the operating system’s secure storage. You can review, delete individual results or delete everything under Profile. With history off, unfinished progress exists only while the app is open.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>Content is educational and not for diagnosis. Facilities listed under Clinics are fictional examples.</p>\n</section>\n<section>\n<h2>Age</h2>\n<p>The app is intended for people aged 18 and over and does not knowingly collect information from children.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>Results stay on your device until you delete them under Profile or uninstall the app. No data is stored on our servers.</p>\n</section>\n<section>\n<h2>Data security</h2>\n<p>Data on your device is kept in the app’s private storage, which other apps cannot access. The app does not send data over the network. We never sell your personal data to anyone.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  }
};
