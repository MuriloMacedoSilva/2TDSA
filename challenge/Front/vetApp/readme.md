dependencias até agora, e o que cada uma faz : 

vetApp/
 ├── assets/                # imagens, fontes (logo, ícones)
 │
 ├── src/
 │    ├── app/              # CORE do app
 │    │    ├── navigation/
 │    │    │    ├── index.tsx
 │    │    │    ├── auth.routes.tsx
 │    │    │    ├── patient.routes.tsx
 │    │    │    └── vet.routes.tsx
 │    │    │
 │    │    └── App.tsx
 │    │
 │    ├── features/         # DOMÍNIO DO APP (principal)
 │    │
 │    │    ├── auth/
 │    │    │    ├── screens/
 │    │    │    │    ├── SplashScreen.tsx
 │    │    │    │    ├── RoleSelectScreen.tsx
 │    │    │    │    ├── LoginScreen.tsx
 │    │    │    │    └── RegisterScreen.tsx
 │    │    │    │
 │    │    │    ├── context/
 │    │    │    │    └── AuthContext.tsx
 │    │    │    │
 │    │    │    ├── services/
 │    │    │    │    └── authService.ts
 │    │    │    │
 │    │    │    ├── hooks/
 │    │    │    │    └── useAuth.ts (opcional, já está no context)
 │    │    │    │
 │    │    │    └── types.ts
 │    │    │
 │    │    ├── user/
 │    │    ├── pet/
 │    │    ├── medical-record/
 │    │    ├── reminder/
 │    │    └── chat/
 │    │
 │    ├── components/       # UI reutilizável global
 │    │    ├── Button/
 │    │    ├── Input/
 │    │    └── Card/
 │    │
 │    ├── services/         # API global
 │    │    └── api.ts
 │    │
 │    ├── theme/            # design system
 │    │    ├── colors.ts
 │    │    ├── spacing.ts
 │    │    └── typography.ts
 │    │
 │    ├── hooks/            # hooks globais
 │    └── utils/            # helpers
 │
 ├── App.tsx                # (pode ficar ou só redirecionar)
 ├── index.ts               # entry point
 ├── package.json
 └── tsconfig.json