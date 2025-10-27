export interface EnlistmentRequest {
  id: number;
  buyerName: string;
  message: string;
  receivedAt: string;
}

export interface TableRow {
  date: string;
  company: string;
  category: string;
  country: string;
  profile: string;
  status: string;
  pending: number;
  canceled: number;
  reviewPending: number;
}
