import { type BookDetail } from "../../core/schemas/book-api.schema";

export interface Loan {
    id: string;
    book: BookDetail;
    loanDate: Date;
    dueDate: Date;
  }