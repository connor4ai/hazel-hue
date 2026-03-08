# Hazel & Hue - AI-Powered Personal Color Analysis Platform

An advanced AI-powered color analysis platform that provides intelligent, personalized color profiling using a sophisticated 12-season color system. Delivers precise, data-driven personal styling insights through cutting-edge computer vision and machine learning technologies.

## 🌈 Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4o Vision to analyze user photos and determine seasonal color types
- **12-Season Color System**: Complete implementation of True/Bright/Dark Winter/Summer/Spring/Autumn seasons
- **Professional Reports**: Generates comprehensive PDF reports with personalized recommendations
- **Payment Integration**: Stripe-powered checkout with promo code support
- **Email Delivery**: Automated result delivery via SendGrid
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Complete SEO implementation with structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Required API keys (see Environment Variables section)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hazel-hue.git
cd hazel-hue
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see `.env.example`)

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** + **shadcn/ui** for styling
- **Wouter** for client-side routing
- **TanStack React Query** for data fetching
- **Framer Motion** for animations
- **Vite** for build tooling

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with **Drizzle ORM**
- **OpenAI API** for color analysis
- **Stripe** for payment processing
- **SendGrid** for email delivery
- **Multer** for file uploads

### Database Schema
- Users, Orders, Promo Codes, User Sessions
- Complete order tracking and payment management
- Session-based authentication system

## 🎨 12-Season Color Analysis System

The platform implements a comprehensive color analysis system covering:

**Winter Seasons**: True Winter, Bright Winter, Dark Winter
**Summer Seasons**: True Summer, Light Summer, Soft Summer  
**Spring Seasons**: True Spring, Bright Spring, Light Spring
**Autumn Seasons**: True Autumn, Dark Autumn, Soft Autumn

Each season includes:
- 64-color palette with hex codes
- Detailed makeup recommendations
- Style guidance and celebrity examples
- Pinterest boards and shopping links
- Colors to avoid

## 📝 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=your_postgresql_url

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Email
SENDGRID_API_KEY=your_sendgrid_api_key

# Application
NODE_ENV=development
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Database Migration
```bash
npm run db:push
```

### Start Production Server
```bash
npm start
```

## 📱 Mobile App

The project includes a React Native companion app in the `mobile/` directory:

```bash
cd mobile
npm install
npx expo start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@hazelandhue.com or create an issue in this repository.

## 🙏 Acknowledgments

- OpenAI for GPT-4o Vision API
- Stripe for payment processing
- All the open-source libraries that made this project possible

---

Built with ❤️ for fashion and technology enthusiasts worldwide.