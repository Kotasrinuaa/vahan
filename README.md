# Vahan - Vehicle Registration Analytics Dashboard

A modern, interactive dashboard for analyzing vehicle registration data across India. Built with Next.js 13, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Interactive Dashboard**: Real-time analytics with dynamic charts and visualizations
- **Advanced Filtering**: Filter data by year, month, state, fuel type, and vehicle class
- **Multiple Chart Types**: Area charts, bar charts, donut charts, line charts, and ring charts
- **Responsive Design**: Fully responsive UI that works on all devices
- **Real-time Insights**: Automated generation of key insights and statistics
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🚀 Live Demo

**🌐 Production URL**: https://vahan-mu.vercel.app

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **State Management**: Zustand
- **Data Processing**: CSV parsing with csv-parse
- **Deployment**: Vercel

## 📊 Data Source

The dashboard analyzes vehicle registration data from the Vahan database, including:
- Vehicle registrations by state
- Fuel type distribution
- Vehicle class analysis
- Temporal trends and patterns

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kotasrinuaa/vahan.git
cd vahan
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
vahan/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── charts/           # Chart components
│   ├── ui/               # shadcn/ui components
│   ├── Dashboard.tsx     # Main dashboard component
│   ├── SidebarFilters.tsx # Filter sidebar
│   └── StatCard.tsx      # Statistics cards
├── store/                # State management
│   └── dashboardState.ts # Zustand store
├── utils/                # Utility functions
│   └── vahanUtils.ts     # Data processing utilities
└── public/               # Static assets
    └── data/             # CSV data files
```

## 🎯 Key Features

### Dashboard Analytics
- Total vehicle registrations
- Top fuel types by popularity
- Most popular vehicle classes
- Leading states in registrations

### Interactive Filters
- Year and month selection
- State-wise filtering
- Fuel type filtering
- Vehicle class filtering

### Data Visualizations
- Time series analysis
- Fuel trend comparisons
- State-wise vehicle distribution
- Electric vs non-electric vehicle analysis

## 🔧 Configuration

The project uses several configuration files:
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration

## 🚀 Deployment

This project is deployed on Vercel and is publicly accessible at:
**https://vahan-mu.vercel.app**

### Deployment Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic deployment on every push to main branch

## 📈 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Loading Speed**: Fast initial page load with static generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Kota Srinuaa**
- GitHub: [@Kotasrinuaa](https://github.com/Kotasrinuaa)
- Email: kotasrinuaa@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the chart library
- [Vercel](https://vercel.com/) for the hosting platform 