# AHAD Softtech — Project Structure

```text
ahad-softtech/
├── frontend/                 # Public website
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       └── assets/
├── cms/                      # Strapi 5 CMS/API
│   ├── config/
│   ├── database/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── extensions/
│       ├── middlewares/
│       └── policies/
├── docs/                     # Requirements and architecture
├── scripts/                  # Development/deployment utilities
├── .env.example
└── .gitignore
```

The structure follows the approved CMS architecture and keeps the corporate website separate from employee operational systems.
