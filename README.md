# Expense - Smart Expense Management System

A comprehensive expense management system built with Next.js, featuring intelligent approval workflows, OCR receipt scanning, and multi-currency support.

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication**: Admin, Manager, and Employee roles with different permissions
- **Expense Submission**: Create expense claims with receipt upload and OCR scanning
- **Approval Workflows**: Multi-level approval system with configurable rules
- **Currency Support**: Multi-currency expenses with real-time conversion
- **OCR Integration**: Automatic receipt scanning and data extraction
- **Analytics & Reporting**: Comprehensive dashboards and expense insights

### User Roles & Permissions

#### Admin
- Create and manage companies
- Manage users and assign roles
- Configure approval rules and flows
- View all expenses and override approvals
- Access comprehensive reports

#### Manager
- Approve/reject expenses from team members
- View team expense reports
- Escalate expenses as per rules
- Submit their own expenses

#### Employee
- Submit expense claims
- View personal expense history
- Check approval status
- Upload receipts with OCR scanning

### Approval System

#### Multi-Level Approvals
- Configurable approval steps (Manager → Finance → Director)
- Sequential approval process
- Escalation rules

#### Conditional Approval Rules
- **Percentage Rule**: e.g., 60% of approvers must approve
- **Specific Approver Rule**: e.g., CFO approval required
- **Hybrid Rule**: Combine percentage and specific approver rules

### OCR Receipt Scanning
- Upload receipt images or PDFs
- Automatic data extraction (amount, date, merchant, category)
- Manual review and correction of extracted data
- Support for multiple receipt formats

### Multi-Currency Support
- Real-time currency conversion using external APIs
- Support for 160+ currencies
- Automatic conversion to company's base currency
- Country-based currency selection

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Charts**: Recharts
- **Notifications**: React Hot Toast

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd expense
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials
- **Email**: admin@company.com
- **Password**: password

## 📱 Pages & Features

### Dashboard
- Overview of expense statistics
- Recent expense claims
- Quick action buttons
- Role-based navigation

### Expense Management
- **Submit New Expense**: Create expense claims with OCR scanning
- **View Expenses**: Filter and search through expense history
- **Expense Details**: Detailed view with approval history

### Approval System
- **Pending Approvals**: Review and approve/reject expenses
- **Approval Rules**: Configure percentage and specific approver rules
- **Approval Flows**: Set up multi-level approval processes

### User Management (Admin)
- Create and manage users
- Assign roles and managers
- Set approval permissions
- View user activity

### Reports & Analytics
- Monthly expense trends
- Category-wise breakdown
- Top employees by expense amount
- Approval statistics
- Cost savings analysis

### Settings
- Company configuration
- Currency and timezone settings
- Approval rule management
- Approval flow configuration

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project
```

### External APIs
- **Countries & Currencies**: https://restcountries.com/v3.1/all
- **Currency Conversion**: https://api.exchangerate-api.com/v4/latest/

## 📊 Key Components

### Layout Components
- `Layout`: Main application layout with sidebar and header
- `Sidebar`: Role-based navigation menu
- `Header`: Top navigation with user info and notifications

### Feature Components
- `ReceiptScanner`: OCR receipt scanning modal
- `ExpenseForm`: Expense submission form with validation
- `ApprovalModal`: Expense approval/rejection interface
- `UserManagement`: User creation and management interface

### Context Providers
- `AuthContext`: Authentication and user state management

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (600, 700)
- **Success**: Green (500, 600)
- **Warning**: Yellow (500, 600)
- **Error**: Red (500, 600)
- **Neutral**: Gray (50-900)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-700
- **Body**: Font weight 400-500

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (rounded-md, rounded-lg)
- Subtle shadows for depth
- Hover states for interactive elements

## 🔒 Security Features

- Role-based access control
- Form validation and sanitization
- Secure file upload handling
- Protected routes and API endpoints

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interface
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- Railway
- Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Mobile app (React Native)
- Advanced OCR with machine learning
- Integration with accounting software
- Automated expense categorization
- Advanced reporting and analytics
- Multi-language support
- API for third-party integrations

---

Built with ❤️ using Next.js and modern web technologies.