/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_KEY: string;
    // Add more variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
