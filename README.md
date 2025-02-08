# 📽️ MediaLab – AI-Powered Video & Image Processing  

MediaLab is a **Next.js** application that leverages **Cloudinary AI** to **compress videos, generate video previews, and manipulate images for social media** while keeping the subject in focus. It also features **Clerk authentication** and a beautiful **DaisyUI-powered UI**.  

---

## 🚀 Getting Started  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/your-username/MediaLab.git
cd MediaLab
npm install
yarn install
# Clerk Authentication  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=  
CLERK_SECRET_KEY=  

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in  
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up  

# Cloudinary Credentials  
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=  
CLOUDINARY_CLOUD_NAME=  
CLOUDINARY_API_KEY=  
CLOUDINARY_API_SECRET=  
CLOUDINARY_ENVIRONMENT_VARIABLE=  
CLOUDINARY_WEBHOOK_SECRET=  

# Database  
DATABASE_URL=

npm run dev
yarn dev

npm run build
npm start


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
