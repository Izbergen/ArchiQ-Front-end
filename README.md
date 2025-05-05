# ArchiQ

## Main Libraries

- React & React DOM
- TypeScript
- Chakra UI
- React Router DOM
- Axios
- React Icons
- Sonner (Toast Notifications)
- React Hook Form (forms and validation)
- Zod (schema validation)

## Project Structure (simplified)

```
├── public/               # Static assets and index.html
├── src/
│   ├── pages/            # Route-based page components
│   │   ├── main/         # Main application routes
│   │   ├── auth/         # Authentication flow pages
│   │   ├── apartments/   # Apartment listing & cards
│   │   ├── boxrooms/     # Boxroom listing & cards
│   │   ├── parking/      # Parking listing & cards
│   │   ├── commerce/     # Commerce listing & cards
│   │   └── user/         # User dashboard and profile pages
│   ├── general/          # Shared components, hooks, and types
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   └── types/        # TypeScript type definitions
│   ├── app.tsx           # Root app component (routes setup)
│   └── main.tsx          # Entry point (ReactDOM.render)
├── package.json          # Project metadata & dependencies
└── README.md             # Project overview and setup instructions
```
## Installation Instructions
1. Clone the repository
   ```bash
   git clone https://github.com/Izbergen/ArchiQ-Front-end.git
   ```
2. Navigate into the project directory
   ```bash
   cd archiq-frontend
   ```
3. Install dependencies
   ```bash
   yarn install
   # or yarn install
   ```
4. Set up environment variables
   - Create a `.env` file at the project root
   - Add the API URL:
     ```ini
     REACT_APP_API_URL=https://api.slyamgazy.kz/
     ```
5. Start the development server
   ```bash
   npm start
   # or yarn start
   ```

## Usage Guide
- Open your browser at `http://localhost:3000`
- Browse categories via the top navigation (All, Apartments, Parking, Boxrooms, Commerce)
- Use the sidebar filters (complex, rooms, price, area, floor) to refine results
- Click a property card to view details or submit a request
- Log in via the user icon in the header to access your profile, view owned properties, and track application statuses

## Testing
- Run unit and integration tests
  ```bash
  yarn dev
  ```
- (Optional) Add additional coverage or CI steps as needed

## Known Issues / Limitations
- Mobile responsive support is in progress
- Error handling for edge API cases may need further refinement

## References
- Chakra UI: https://chakra-ui.com
- React Router: https://reactrouter.com
- Axios: https://axios-http.com
- Django REST Framework: https://www.django-rest-framework.org/

## Team Members

| Name                  | Student ID  | Lecture Group | Practice Group | Role                                          |
|-----------------------|-------------|---------------|----------------|-----------------------------------------------|
| Adilzhan Slyamgazy    | 220103151   | 04-N          | 16-P           | Backend, AI-agent development, Database setup |
| Dauletkhan Izbergenov | 220103015   | 04-N          | 15-P           | Frontend                                      |
| Alikhan Toleberdyyev  | 220103050   | 04-N          | 16-P           | Frontend                                      |
| Bakdaulet Bekkhoja    | 220103014   | 04-N          | 15-P           | DevOps                                        |
| Aknur Bauyrzhankyzy   | 220103314   | 04-N          | 16-P           | PM, Manual testing, Design-scratching         |
