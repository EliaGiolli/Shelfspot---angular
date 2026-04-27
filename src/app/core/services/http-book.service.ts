import { 
    Injectable, 
    inject,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiBookData } from "../../shared/types/api-book-data";

@Injectable({ providedIn: 'root' })
export class HttpBookService {
    private http = inject(HttpClient);
    private readonly API_URL = 'https://openlibrary.org/search.json';

    // definition of the method that will be called by the component(s)
    searchBooks(query: string, page: number = 1): Observable<ApiBookData[]> {
        // The OpenLibrary API has a "page" param
        const params = `?q=${encodeURIComponent(query)}&page=${page}&limit=12`;
        return this.http.get<{ docs: ApiBookData[] }>(`${this.API_URL}${params}`)
            .pipe(map(response => response.docs ? response.docs.slice(0, 12) : []));
    }

    searchBookById(id:string):Observable<ApiBookData | null> {
        return this.http.get<ApiBookData>(`https://openlibrary.org/works/${id}.json`);
    }

    //It returns only the first result
    getFirstBookByQuery(query: string): Observable<ApiBookData | null> {
        return this.searchBooks(query)
            .pipe(
                map(books => books.length > 0 ? books[0] : null)
            );
    }
}