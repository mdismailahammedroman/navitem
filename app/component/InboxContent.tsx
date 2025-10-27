import { TableRow } from "../types";

interface Props {
  rows: TableRow[];
}

export default function InboxContent({ rows }: Props) {
  return (
    <div className="p-6 flex flex-col space-y-6">
      {/* Top Bar */}
      <h2 className="text-xl font-bold border-b pb-2">Received Enlistment Request</h2>

      {/* Shared Profile / Supplier Message */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Shared Profile / Supplier&apos;s Message</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {["Date","Company","Category","Country","Profile","Status","Pending","Canceled","Review Pending"].map((col) => (
                  <th key={col} className="px-4 py-2 border-b text-left">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{row.date}</td>
                  <td className="px-4 py-2 border-b">{row.company}</td>
                  <td className="px-4 py-2 border-b">{row.category}</td>
                  <td className="px-4 py-2 border-b">{row.country}</td>
                  <td className="px-4 py-2 border-b">{row.profile}</td>
                  <td className="px-4 py-2 border-b">{row.status}</td>
                  <td className="px-4 py-2 border-b">{row.pending}</td>
                  <td className="px-4 py-2 border-b">{row.canceled}</td>
                  <td className="px-4 py-2 border-b">{row.reviewPending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
