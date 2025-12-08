# Vehicle Rental System

A backend API for a vehicle rental management system that handles:

- **Vehicles** - Manage vehicle inventory with availability tracking
- **Customers** - Manage customer accounts and profiles
- **Bookings** - Handle vehicle rentals, returns and cost calculation
- **Authentication** - Secure role-based access control (Admin and Customer roles)

built with Node.js and TypeScript. This system provides user authentication, vehicle inventory management, and booking functionality with automated price calculation and status updates.

**[Live Demo - https://vehicle-rental-system-green.vercel.app/](https://vehicle-rental-system-green.vercel.app/)**

## Features

- **User Management**: User registration and login with JWT authentication
- **Vehicle Management**: CRUD operations for vehicle inventory (admin-only for create/update/delete)
- **Booking System**: Create bookings with automatic price calculation and vehicle availability updates
- **Role-Based Access Control**: Support for admin and customer roles with restricted endpoints
- **Automated Updates**: Automatic handling of expired bookings and status synchronization
- **Secure Authentication**: Password hashing with bcryptjs and JWT token-based authorization

## Technology Stack

- **Backend**: Node.js, TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT), bcryptjs for password hashing
- **Development Tools**: tsx for running TypeScript

## Setup & Usage Instructions

### Prerequisites

- Node.js
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/md-zeon/vehicle-rental-system.git
   cd vehicle-rental-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```text
   DB_CONNECTION_STRING=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Set up the database:
   - Create a PostgreSQL database
   - The application will automatically create required tables on startup

### Running the Application

For development:

```bash
npm run dev
```

This starts the server with hot reloading using tsx.

For production:

```bash
npm run build
npm start
```

The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

### API Endpoints

#### Authentication

- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/signin` - Login and receive JWT token

#### Vehicles

- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:vehicleId` - Get vehicle by ID
- `POST /api/v1/vehicles` - Add new vehicle (admin only)
- `PUT /api/v1/vehicles/:vehicleId` - Update vehicle (admin only)
- `DELETE /api/v1/vehicles/:vehicleId` - Delete vehicle (admin only)

#### Bookings

- `GET /api/v1/bookings` - Get bookings (admin sees all, customer sees own)
- `POST /api/v1/bookings` - Create new booking
- `PUT /api/v1/bookings/:bookingId` - Update booking status
