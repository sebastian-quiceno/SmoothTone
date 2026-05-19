export type User = {
    id: number;
    username: string;
    uploadedSongs: number;
}

export type AuthResponseDTO = {
    token: string
    userId: number;
    userName: string;
    uploadedSongs: number;
}

export type AuthContextType = {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    login: (user: User, token: string) => void;
    logout: () => void;
}