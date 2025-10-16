# 🚀 Arjun Rawat - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23.12-FF006E?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> **Modern, responsive portfolio website showcasing Data Analysis, AI/ML Engineering, and Software Development expertise**

## 🌟 Live Demo

🔗 **[View Live Portfolio](https://your-portfolio-url.vercel.app)** *(Deploy to get your live URL)*

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📧 Contact Form Setup](#-contact-form-setup)
- [🎨 Customization](#-customization)
- [📱 Screenshots](#-screenshots)
- [🔧 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎯 **Core Features**
- ✅ **Modern Sidebar Navigation** - Smooth, responsive sidebar with space-themed animations
- ✅ **Dark/Light Theme Toggle** - Seamless theme switching with system preference detection
- ✅ **Fully Functional Contact Form** - Real-time validation, email integration, and user feedback
- ✅ **Responsive Design** - Mobile-first approach with perfect display on all devices
- ✅ **Space Theme Animations** - Beautiful animated background with shooting stars
- ✅ **Professional Sections** - Home, About, Experience, Projects, and Contact pages

### 🛡️ **Advanced Protection System**
- ✅ **Browser Extension Shield** - Comprehensive protection against extension interference
- ✅ **Hydration Error Prevention** - Advanced error boundaries and client-side protection
- ✅ **XSS Protection** - Input sanitization and security headers
- ✅ **Error Recovery** - Graceful fallbacks and error handling

### 📧 **Contact Form Features**
- ✅ **Real-time Validation** - Instant feedback on form inputs
- ✅ **Email Integration** - Professional email templates with Resend API
- ✅ **Loading States** - Beautiful loading animations during form submission
- ✅ **Success/Error Feedback** - Clear user feedback with animated icons
- ✅ **Spam Protection** - Input sanitization and rate limiting ready

### 🎨 **UI/UX Excellence**
- ✅ **Framer Motion Animations** - Smooth, professional animations throughout
- ✅ **Gradient Designs** - Modern gradient backgrounds and effects
- ✅ **Glassmorphism** - Beautiful glass-like UI components
- ✅ **Typography** - Optimized fonts and reading experience
- ✅ **Accessibility** - WCAG compliant design patterns

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15.5.2](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 3.4.14](https://tailwindcss.com/)** - Utility-first styling
- **[Framer Motion 12.23.12](https://www.framer.com/motion/)** - Advanced animations

### **Backend & APIs**
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[Resend API](https://resend.com/)** - Professional email delivery
- **Custom Hooks** - Reusable logic and state management

### **Development & Deployment**
- **[Vercel](https://vercel.com/)** - Deployment and hosting
- **[Git](https://git-scm.com/)** - Version control
- **[ESLint](https://eslint.org/)** - Code linting and formatting

### **Additional Features**
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Vercel Analytics](https://vercel.com/analytics)** - Performance tracking

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/ARJUNRAWAT-DEL/portfolio-.git
cd portfolio-
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

To enable email functionality for the contact form:

### **Step 1: Get Resend API Key**
1. Sign up at [resend.com](https://resend.com) (FREE tier available)
2. Create an API key from your dashboard
3. Copy the API key

### **Step 2: Configure Environment Variables**
Add to your `.env.local` file:
```bash
# Resend API Key for email functionality
RESEND_API_KEY=re_your_actual_api_key_here

# Your email to receive contact form submissions
CONTACT_EMAIL=your-email@gmail.com
```

### **Step 3: Test the Contact Form**
1. Start your development server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your email for the notification!

> 📖 **Detailed setup guide:** See `CONTACT_FORM_README.md` for complete instructions

## 🎨 Customization

### **Personal Information**
Update your personal details in:
- `app/page.tsx` - Hero section content
- `app/about/page.tsx` - About information
- `app/experience/page.tsx` - Work experience
- `app/projects/page.tsx` - Your projects
- `app/contact/page.tsx` - Contact information

### **Styling**
- **Colors:** Modify `tailwind.config.js` for custom color schemes
- **Animations:** Update Framer Motion variants in components
- **Typography:** Change fonts in `app/layout.tsx`

### **Content**
- Replace placeholder content with your information
- Add your actual projects and experience
- Update social media links in `components/Sidebar.tsx`

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Resend API key for email functionality | No | - |
| `CONTACT_EMAIL` | Email to receive contact form submissions | No | - |

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure project settings

2. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your `RESEND_API_KEY` and `CONTACT_EMAIL`

3. **Deploy**
   - Vercel will automatically deploy from your main branch
   - Your portfolio will be live in minutes!

### **Other Deployment Options**
- **Netlify:** Full support for Next.js
- **Railway:** Easy deployment with database options
- **Docker:** Containerized deployment ready

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - Amazing React framework
- **[Vercel](https://vercel.com/)** - Excellent hosting platform
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Powerful animation library

---

<div align="center">

### 🌟 **Built with ❤️ by [Arjun Rawat](https://github.com/ARJUNRAWAT-DEL)**

**Data Analyst | AI/ML Engineer | Software Developer**

[![GitHub](https://img.shields.io/badge/GitHub-ARJUNRAWAT--DEL-black?style=flat&logo=github)](https://github.com/ARJUNRAWAT-DEL)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-rwtarjun-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/rwtarjun/)
[![Email](https://img.shields.io/badge/Email-arjunrawat4741%40gmail.com-red?style=flat&logo=gmail)](mailto:arjunrawat4741@gmail.com)

**⭐ Star this repository if you found it helpful!**

</div>
