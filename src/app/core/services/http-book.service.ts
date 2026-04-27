import { 
    Injectable, 
    inject,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { type ApiBookData } from "../../shared/types/api-book-data";
import { type BookApiData,  OpenLibraryResponseSchema} from "../schemas/book-api.schema";

@Injectable({ providedIn: 'root' })
export class HttpBookService {
    private http = inject(HttpClient);
    private readonly API_URL = 'https://openlibrary.org/search.json';

    // definition of the method that will be called by the component(s)
    searchBooks(query: string, page: number = 1): Observable<BookApiData[]> {
        const params = `?q=${encodeURIComponent(query)}&page=${page}`;
        
        return this.http.get<unknown>(`${this.API_URL}${params}`).pipe(
            map(rawResponse => {
            const result = OpenLibraryResponseSchema.safeParse(rawResponse);
            
            if (!result.success) {
                console.error('Schema validation failed:', result.error.format());
                return []; 
            }
            
            return result.data.docs;
            }),
            map(books => books.slice(0, 12))
        );
    }

    searchBookById(id:string):Observable<ApiBookData | null> {
        return this.http.get<ApiBookData>(`https://openlibrary.org/works/${id}.json`);
    }

    //It returns only the first result
    getFirstBookByQuery(query: string): Observable<BookApiData | null> {
        return this.searchBooks(query)
            .pipe(
                map(books => books.length > 0 ? books[0] : null)
            );
    }
}