# TourNest

TourNest is a modern Tourism Management System designed to simplify travel planning and provide a seamless user experience for tourists, tour guides, and admins. This comprehensive platform caters to various roles and ensures a smooth booking, management, and travel experience.

## Admin Credentials
- **Email:** [admin@gmail.com]
- **Password:** [Admin@]

## Live Site Links
- **Frontend (Surge):** [https://tour-nest.surge.sh/](https://tour-nest.surge.sh/)
- **Frontend (Firebase):** [https://tour-nest-a8f37.web.app/](https://tour-nest-a8f37.web.app/)

## Key Features

1. **User Roles**
   - Tourist: Browse and book travel packages, share stories, and manage profiles.
   - Tour Guide: Manage assigned tours, add stories, and handle booking statuses.
   - Admin: Oversee users, applications, payments, and manage packages.

2. **Responsive Design**
   - Fully optimized for mobile, tablet, and desktop devices, including dashboards for all user roles.

3. **Authentication & Security**
   - User registration and login using email/password or Google.
   - Secure JWT-based authentication.
   - Forgot Password feature and token-based private routes.

4. **Dynamic Content**
   - Randomized packages, tour guides, and stories displayed using MongoDB's `$sample` operator.

5. **Interactive Home Page**
   - Dynamic tabs for "Our Packages" and "Meet Our Tour Guides."
   - Animated sections using Framer Motion.
   - Story sharing with Facebook integration.

6. **Dashboard Features**
   - Tourists: Manage bookings, stories, profiles, and apply to become a guide.
   - Guides: Handle assigned tours and manage stories.
   - Admins: Add packages, manage users, and review applications.

7. **Tour Package Details**
   - Gallery section for tour images.
   - Detailed tour plan and guide profiles.
   - Protected booking form with a confirmation modal.

8. **Community Page**
   - Display all user-added stories with sharing capabilities.

9. **Payment Integration**
   - Stripe payment system for secure and seamless transactions.
   - Discount system for frequent users with animations (React Confetti).

10. **Notifications & Alerts**
    - SweetAlert2 for CRUD operations and authentication events.

## Challenges Addressed
- JWT authentication and token-based private routes.
- Dynamic pagination for user-friendly data management.
- Environment variables for secure Firebase and MongoDB credentials.

## Dependencies
Key libraries and tools used:
- **React** (18.3.1): Frontend framework.
- **Framer Motion**: Smooth animations.
- **Firebase**: Authentication and hosting.
- **Stripe**: Payment gateway.
- **SweetAlert2**: Custom alerts.
- **React Tabs**: Tab-based layouts.
- **React Share**: Social media sharing.
- **React Confetti**: Animated discount reveals.
- **TanStack Query**: Data fetching and caching.
- **React Spring**: Additional animations.

## Repository Links
- **Client Side:** [[GitHub Repository Link](https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-mdtanbirhosen)]
- **Server Side:** [[GitHub Repository Link](https://github.com/Programming-Hero-Web-Course4/b10a12-server-side-mdtanbirhosen)]

## Installation Guide
To run the project locally:
1. Clone the repositories.
2. Install dependencies using `npm install`.
3. Set up environment variables for Firebase and MongoDB credentials.
4. Run the client and server using `npm start`.

---
TourNest is your one-stop platform for exploring and managing tourism in Bangladesh. Happy traveling!

