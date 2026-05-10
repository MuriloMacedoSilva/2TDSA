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



 apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

 cd ios && pod install && cd ..



 A instalação depende de como o seu projeto foi criado. Se você está usando o **Expo**, é um passeio no parque. Se for **React Native CLI** (puro), exige um pouquinho mais de atenção com as pastas nativas.

Aqui estão os caminhos:

---

### 1. Se você usa Expo (O mais fácil)

O Expo já traz a biblioteca por padrão, mas caso precise reinstalar ou garantir que as dependências de fontes estejam lá:

```bash
npx expo install @expo/vector-icons

```

*Não precisa de configuração extra. É instalar e usar.*

---

### 2. Se você usa React Native CLI

Aqui o processo tem dois passos: instalar o pacote e depois "avisar" ao Android e ao iOS sobre as fontes.

#### Passo A: Instalação do pacote

```bash
npm install --save react-native-vector-icons
# ou
yarn add react-native-vector-icons

```

#### Passo B: Configuração Nativa (Crucial)

**Para Android:**
Edite o arquivo `android/app/build.gradle` (não o da raiz, o que está dentro da pasta `app`) e adicione ao final do arquivo:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```

**Para iOS:**

1. No terminal, dentro da pasta do projeto, execute:
```bash
cd ios && pod install && cd ..

```


2. Você precisará adicionar manualmente as fontes no seu arquivo `Info.plist`. É mais fácil fazer isso pelo Xcode arrastando as fontes ou editando o XML do arquivo, mas a maioria dos desenvolvedores prefere usar bibliotecas de "autolink" ou seguir o guia oficial para copiar os arquivos `.ttf`.

---

### Dica de ouro: Erro de "Ícone com [?]"

Se após instalar você ver um **quadrado com uma interrogação** no lugar do ícone, geralmente significa:

1. Você esqueceu de rodar o `pod install` (iOS).
2. Você não adicionou a linha no `build.gradle` (Android).
3. **O mais comum:** Você precisa recompilar o app completamente. Pare o terminal e rode `npx react-native run-android` ou `run-ios` novamente.

Qual desses caminhos você está seguindo (CLI ou Expo)? Se for CLI e tiver erro no iOS, posso te passar a lista de fontes para o `Info.plist`.

```

```