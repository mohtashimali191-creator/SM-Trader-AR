# Deploying the SM Trader AR Platform

Follow these steps to deploy this solution as a mobile-friendly web app in Pakistan.

## 1. Setup Firebase (Backend & Storage)
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named **SM Trader AR**.
2. Enable **Firestore Database** and **Cloud Storage**.
3. In Cloud Storage rules, ensure public read access is allowed for your 3D models:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // Anyone can read the 3D models and images
      allow read: if true;
      // Only Admins can upload via the backend
      allow write: if request.auth != null; 
    }
  }
}
```
4. **CORS Configuration**: This is critical. You must setup CORS for Firebase Storage so `<model-viewer>` can load models across your website domains without security errors. Create a `cors.json` file on your PC:
```json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
```
Run `gsutil cors set cors.json gs://YOUR_PROJECT_ID.appspot.com` using the Google Cloud CLI.

## 2. Frontend Deployment (Vercel)
Vercel acts as a global CDN, meaning users in Pakistan will get fast load times.
1. Initialize your React.js (or Next.js) app and push it to a GitHub repository.
2. Go to [Vercel.com](https://vercel.com/) and import your repository.
3. Add your Firebase API keys to Vercel's Environment Variables.
4. Click **Deploy**. Vercel will build your React application and provide a live URL.

## 3. Operations & Usage
- **For Edibles (Restaurants)**: 
  Each dish gets a unique URL (e.g., `smtrader.com/ar/dish/chicken-karahi`). Generate QR codes for these URLs. Print and place these on restaurant tables. When customers scan them with their phone camera, Chrome/Safari opens, and they instantly see the 3D model of the food on their table via WebAR.
- **For Wearables (Apparel)**:
  Link your e-commerce product pages to open the UniversalARViewer component.
