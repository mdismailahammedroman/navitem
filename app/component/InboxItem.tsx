import { EnlistmentRequest } from "../types";

interface Props {
  request: EnlistmentRequest;
}

export default function InboxItem({ request }: Props) {
  return (
    <div className="border rounded-md p-4 mb-3 hover:bg-gray-50 transition">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{request.buyerName}</h3>
        <span className="text-gray-400 text-sm">{request.receivedAt}</span>
      </div>
      <p className="mt-2 text-gray-600">{request.message}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
        View Request
      </button>
    </div>
  );
}
