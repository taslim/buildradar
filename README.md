# BuildRadar

BuildRadar is a curated discovery platform showcasing innovative African startups and businesses. By analyzing social media conversations, we identify and categorize emerging companies across various industries, creating a comprehensive directory of the African startup ecosystem.

## 🚀 What is BuildRadar?

BuildRadar processes Twitter data to discover and showcase African businesses and startups. The platform automatically:

- **Discovers** companies mentioned in entrepreneurship conversations
- **Categorizes** businesses across 13+ industry verticals
- **Curates** company profiles with descriptions and links
- **Provides** an intuitive search and discovery interface

## 🎯 Features

- **Smart Search**: Find companies by name, description, or industry
- **Category Navigation**: Browse businesses by sector (FinTech, EdTech, HealthTech, etc.)
- **Company Profiles**: Detailed information including descriptions, websites, and social links
- **Feeling Lucky**: Discover random companies for serendipitous exploration
- **Responsive Design**: Optimized for desktop and mobile experiences

## 🏢 Industry Categories

- **FinTech** - Financial technology and payments
- **EdTech** - Education and learning platforms  
- **HealthTech/MedTech** - Healthcare and medical technology
- **AgriTech/Food** - Agriculture and food technology
- **Creative/Design** - Creative agencies and design services
- **E-commerce/Marketplace** - Online retail and marketplaces
- **Real Estate/PropTech** - Property and real estate technology
- **Blockchain/Web3** - Cryptocurrency and decentralized technologies
- **Technology/Software** - Software development and SaaS
- **Energy/CleanTech** - Clean energy and sustainability
- **Transportation/Logistics** - Mobility and logistics solutions
- **Social/Community** - Social platforms and community tools
- **Marketing/AdTech** - Marketing and advertising technology

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Data Processing**: Custom Twitter data analysis pipeline
- **Deployment**: Optimized for Vercel

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/buildradar.git
cd buildradar

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Data Processing

BuildRadar includes a sophisticated data processing pipeline that:

1. **Ingests** Twitter conversation data about African startups
2. **Extracts** company mentions, URLs, and descriptions
3. **Categorizes** companies using keyword analysis
4. **Deduplicates** entries to maintain data quality
5. **Generates** clean, structured company profiles

The processing pipeline can be found in `lib/data/processTwitterData.ts`.

## 🎨 Project Structure

```
buildradar/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/ui/       # Reusable UI components
│   └── lib/                 # Utilities and data processing
├── lib/
│   ├── categorization/      # Industry categorization logic
│   └── data/               # Data processing pipeline
├── types/                   # TypeScript type definitions
├── data/                    # Processed company data
└── public/                  # Static assets
```

## 🤝 Contributing

We welcome contributions to BuildRadar! Whether you're:

- Adding new companies to the database
- Improving categorization logic
- Enhancing the user interface
- Fixing bugs or adding features

Please feel free to submit issues and pull requests.

## 📈 Company Data

Currently showcasing **115+ African companies** across **12+ industry categories**, with data sourced from entrepreneurship conversations and startup communities.

## 📝 Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm typecheck        # Type checking
pnpm format:check     # Check code formatting
pnpm format:write     # Format code

# Testing
pnpm test             # Run tests
```

## 🚀 Deployment

BuildRadar is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

For other platforms, run `pnpm build` to generate the production build.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for the African startup ecosystem
