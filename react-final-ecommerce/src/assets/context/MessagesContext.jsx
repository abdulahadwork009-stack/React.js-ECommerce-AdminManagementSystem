import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const MessagesContext = createContext(null);

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useLocalStorage("contact-messages", []);

  const addMessage = useCallback(
    ({ name, email, subject, message }) => {
      setMessages((prev) => [
        { id: Date.now(), name, email, subject, message, date: new Date().toISOString(), read: false },
        ...prev, // naya message sab se upar
      ]);
    },
    [setMessages]
  );

  const markAsRead = useCallback(
    (id) => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m))),
    [setMessages]
  );

  const deleteMessage = useCallback(
    (id) => setMessages((prev) => prev.filter((m) => m.id !== id)),
    [setMessages]
  );

  const unreadCount = useMemo(() => messages.filter((m) => !m.read).length, [messages]);

  const value = useMemo(
    () => ({ messages, unreadCount, addMessage, markAsRead, deleteMessage }),
    [messages, unreadCount, addMessage, markAsRead, deleteMessage]
  );

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export const useMessages = () => useContext(MessagesContext);