import InboxItem from "./InboxItem";
import { EnlistmentRequest } from "../types";

interface Props {
  requests: EnlistmentRequest[];
}

export default function InboxList({ requests }: Props) {
  if (requests.length === 0) return <p className="text-gray-500">No enlistment requests yet.</p>;

  return (
    <div>
      {requests.map((req) => (
        <InboxItem key={req.id} request={req} />
      ))}
    </div>
  );
}
