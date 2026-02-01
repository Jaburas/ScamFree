# ScamFree 2.0: AI-Powered Phishing Detection
ScamFree is a specialized Chrome Extension and Node.js backend designed to identify and flag potential email scams in real-time. Developed during a 2026 hackathon, this tool empowers users to navigate their Gmail inbox with an extra layer of security against fraudulent messages.

🚀 Features
- Contextual Gmail Analysis: Seamlessly integrates into the Gmail interface to scan message content.
- Node.js Backend: Uses a high-performance JavaScript backend for pattern matching and logic processing.
- Instant Feedback: Provides non-blocking, fast analysis to keep the user experience smooth.

Programs and Tech Stack:
- Browser Integration: Chrome Extension API (Manifest v3)
- Backend: Node.js
- Frontend: HTML5, CSS, JavaScript
- Package Management: npm

⚙️ Installation & Setup:
A. Load the Extension
1. Download the latest release folder: ScamFree2.0.
2. Open Google Chrome and navigate to chrome://extensions/.
3. Turn on Developer mode (top right corner) and Click the Load unpacked button.
4. Select the chrome extension folder located inside your downloaded release.

B. Start the Backend Server:
5. Open the project folder in VS Code.
6. Open the terminal (Ctrl + ` ).

C. Download the dependencies (if not previously installed before)
- npm install
  
Start the server:
- node server.js
  
D. Ready to Go
Refresh your Chrome extensions or reload your Gmail tab.

The extension is now connected to your local Node.js server and ready to scan for scams!


Port in Use: If you get an error saying the port is busy, ensure you aren't running another instance of the server.

Permissions: Ensure your Chrome Extension has permission to access http://localhost:[YOUR_PORT] in the manifest.json file.
