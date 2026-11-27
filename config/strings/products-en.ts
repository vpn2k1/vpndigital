import type { Product } from '@/lib/products';

type TranslatedProduct = Pick<Product, 'name' | 'subtitle' | 'summary' | 'description' | 'features' | 'platform' | 'tags' | 'privacy'>;

/** The Vietnamese product catalog lives in content/products.json. Generated content: keep both files in sync. */
export const productsEn: Record<string, TranslatedProduct> = {
  'paper-war': {
    "name": "Paper War",
    "subtitle": "Battle Paper · Chiến Tranh Giấy",
    "summary": "Flick pens across folded paper — two players on one device.",
    "description": "The classic Vietnamese schoolyard pen-flicking game on folded paper. Pick the paper, pens and soldier names for each side, then play a friend on the same device or the computer at three difficulty levels.",
    "features": [
      "Versus mode: two players on one device",
      "Versus computer: Easy / Medium / Hard",
      "Many papers, pens and soldier names to choose"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Versus",
      "Folk game"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Paper War is an offline game. We do not require an account, do not ask for your name, email or phone number, and do not sell your data.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings (language, sound) and game progress are stored in the app’s private storage. We have no server that this data is uploaded to. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows banner and interstitial ads through Google AdMob. The ad provider may process your device advertising ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Notifications and updates</h2>\n<p>The app uses Firebase Cloud Messaging for optional notifications, Firebase Remote Config for configuration and Google Play In-App Update to announce new versions. These services may process your notification token, device information, app version and region.</p>\n<p>Notifications are optional: the app asks for permission when needed, and you can decline or turn them off in system settings without affecting gameplay.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>, <a href=\"https://www.apple.com/legal/privacy/\" rel=\"noopener\">Apple</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'triangle-master': {
    "name": "Triangle Master",
    "subtitle": "Pencil Puzzle · Nối Chấm",
    "summary": "Connect the dots into triangles with as few strokes as possible.",
    "description": "A pencil-sketch notebook puzzle about connecting dots into triangles. Every level has a solver-verified optimal stroke count, with many papers and pens to choose from.",
    "features": [
      "Form triangles with the fewest strokes",
      "Levels verified for the optimal stroke count",
      "Many papers and pens, fully offline"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Puzzle",
      "Brain"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Triangle Master is an offline puzzle game. We do not require an account, do not ask for your name, email or phone number, and do not sell your data.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Game progress (completed levels, strokes, stars) and settings (sound, paper, pen) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows interstitial ads and optional rewarded ads through Google AdMob. The ad provider may process your device advertising ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'o-quan-viet': {
    "name": "Mandarin Square Capturing",
    "subtitle": "Ô Quan Việt · Folk Strategy",
    "summary": "The Vietnamese folk board game for 2–4 players.",
    "description": "Ô ăn quan (Mandarin square capturing) for 2–4 players: a rectangle board for two, a triangle for three and a square for four. Play the computer at three difficulty levels or a friend on one device.",
    "features": [
      "Boards for 2, 3 and 4 players",
      "Versus computer: Easy / Medium / Hard",
      "Play friends on the same device"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Folk game",
      "Strategy"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Mandarin Square Capturing (Ô Quan Việt) is an offline game. We do not require an account and do not collect your name, email or phone number. Player names you enter are stored only on your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings (language, sound, difficulty) and progress are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows banner and interstitial ads through Google AdMob. The ad provider may process your device advertising ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Update services</h2>\n<p>Firebase Remote Config, Google Play In-App Update and the Shorebird patch service may process the app version and device information to announce or deliver fixes. This data is retained under the providers’ policies.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>On-device data remains until you clear the app data or uninstall the app. Technical data processed by Google is retained under Google’s policies.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
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
    "privacy": "<section>\n<h2>Overview</h2>\n<p>VPN Tank has accounts to save progress and connect friends for online play. This policy describes what data is stored and where.</p>\n</section>\n<section>\n<h2>Accounts</h2>\n<p>You can play as a guest: just enter a display name and the system creates a guest key stored on your device to recognize you.</p>\n<p>You can also register with a username and password. Passwords are one-way hashed before storage; we never store the original password.</p>\n</section>\n<section>\n<h2>Data stored on our servers</h2>\n<p>When you play online, the server stores your display name, campaign progress, in-game money and items, friend list and room invitations, and match results (room, mode, turns, winner). Guest account data is kept until you register or ask for deletion.</p>\n</section>\n<section>\n<h2>Stored on your device</h2>\n<p>Progress and settings are stored on your device so you can keep playing offline.</p>\n</section>\n<section>\n<h2>Infrastructure and updates</h2>\n<p>Our hosting provider may process technical data such as IP address and access times to operate the service. The app may download updates from our servers; this collects no additional personal data.</p>\n</section>\n<section>\n<h2>Ads and analytics</h2>\n<p>VPN Tank currently shows no ads and uses no third-party behavioral analytics.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>You can request deletion of your account and server data by emailing <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>. On-device data is removed when you clear browser data or uninstall the app.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
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
    "privacy": "<section>\n<h2>Overview</h2>\n<p>100 Đốt Tre works offline. It requires no account, collects no personal information and sends no data off your device. The app has no ads.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Any game progress lives only in the app’s storage on your device. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
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
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Đừng Để Thầy Thấy! works offline. It requires no account, collects no personal information and sends no data off your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Game progress and settings (sound, language) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'keo': {
    "name": "KEO – Cross the Lines",
    "subtitle": "KEO · Vượt Phòng Tuyến",
    "summary": "Break through the guard lines — an offline game.",
    "description": "An offline five-line crossing game: steer with a joystick, dodge computer-controlled guards and unlock levels as you go.",
    "features": [
      "Five guarded lines to cross",
      "Joystick controls",
      "Unlockable levels, fully offline"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Action",
      "Folk game"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>KEO – Vượt Phòng Tuyến works offline. It requires no account, collects no personal information and sends no data off your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Settings and level progress are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>No data is stored on our servers. Uninstalling the app removes all local data.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'hidden-vision': {
    "name": "Hidden Vision",
    "subtitle": "Secrets in Color · Bí Mật Trong Màu Sắc",
    "summary": "Find numbers, letters, shapes, animals and objects hidden in 30 color-dot plates.",
    "description": "A 2D Vietnamese-language puzzle game. The dot plates are Ishihara-inspired for entertainment only; the game is not a vision test.",
    "features": [
      "30 color-dot plates",
      "Find numbers, letters, shapes, animals, objects",
      "Plays offline"
    ],
    "platform": "Android · iOS · Web",
    "tags": [
      "Puzzle",
      "Color"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>Bí Mật Trong Màu Sắc (Hidden Vision) works offline. It requires no account, collects no personal information and sends no data off your device. The app has no ads.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Progress and settings (sound) are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>The dot plates are for entertainment only and are not a vision diagnosis. Results are never sent anywhere.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'my-eyes': {
    "name": "My Eyes",
    "subtitle": "See Through My Eyes · Đôi Mắt",
    "summary": "An offline app to simulate and compare differences in color vision.",
    "description": "My Eyes lets you explore and compare modeled color-vision differences through the live camera, your photos or illustrated scenes. The interface follows your device language (English or Vietnamese). Educational only, not a diagnostic tool.",
    "features": [
      "Live camera simulation",
      "Simulation on photos from your library",
      "Illustrated scenes and educational content"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Education",
      "Color"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>My Eyes processes all images on your device. It requires no account, has no ads and never uploads photos or personal data to a server.</p>\n</section>\n<section>\n<h2>Camera and photos</h2>\n<p>The app asks for camera permission when you open the camera screen to show a real-time simulation, and photo access when you pick a photo to simulate. Images are processed only in device memory and are never saved or sent. The app does not record audio.</p>\n<p>You can revoke these permissions at any time in system settings.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Your settings are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>External links</h2>\n<p>Some content links to external reference pages, which open in your browser and are governed by those sites’ policies.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>Simulations are educational only and are not a vision diagnosis.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'lumiverse': {
    "name": "LumiVerse",
    "subtitle": "Interactive Live Wallpapers",
    "summary": "3D-style interactive live wallpapers for Android — preview and apply in the app.",
    "description": "LumiVerse offers 3D-style interactive live wallpaper templates. Preview, customize and set them as your system wallpaper; new templates sync from our server.",
    "features": [
      "3D-style interactive live wallpapers",
      "Preview, customize and apply",
      "A template library that keeps growing"
    ],
    "platform": "Android",
    "tags": [
      "Wallpaper",
      "Personalization"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>LumiVerse requires no account and does not collect your name, email or phone number.</p>\n</section>\n<section>\n<h2>Wallpaper template sync</h2>\n<p>The app downloads the wallpaper catalog and template files from our server. Our server and hosting provider may process technical data such as IP address and access times to operate the service. The catalog is cached on your device.</p>\n</section>\n<section>\n<h2>Data stored on your device</h2>\n<p>Selected templates, customizations and settings are stored in the app’s private storage. Uninstalling the app deletes all of this data.</p>\n</section>\n<section>\n<h2>Advertising</h2>\n<p>The app shows optional rewarded ads through Google AdMob. The ad provider may process your device advertising ID, IP address, device type, operating system, region and ad interactions to serve ads and prevent fraud.</p>\n<p>You can manage personalized ads in your device settings: Android: Settings → Google → Ads; iOS: Settings → Privacy &amp; Security → Tracking.</p>\n<p class=\"links\">Privacy policy of <a href=\"https://policies.google.com/privacy\" rel=\"noopener\">Google</a>.</p>\n</section>\n<section>\n<h2>Retention and deletion</h2>\n<p>We store no personal data on our servers. Infrastructure technical logs are retained under the provider’s policies.</p>\n</section>\n<section>\n<h2>Children</h2>\n<p>The app is not directed at children under 13 and we do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with information, please contact us and we will handle it.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  },
  'colorsense': {
    "name": "ColorSense",
    "subtitle": "Educational Color Exercises · Cảm Nhận Màu Sắc",
    "summary": "An educational app for adults (18+) with color exercises based on simulated scenarios.",
    "description": "ColorSense offers educational color exercises built on simulated scenarios, color assistance tools and a results profile stored on your device. Vietnamese by default, with English available. It does not replace a professional examination.",
    "features": [
      "Color exercises with simulated scenarios",
      "Color assistance tools",
      "Results profile you can delete anytime"
    ],
    "platform": "Android · iOS",
    "tags": [
      "Education",
      "Color"
    ],
    "privacy": "<section>\n<h2>Overview</h2>\n<p>ColorSense works entirely on your device. It requires no account, has no ads and sends no data off your device.</p>\n</section>\n<section>\n<h2>Exercise results</h2>\n<p>Results are saved only with your consent and are encrypted in the operating system’s secure storage. You can review, delete individual results or delete everything under Profile. With history off, unfinished progress exists only while the app is open.</p>\n</section>\n<section>\n<h2>Not a medical tool</h2>\n<p>Content is educational and not for diagnosis. Facilities listed under Clinics are fictional examples.</p>\n</section>\n<section>\n<h2>Age</h2>\n<p>The app is intended for people aged 18 and over and does not knowingly collect information from children.</p>\n</section>\n<section>\n<h2>Contact</h2>\n<p>For any questions about this policy, please email <a href=\"mailto:contact@vpndigital.io.vn\">contact@vpndigital.io.vn</a>.</p>\n</section>\n<section>\n<h2>Changes to this policy</h2>\n<p>When this policy changes, we will update this page and the “Last updated” date.</p>\n</section>"
  }
};
