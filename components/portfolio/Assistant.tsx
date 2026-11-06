"use client";
import { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
type Message = { role: "user" | "assistant"; text: string };
export default function Assistant({
  requested,
  onOpen,
  onClose,
}: {
  requested: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const open = requested;
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I can help you explore Arjun’s projects, skills, education and availability. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [mode, setMode] = useState("Portfolio search");
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (open) {
      opener.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
  }, [open]);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [messages, pending]);
  const close = () => {
    dialog.current?.close();
    onClose();
    opener.current?.focus();
  };
  async function ask(text: string) {
    if (pending || !text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setPending(true);
    setError("");
    try {
      const r = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "The assistant is unavailable.");
      setMode(
        data.mode === "ai" ? "AI · portfolio grounded" : "Portfolio search",
      );
      setMessages((m) => [...m, { role: "assistant", text: data.answer }]);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to answer. Please try again.",
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <>
      <button
        className="assistant-orb"
        onClick={onOpen}
        aria-label="Open portfolio assistant"
      >
        <span className="robot-antenna" />
        <Bot size={28} />
        <span className="orb-status" />
      </button>
      <dialog
        ref={dialog}
        className="assistant-dialog"
        aria-label="Arjun’s portfolio assistant"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="assistant-panel">
          <div className="assistant-header">
            <Bot size={21} />
            <div>
              <strong>ARJUN_ASSISTANT</strong>
              <span>{mode}</span>
            </div>
            <button aria-label="Close assistant" onClick={close}>
              <X size={19} />
            </button>
          </div>
          <div className="chat-log" ref={log} aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className={`chat-message ${m.role}`}>
                <span className="mono">
                  {m.role === "user" ? "YOU" : "AR_ASSISTANT"}
                </span>
                <p>{m.text}</p>
              </div>
            ))}
            {pending && (
              <p className="mono dim" role="status">
                Searching the portfolio…
              </p>
            )}
            {error && (
              <p className="chat-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="chat-prompts">
            {[
              "What has Arjun built?",
              "What is he studying?",
              "Is he available for work?",
            ].map((q) => (
              <button key={q} onClick={() => ask(q)} disabled={pending}>
                {q}
              </button>
            ))}
          </div>
          <form
            className="chat-compose"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <label className="sr-only" htmlFor="assistant-question">
              Your question
            </label>
            <input
              id="assistant-question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask about Arjun…"
              required
            />
            <button
              aria-label="Send question"
              disabled={pending || !input.trim()}
            >
              <Send size={18} />
            </button>
          </form>
          <p className="chat-disclaimer">
            Answers use portfolio information. AI responses, when enabled, may
            be inaccurate. Please avoid sharing sensitive information.
          </p>
        </div>
      </dialog>
    </>
  );
}
