import { useState, useMemo } from "react";
import { useMessages } from "../../context/MessagesContext";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import EmptyState from "../../components/EmptyState";

export default function Messages() {
  const { messages, markAsRead, deleteMessage } = useMessages();
  const [filter, setFilter] = useState("All");
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(
    () =>
      messages.filter((m) => {
        if (filter === "Unread") return !m.read;
        if (filter === "Read") return m.read;
        return true;
      }),
    [messages, filter]
  );

  const openMessage = (m) => {
    setViewing(m);
    if (!m.read) markAsRead(m.id);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Messages</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
        >
          <option>All</option>
          <option>Unread</option>
          <option>Read</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No messages found." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className={`border-t border-gray-200 dark:border-gray-700 ${m.read ? "" : "font-semibold"}`}>
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="max-w-xs truncate p-3">{m.subject}</td>
                  <td className="p-3">{new Date(m.date).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${m.read ? "bg-gray-200 text-gray-700" : "bg-blue-100 text-blue-800"}`}>
                      {m.read ? "Read" : "New"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => openMessage(m)}>View</Button>
                      <Button variant="danger" onClick={() => setDeleting(m)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <Modal title={viewing.subject} onClose={() => setViewing(null)}>
          <div className="space-y-3 text-sm">
            <p><strong>From:</strong> {viewing.name} ({viewing.email})</p>
            <p><strong>Date:</strong> {new Date(viewing.date).toLocaleString()}</p>
            <p className="whitespace-pre-wrap rounded-lg bg-gray-100 p-3 dark:bg-gray-700">{viewing.message}</p>
            <a
              href={`mailto:${viewing.email}?subject=Re: ${encodeURIComponent(viewing.subject)}`}
              className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Reply by email
            </a>
          </div>
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete Message" onClose={() => setDeleting(null)}>
          <p className="mb-4">Delete the message from <strong>{deleting.name}</strong>?</p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteMessage(deleting.id);
                setDeleting(null);
              }}
            >
              Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}