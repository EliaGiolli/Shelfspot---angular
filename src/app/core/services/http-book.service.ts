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
    searchBooks(query: string): Observable<ApiBookData[]> {
        return this.http.get<{ docs: ApiBookData[] }>(`${this.API_URL}?q=${encodeURIComponent(query)}`)
            .pipe(
                // OpenLibrary returns an object with an array 'docs'
                map(response => response.docs)
            );
    }

    searchBookById(id:string, query:string) {}
}