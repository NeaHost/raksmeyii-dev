import { supabase } from "./supabaseClient";

export class SupabaseImage {
    private static _path = 'products/';
    private static _bucket = 'images/';

    static getImageUrl(path: string): string {
        let img = supabase.storage.from(`${this._bucket}${this._path}`).getPublicUrl(path).data.publicUrl;

        return img;
    }
}
