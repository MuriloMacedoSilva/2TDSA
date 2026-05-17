// types.ts
import { DrawerScreenProps } from '@react-navigation/drawer';

// Define quais telas existem no menu lateral e seus parâmetros
export type RootDrawerParamList = {
  Home: undefined;
  Configuracoes: undefined;
  Perfil: { usuarioId: string } | undefined; // Parâmetro opcional
};

// Atalhos para tipar as props de cada tela
export type HomeDrawerProps = DrawerScreenProps<RootDrawerParamList, 'Home'>;
export type ConfigDrawerProps = DrawerScreenProps<RootDrawerParamList, 'Configuracoes'>;